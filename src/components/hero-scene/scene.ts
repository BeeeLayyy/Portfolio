// The Home hero's 3D scene (D15, made personal in D17): Brandon's world as
// glossy objects. Dollar signs, gold coins and coin stacks (finance), bar
// and pie charts, a percent sign and an up arrow (data), curly braces (MIS),
// a graduation cap (Villanova) and a basketball (Courtside). They float in a
// loose cluster, get pushed by the cursor and spring back.
//
// Lusion-style "screen paint": the cursor leaves a fluid trail that warps the
// rendered image and splits its colors, so moving the mouse bends the scene
// like a lens. The trail is a small velocity texture that fades and drifts
// each frame; a final pass shifts the picture by it.
//
// Loaded with a dynamic import after the page is idle, so Three.js never
// blocks the first paint. Colors come from the CSS tokens in globals.css.

import {
  NeutralToneMapping,
  Box3,
  Color,
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  HalfFloatType,
  Mesh,
  MeshPhysicalMaterial,
  OrthographicCamera,
  PerspectiveCamera,
  Plane,
  PlaneGeometry,
  PMREMGenerator,
  Raycaster,
  Scene,
  ShaderMaterial,
  Shape,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget,
  type BufferGeometry,
  type Material,
  type Object3D,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { glyphs } from "./glyphs";

type Piece = {
  object: Object3D;
  radius: number; // rough size, for pieces bumping instead of passing through
  home: Vector3;
  velocity: Vector3;
  spin: Vector3;
};

const CURSOR_RADIUS = 3.2; // world units around the cursor that push pieces
const CURSOR_FORCE = 30;
const SPRING = 6; // pull back home
const DAMPING = 3; // velocity lost per second
const PAINT_SCALE = 0.25; // the warp trail is drawn at a quarter resolution

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
  // No canvas antialiasing: the scene renders into a multisampled target
  // (samples: 4 below) and the warp pass draws that to the canvas.
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
  renderer.outputColorSpace = SRGBColorSpace;
  // Neutral, not ACES: ACES shifts strong blues toward purple and greys out
  // the gold and orange. Neutral keeps the paint as bright as Lusion's.
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x000000, 0); // transparent: the card's own gradient shows through
  const disposables: { dispose(): void }[] = [];
  const keep = <T extends { dispose(): void }>(thing: T) => {
    disposables.push(thing);
    return thing;
  };

  const scene = new Scene();
  const pmrem = keep(new PMREMGenerator(renderer));
  scene.environment = keep(pmrem.fromScene(new RoomEnvironment(), 0.04).texture);
  scene.environmentIntensity = 0.75;

  // A warm key light from the top left and a cool one from behind give the
  // pieces clear form and edges, like a studio shot.
  const key = new DirectionalLight(new Color(token("--color-ink")), 2.2);
  key.position.set(-6, 8, 10);
  const rim = new DirectionalLight(new Color(token("--color-accent")), 1.6);
  rim.position.set(6, -2, -8);
  scene.add(key, rim);

  const camera = new PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 17);

  // --- Materials: glossy white and black, rubbery cobalt, polished gold.
  const physical = (color: string, roughness: number, extra: Partial<MeshPhysicalMaterial> = {}) =>
    keep(new MeshPhysicalMaterial({ color: new Color(token(color)), roughness, ...extra }));
  const white = physical("--color-ink", 0.22, { clearcoat: 1, clearcoatRoughness: 0.1 });
  const black = physical("--color-canvas", 0.2, { clearcoat: 1, clearcoatRoughness: 0.05 });
  const cobalt = physical("--color-scene-cobalt", 0.45, { clearcoat: 0.35, clearcoatRoughness: 0.35 });
  const gold = physical("--color-scene-gold", 0.24, { metalness: 1, clearcoat: 0.6 });
  const orange = physical("--color-scene-orange", 0.55, { clearcoat: 0.25 });
  const green = physical("--color-gain", 0.3, { clearcoat: 0.8 });

  // --- Geometry builders. Each returns a group centred on its middle.
  const extruded = (shapes: Shape[], depth: number, bevel: number) =>
    keep(
      new ExtrudeGeometry(shapes, {
        depth,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel * 0.8,
        bevelSegments: 5,
        curveSegments: 18,
      }).center(),
    );
  const glyph = (ch: keyof typeof glyphs) =>
    SVGLoader.createShapes(new SVGLoader().parse(`<svg><path d="${glyphs[ch].d}"/></svg>`).paths[0]);
  const glyphGeometry = (ch: keyof typeof glyphs, depth = 0.32) => extruded(glyph(ch), depth, 0.035);
  const dollarGeometry = glyphGeometry("$");
  const percentGeometry = glyphGeometry("%");
  const braceOpen = glyphGeometry("{", 0.26);
  const braceClose = glyphGeometry("}", 0.26);
  const coinGeometry = keep(new CylinderGeometry(0.8, 0.8, 0.16, 64).rotateX(Math.PI / 2));
  const coinRim = keep(new TorusGeometry(0.76, 0.05, 12, 64));
  const coinMark = glyphGeometry("$", 0.06);
  const ball = keep(new SphereGeometry(1, 48, 32));
  const seam = keep(new TorusGeometry(1.005, 0.022, 8, 96));
  const sideSeam = keep(new TorusGeometry(Math.sqrt(1 - 0.55 * 0.55) + 0.005, 0.022, 8, 96));
  const bar = (h: number) => keep(new RoundedBoxGeometry(0.42, h, 0.42, 3, 0.08));
  const box = (w: number, h: number, d: number, r: number) => keep(new RoundedBoxGeometry(w, h, d, 3, r));
  const pieBig = keep(new CylinderGeometry(1, 1, 0.34, 48, 1, false, 0, Math.PI * 1.5).rotateX(Math.PI / 2));
  const pieSmall = keep(new CylinderGeometry(1, 1, 0.34, 24, 1, false, Math.PI * 1.5, Math.PI / 2).rotateX(Math.PI / 2));
  const arrowShape = new Shape()
    .moveTo(-0.16, -0.9)
    .lineTo(0.16, -0.9)
    .lineTo(0.16, 0.15)
    .lineTo(0.45, 0.15)
    .lineTo(0, 0.9)
    .lineTo(-0.45, 0.15)
    .lineTo(-0.16, 0.15)
    .closePath();
  const arrowGeometry = extruded([arrowShape], 0.3, 0.05);
  const capBoard = box(1.9, 0.1, 1.9, 0.04);
  const capSkull = keep(new CylinderGeometry(0.62, 0.66, 0.5, 40));
  const capButton = keep(new SphereGeometry(0.08, 16, 12));
  const tasselCord = keep(new CylinderGeometry(0.02, 0.02, 0.9, 6));
  const tasselEnd = keep(new CylinderGeometry(0.07, 0.12, 0.32, 12));

  const mesh = (geometry: BufferGeometry, material: Material, setup?: (m: Mesh) => void) => {
    const m = new Mesh(geometry, material);
    setup?.(m);
    return m;
  };

  const builders: Record<string, (r: () => number) => Object3D> = {
    dollar: (r) => {
      const g = new Group();
      const m = r();
      g.add(mesh(dollarGeometry, m < 0.4 ? cobalt : m < 0.75 ? white : black, (o) => o.scale.setScalar(2.6)));
      return g;
    },
    percent: () => mesh(percentGeometry, white, (o) => o.scale.setScalar(2.2)),
    braces: () => {
      const g = new Group();
      g.add(mesh(braceOpen, white, (o) => (o.scale.setScalar(2.4), (o.position.x = -0.42))));
      g.add(mesh(braceClose, white, (o) => (o.scale.setScalar(2.4), (o.position.x = 0.42))));
      return g;
    },
    coin: () => {
      const g = new Group();
      g.add(mesh(coinGeometry, gold));
      g.add(mesh(coinRim, gold, (o) => (o.position.z = 0.08)));
      g.add(mesh(coinRim, gold, (o) => (o.position.z = -0.08)));
      g.add(mesh(coinMark, gold, (o) => (o.scale.setScalar(1.15), (o.position.z = 0.1))));
      g.add(mesh(coinMark, gold, (o) => (o.scale.set(-1.15, 1.15, 1.15), (o.position.z = -0.1))));
      return g;
    },
    stack: (r) => {
      const g = new Group();
      for (let i = 0; i < 4; i++) {
        g.add(
          mesh(coinGeometry, gold, (o) => {
            o.rotation.x = Math.PI / 2;
            o.position.set((r() - 0.5) * 0.12, i * 0.17 - 0.25, (r() - 0.5) * 0.12);
          }),
        );
      }
      return g;
    },
    basketball: () => {
      const g = new Group();
      g.add(mesh(ball, orange));
      g.add(mesh(seam, black));
      g.add(mesh(seam, black, (o) => (o.rotation.y = Math.PI / 2)));
      g.add(mesh(sideSeam, black, (o) => ((o.rotation.x = Math.PI / 2), (o.position.y = 0.55))));
      g.add(mesh(sideSeam, black, (o) => ((o.rotation.x = Math.PI / 2), (o.position.y = -0.55))));
      g.scale.setScalar(1.05);
      return g;
    },
    cap: () => {
      const g = new Group();
      g.add(mesh(capBoard, black, (o) => ((o.position.y = 0.3), (o.rotation.y = Math.PI / 4))));
      g.add(mesh(capSkull, black, (o) => (o.position.y = 0)));
      g.add(mesh(capButton, gold, (o) => (o.position.y = 0.38)));
      g.add(mesh(tasselCord, gold, (o) => ((o.position.set(0.66, -0.08, 0)), (o.rotation.z = 0.08))));
      g.add(mesh(tasselEnd, gold, (o) => o.position.set(0.7, -0.6, 0)));
      return g;
    },
    bars: () => {
      const g = new Group();
      g.add(mesh(box(1.9, 0.12, 0.7, 0.05), white, (o) => (o.position.y = -0.85)));
      [0.7, 1.15, 1.6].forEach((h, i) =>
        g.add(mesh(bar(h), cobalt, (o) => o.position.set(-0.55 + i * 0.55, -0.79 + h / 2, 0))),
      );
      return g;
    },
    pie: () => {
      const g = new Group();
      g.add(mesh(pieBig, cobalt));
      g.add(mesh(pieSmall, white, (o) => o.position.set(0.12, -0.12, 0.08)));
      return g;
    },
    arrow: () => mesh(arrowGeometry, green, (o) => o.scale.setScalar(1.25)),
  };

  // The mix: money first, then data, school and Courtside.
  const kinds = [
    "dollar", "dollar", "dollar", "dollar", "dollar", "dollar", "coin", "coin", "coin", "coin",
    "stack", "stack", "stack", "basketball", "basketball", "cap", "cap", "bars", "bars", "bars",
    "pie", "pie", "percent", "percent", "arrow", "arrow", "braces", "braces", "coin", "dollar",
    "basketball", "cap", "dollar", "coin",
  ];

  const group = new Group();
  scene.add(group);
  const random = seeded(11);
  const pieces: Piece[] = kinds.map((kind) => {
    const object = builders[kind](random);
    object.scale.multiplyScalar(1.3); // big and overlapping, like Lusion's frame
    const size = new Box3().setFromObject(object).getSize(new Vector3());
    const home = new Vector3((random() - 0.5) * 27, (random() - 0.5) * 9, (random() - 0.5) * 8 - 1.5);
    object.position.copy(home);
    object.rotation.set((random() - 0.5) * 1.6, (random() - 0.5) * 2.4, (random() - 0.5) * 1.2);
    group.add(object);
    return {
      object,
      radius: size.length() * 0.42,
      home,
      velocity: new Vector3(),
      spin: new Vector3((random() - 0.5) * 0.3, (random() - 0.5) * 0.3, (random() - 0.5) * 0.3),
    };
  });

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
        const overlap = (a.radius + b.radius) * 0.7 - distance;
        if (overlap > 0 && distance > 0.001) {
          gap.multiplyScalar((overlap * 0.5) / distance);
          a.home.add(gap);
          b.home.sub(gap);
        }
      }
    }
  }
  for (const piece of pieces) piece.object.position.copy(piece.home);

  // --- Screen paint: a velocity trail at a quarter resolution. Each frame
  // the old trail drifts along itself and fades, and the cursor's latest
  // stroke is added. HalfFloat so the velocity can be negative.
  const paintTargets = [0, 1].map(() => keep(new WebGLRenderTarget(1, 1, { type: HalfFloatType })));
  const paintMaterial = keep(
    new ShaderMaterial({
      uniforms: {
        tPrev: { value: null },
        uMouse: { value: new Vector2(-1, -1) },
        uPrevMouse: { value: new Vector2(-1, -1) },
        uAspect: { value: 1 },
        uRadius: { value: 0.06 },
        uFade: { value: 0.955 },
      },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: `
        uniform sampler2D tPrev;
        uniform vec2 uMouse, uPrevMouse;
        uniform float uAspect, uRadius, uFade;
        varying vec2 vUv;
        float segment(vec2 p, vec2 a, vec2 b) {
          vec2 pa = p - a, ba = b - a;
          float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
          return length(pa - ba * h);
        }
        void main() {
          vec4 prev = texture2D(tPrev, vUv);
          // Drift along the trail's own flow, which curls it like liquid.
          prev = texture2D(tPrev, vUv - prev.xy * 0.012);
          prev *= uFade;
          vec2 scale = vec2(uAspect, 1.0);
          float d = segment(vUv * scale, uPrevMouse * scale, uMouse * scale);
          float f = smoothstep(uRadius, 0.0, d);
          vec2 stroke = (uMouse - uPrevMouse) * 6.0;
          prev.xy += stroke * f;
          prev.z = max(prev.z, f * min(length(stroke) * 4.0, 1.0));
          gl_FragColor = vec4(clamp(prev.xy, -1.0, 1.0), prev.z, 1.0);
        }`,
    }),
  );
  const paintScene = new Scene();
  const quad = keep(new PlaneGeometry(2, 2));
  paintScene.add(new Mesh(quad, paintMaterial));
  const paintCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const composer = new EffectComposer(
    renderer,
    keep(new WebGLRenderTarget(1, 1, { type: HalfFloatType, samples: 4 })),
  );
  composer.addPass(new RenderPass(scene, camera));
  const warp = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null },
      tPaint: { value: null },
      uStrength: { value: 0.045 },
    },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      uniform sampler2D tDiffuse, tPaint;
      uniform float uStrength;
      varying vec2 vUv;
      void main() {
        vec4 paint = texture2D(tPaint, vUv);
        vec2 offset = paint.xy * uStrength;
        vec4 base = texture2D(tDiffuse, vUv - offset);
        // Split the colors along the warp, like light through a lens.
        float r = texture2D(tDiffuse, vUv - offset * 1.7).r;
        float b = texture2D(tDiffuse, vUv - offset * 0.3).b;
        vec3 color = vec3(r, base.g, b) + paint.z * 0.05;
        gl_FragColor = vec4(color, max(base.a, paint.z * 0.05));
      }`,
  });
  composer.addPass(warp);
  composer.addPass(new OutputPass());

  // Cursor in world space (for the push) and in uv (for the paint).
  const pointer = new Vector2(10, 10);
  const cursor = new Vector3(999, 999, 0);
  const mouseUv = new Vector2(-1, -1);
  const prevMouseUv = new Vector2(-1, -1);
  let cursorActive = false;
  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);

  function resize() {
    const { clientWidth: width, clientHeight: height } = canvas;
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    composer.setPixelRatio(dpr);
    composer.setSize(width, height);
    paintTargets.forEach((t) => t.setSize(Math.ceil(width * PAINT_SCALE), Math.ceil(height * PAINT_SCALE)));
    paintMaterial.uniforms.uAspect.value = width / height;
    camera.aspect = width / height;
    // Pull back a little on narrower cards, but let the sides crop (like
    // Lusion's) rather than shrinking the pieces to fit.
    camera.position.z = 17 * Math.min(1.35, Math.max(1, 2.2 / camera.aspect));
    camera.updateProjectionMatrix();
  }
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  function onPointerMove(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    const u = (event.clientX - rect.left) / rect.width;
    const v = 1 - (event.clientY - rect.top) / rect.height;
    if (!cursorActive) prevMouseUv.set(u, v);
    mouseUv.set(u, v);
    pointer.set(u * 2 - 1, v * 2 - 1);
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
  let paintIndex = 0;

  function step(now: number) {
    const dt = Math.min((now - last) / 1000, 1 / 30); // clamp after tab switches
    last = now;
    const t = now / 1000;
    for (const piece of pieces) {
      const { object, home, velocity, spin } = piece;
      // Spring home, with a slow idle drift so the cluster breathes.
      const drift = Math.sin(t * 0.5 + home.x) * 0.3;
      push
        .set(home.x - object.position.x, home.y + drift - object.position.y, home.z - object.position.z)
        .multiplyScalar(SPRING);
      velocity.addScaledVector(push, dt);
      if (cursorActive) {
        push.copy(object.position).sub(cursor);
        push.z *= 0.3;
        const distance = push.length();
        if (distance < CURSOR_RADIUS && distance > 0.001) {
          const strength = (1 - distance / CURSOR_RADIUS) * CURSOR_FORCE;
          velocity.addScaledVector(push.normalize(), strength * dt);
          spin.x += push.y * strength * dt * 0.08;
          spin.y -= push.x * strength * dt * 0.08;
        }
      }
      velocity.multiplyScalar(Math.max(0, 1 - DAMPING * dt));
      object.position.addScaledVector(velocity, dt);
      spin.multiplyScalar(Math.max(0, 1 - 0.7 * dt)).clampScalar(-2, 2);
      object.rotation.x += (spin.x + 0.04) * dt;
      object.rotation.y += (spin.y + 0.06) * dt;
      object.rotation.z += spin.z * dt;
    }
    // Soft collisions: overlapping pieces push apart, so they bump like
    // Lusion's instead of passing through each other.
    for (let i = 0; i < pieces.length; i++) {
      for (let j = i + 1; j < pieces.length; j++) {
        const a = pieces[i];
        const b = pieces[j];
        push.copy(a.object.position).sub(b.object.position);
        const distance = push.length();
        const overlap = (a.radius + b.radius) * 0.7 - distance;
        if (overlap > 0 && distance > 0.001) {
          push.multiplyScalar((overlap * 0.5) / distance);
          a.object.position.add(push);
          b.object.position.sub(push);
          a.velocity.addScaledVector(push, 4);
          b.velocity.addScaledVector(push, -4);
        }
      }
    }

    // Paint the cursor's latest stroke into the warp trail (ping-pong).
    const read = paintTargets[paintIndex];
    const write = paintTargets[1 - paintIndex];
    paintMaterial.uniforms.tPrev.value = read.texture;
    paintMaterial.uniforms.uMouse.value.copy(cursorActive ? mouseUv : prevMouseUv);
    paintMaterial.uniforms.uPrevMouse.value.copy(prevMouseUv);
    renderer.setRenderTarget(write);
    renderer.render(paintScene, paintCamera);
    renderer.setRenderTarget(null);
    prevMouseUv.copy(mouseUv);
    paintIndex = 1 - paintIndex;
    warp.uniforms.tPaint.value = write.texture;

    composer.render(dt);
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
    composer.dispose();
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };
}

