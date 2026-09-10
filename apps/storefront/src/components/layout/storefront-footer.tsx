import { Container } from "@eyewear/ui";
import { Wordmark } from "@/components/brand/wordmark";

export function StorefrontFooter() {
  return (
    <footer className="border-t border-line-soft py-8">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Wordmark />
        <p className="text-xs leading-5 text-copy">
          A configurable commerce platform foundation. Product experience follows next.
        </p>
      </Container>
    </footer>
  );
}
