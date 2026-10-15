import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-32">
      <h1 className="font-serif text-3xl">This page doesn&apos;t exist</h1>
      <p className="mt-6 max-w-prose text-paper-muted">
        The link may be old or mistyped. Head back to the home page to find what you were after.
      </p>
      <div className="mt-10">
        <ButtonLink href="/">Go to the home page</ButtonLink>
      </div>
    </Container>
  );
}
