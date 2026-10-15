// The Home hero's 3D scene (D15): glossy chart bars and coins that float in
// a loose cluster, get pushed by the cursor and spring back. Lusion-style
// physics feel without a physics engine: each piece is a damped spring to
// its home position plus a push away from the cursor.
//
// Loaded with a dynamic import after the page is idle, so Three.js never
// blocks the first paint. Colors come from the CSS tokens in globals.css.

import {
  ACESFilmicToneMapping,
  Color,
  CylinderGeometry,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Raycaster,
  Plane,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Piece = {
  mesh: Mesh;
  radius: number; // rough size, for pieces bumping instead of passing through
  home: Vector3;
  velocity: Vector3;
  spin: Vector3;
};

const PIECES = 34;
const CURSOR_RADIUS = 2.2; // world units around the cursor that push pieces
const CURSOR_FORCE = 26;
const SPRING = 7; // pull back home
const DAMPING = 3.2; // velocity lost per second

function token(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Deterministic pseudo-random, so the still image and the live scene match.
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

export function mountHeroScene(
  canvas: HTMLCanvasElement,
  { onFirstFrame, animate = true }: { onFirstFrame?: () => void; animate?: boolean } = {},
) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;

  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 14);

  // Three glossy materials from the palette: light ink, deep navy, and the
  // accent blue. Clearcoat gives the lacquered look of Lusion's pieces.
  const materials = [
    new MeshPhysicalMaterial({ color: new Color(token("--color-ink")), roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.12 }),
    new MeshPhysicalMaterial({ color: new Color(token("--color-surface")), roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.08 }),
    new MeshPhysicalMaterial({ color: new Color(token("--color-accent-strong")), roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 }),
  ];
  // Chart bars of a few heights, and coins.
  const geometries = [
    new RoundedBoxGeometry(0.9, 2.6, 0.9, 4, 0.22),
    new RoundedBoxGeometry(0.9, 1.7, 0.9, 4, 0.22),
    new RoundedBoxGeometry(0.9, 1.0, 0.9, 4, 0.22),
    new CylinderGeometry(0.75, 0.75, 0.22, 40),
  ];
  const radii = [1.05, 0.85, 0.65, 0.7];

  const group = new Group();
  scene.add(group);
  const random = seeded(7);
  const pieces: Piece[] = [];
  for (let i = 0; i < PIECES; i++) {
    const shape = Math.floor(random() * geometries.length);
    const geometry = geometries[shape];
    // Mostly ink and navy, about one in four blue: one light source, not confetti.
    const material = random() < 0.26 ? materials[2] : materials[random() < 0.5 ? 0 : 1];
    const mesh = new Mesh(geometry, material);
    const home = new Vector3((random() - 0.5) * 13, (random() - 0.5) * 5.2, (random() - 0.5) * 4);
    mesh.position.copy(home);
    mesh.rotation.set(random() * Math.PI, random() * Math.PI, random() * Math.PI);
    group.add(mesh);
    pieces.push({
      mesh,
      radius: radii[shape],
      home,
      velocity: new Vector3(),
      spin: new Vector3((random() - 0.5) * 0.3, (random() - 0.5) * 0.3, (random() - 0.5) * 0.3),
    });
  }

  // Spread the home positions apart before the first frame, so collisions
  // don't shove pieces around (a visible jolt) the moment the scene appears.
  const gap = new Vector3();
  for (let pass = 0; pass < 40; pass++) {
    for (let i = 0; i < pieces.length; i++) {
      for (let j = i + 1; j < pieces.length; j++) {
        const a = pieces[i];
        const b = pieces[j];
        gap.copy(a.home).sub(b.home);
        const distance = gap.length();
        const overlap = a.radius + b.radius - distance;
        if (overlap > 0 && distance > 0.001) {
          gap.multiplyScalar((overlap * 0.5) / distance);
          a.home.add(gap);
          b.home.sub(gap);
        }
      }
    }
  }
  for (const piece of pieces) piece.mesh.position.copy(piece.home);

  // Cursor in world space, on the plane the pieces float around.
  const pointer = new Vector2(10, 10); // offscreen until the cursor arrives
  const cursor = new Vector3(999, 999, 0);
  let cursorActive = false;
  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);

  function resize() {
    const { clientWidth: width, clientHeight: height } = canvas;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Keep the cluster's width in frame on narrow cards.
    camera.position.z = camera.aspect < 1.6 ? 14 * (1.6 / camera.aspect) * 0.8 : 14;
    camera.updateProjectionMatrix();
  }
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  function onPointerMove(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, cursor);
    cursorActive = true;
  }
  function onPointerLeave() {
    cursorActive = false;
  }
  const host = canvas.parentElement ?? canvas;
  host.addEventListener("pointermove", onPointerMove);
  host.addEventListener("pointerleave", onPointerLeave);

  const push = new Vector3();
  let last = performance.now();
  let frame = 0;
  let running = false;
  let firstFrameSent = false;

  function step(now: number) {
    const dt = Math.min((now - last) / 1000, 1 / 30); // clamp after tab switches
    last = now;
    const t = now / 1000;
    for (const piece of pieces) {
      const { mesh, home, velocity, spin } = piece;
      // Spring home, with a slow idle drift so the cluster breathes.
      const drift = Math.sin(t * 0.6 + home.x) * 0.25;
      push.set(home.x - mesh.position.x, home.y + drift - mesh.position.y, home.z - mesh.position.z).multiplyScalar(SPRING);
      velocity.addScaledVector(push, dt);
      if (cursorActive) {
        push.copy(mesh.position).sub(cursor);
        push.z *= 0.3;
        const distance = push.length();
        if (distance < CURSOR_RADIUS && distance > 0.001) {
          const strength = (1 - distance / CURSOR_RADIUS) * CURSOR_FORCE;
          velocity.addScaledVector(push.normalize(), strength * dt);
          spin.addScalar(strength * dt * 0.05);
        }
      }
      velocity.multiplyScalar(Math.max(0, 1 - DAMPING * dt));
      mesh.position.addScaledVector(velocity, dt);
      spin.multiplyScalar(Math.max(0, 1 - 0.6 * dt)).clampScalar(-1.5, 1.5);
      mesh.rotation.x += (spin.x + 0.05) * dt;
      mesh.rotation.y += (spin.y + 0.07) * dt;
      mesh.rotation.z += spin.z * dt;
    }
    // Soft collisions: overlapping pieces push apart, so they bump like
    // Lusion's instead of passing through each other. 34 pieces is ~560
    // pairs a frame, which is cheap.
    for (let i = 0; i < pieces.length; i++) {
      for (let j = i + 1; j < pieces.length; j++) {
        const a = pieces[i];
        const b = pieces[j];
        push.copy(a.mesh.position).sub(b.mesh.position);
        const distance = push.length();
        const overlap = a.radius + b.radius - distance;
        if (overlap > 0 && distance > 0.001) {
          push.multiplyScalar((overlap * 0.5) / distance);
          a.mesh.position.add(push);
          b.mesh.position.sub(push);
          a.velocity.addScaledVector(push, 4);
          b.velocity.addScaledVector(push, -4);
        }
      }
    }
    renderer.render(scene, camera);
    if (!firstFrameSent) {
      firstFrameSent = true;
      onFirstFrame?.();
    }
    if (running) frame = requestAnimationFrame(step);
  }

  function start() {
    if (running || !animate) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(step);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(frame);
  }

  // Only spend frames while the card is on screen and the tab is visible.
  let onScreen = true;
  const visibility = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen && !document.hidden) start();
    else stop();
  });
  visibility.observe(canvas);
  function onVisibilityChange() {
    if (document.hidden) stop();
    else if (onScreen) start();
  }
  document.addEventListener("visibilitychange", onVisibilityChange);

  if (animate) start();
  else step(performance.now()); // one still frame

  return function dispose() {
    stop();
    visibility.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    host.removeEventListener("pointermove", onPointerMove);
    host.removeEventListener("pointerleave", onPointerLeave);
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    environment.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
}
