import { Container } from "@eyewear/ui";
import { FrameMotif } from "@/components/visuals/frame-motif";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <Container>
        <section className="grid min-h-[calc(100svh-10rem)] items-center gap-14 py-20 lg:grid-cols-[0.88fr_1.12fr] lg:py-24">
          <div className="max-w-3xl">
            <p className="ui-eyebrow mb-8">Storefront architecture established</p>
            <h1 className="ui-display-xl max-w-3xl text-balance">
              A considered frame for what comes next.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-copy sm:text-lg sm:leading-8">
              The server-rendered shell, shared visual language, and store-aware contracts are in
              place. Commerce experiences will be added deliberately, one domain at a time.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-3xl py-12">
            <div
              className="absolute inset-x-[12%] top-1/2 h-px bg-accent-soft"
              aria-hidden="true"
            />
            <FrameMotif />
          </div>
        </section>

        <section className="border-t border-line py-10" aria-labelledby="foundation-heading">
          <h2 id="foundation-heading" className="ui-visually-hidden">
            Platform foundation
          </h2>
          <dl className="grid gap-8 sm:grid-cols-3 sm:gap-10">
            <div>
              <dt className="ui-eyebrow">Rendering</dt>
              <dd className="mt-3 text-sm leading-6 text-copy">Server-first and indexable</dd>
            </div>
            <div>
              <dt className="ui-eyebrow">Interface</dt>
              <dd className="mt-3 text-sm leading-6 text-copy">Accessible by default</dd>
            </div>
            <div>
              <dt className="ui-eyebrow">Platform</dt>
              <dd className="mt-3 text-sm leading-6 text-copy">Store-aware, not store-bound</dd>
            </div>
          </dl>
        </section>
      </Container>
    </main>
  );
}
