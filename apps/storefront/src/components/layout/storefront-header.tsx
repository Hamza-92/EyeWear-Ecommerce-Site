import { Container } from "@eyewear/ui";
import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";

export function StorefrontHeader() {
  return (
    <header className="border-b border-line-soft" aria-label="Storefront header">
      <Container className="grid min-h-20 grid-cols-[1fr_auto_1fr] items-center">
        <p className="hidden text-[0.6875rem] font-semibold tracking-[0.16em] text-copy uppercase sm:block">
          Premium eyewear
        </p>
        <Link href="/" aria-label="Storefront home">
          <Wordmark />
        </Link>
        <p className="justify-self-end text-[0.6875rem] font-semibold tracking-[0.16em] text-copy uppercase">
          Foundation 01
        </p>
      </Container>
    </header>
  );
}
