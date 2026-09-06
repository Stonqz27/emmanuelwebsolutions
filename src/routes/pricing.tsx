import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "$100 Website Pricing — Emmanuel Web Solutions" },
      {
        name: "description",
        content:
          "One professional small-business website for $100 total: $50 to begin and $50 after approval.",
      },
      {
        property: "og:title",
        content: "$100 Website Pricing — Emmanuel Web Solutions",
      },
      {
        property: "og:description",
        content:
          "Simple website pricing with two $50 payments and no surprise package tiers.",
      },
    ],
  }),
  component: PricingPage,
});

const included = [
  "A custom, mobile-friendly small-business website",
  "Up to five essential pages",
  "Clear calls to action and contact information",
  "Basic search-engine and performance setup",
  "Two focused revision rounds",
  "Help connecting your domain and launching the site",
] as const;

function PricingPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b-2 border-foreground py-20 md:py-28">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="container-page relative">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Simple pricing
          </p>
          <h1 className="max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
            One website. <span className="text-gradient">$100 total.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            No confusing tiers and no four-figure quote. Pay $50 to begin. Pay
            the remaining $50 only after you review and approve the finished
            website.
          </p>
        </div>
      </section>

      <section className="theme-light border-b-2 border-foreground bg-background py-20 md:py-24">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <article className="border-2 border-foreground bg-background p-7 md:p-10 lg:col-span-7">
            <div className="flex flex-col justify-between gap-6 border-b-2 border-foreground pb-8 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Flat-rate website
                </p>
                <h2 className="font-display text-3xl font-bold md:text-5xl">
                  Small-business website
                </h2>
              </div>
              <p className="font-display text-6xl font-bold text-primary">
                $100
              </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {included.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                >
                  <span
                    className="mt-1 font-mono font-bold text-primary"
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="mt-10 inline-flex border-2 border-foreground bg-foreground px-7 py-4 font-mono text-sm font-bold uppercase tracking-[0.12em] text-background transition-colors hover:border-primary hover:bg-primary"
            >
              Start your website
            </Link>
          </article>

          <aside className="border-2 border-foreground bg-foreground p-7 text-background md:p-10 lg:col-span-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#ff6b6b]">
              Payment schedule
            </p>
            <ol className="mt-8 space-y-8">
              <li className="border-b-2 border-background/30 pb-8">
                <p className="font-display text-5xl font-bold">$50</p>
                <h3 className="mt-3 text-xl font-bold">To begin</h3>
                <p className="mt-2 text-sm leading-relaxed text-background/70">
                  This reserves your project and starts the design and build.
                </p>
              </li>
              <li>
                <p className="font-display text-5xl font-bold text-primary">
                  $50
                </p>
                <h3 className="mt-3 text-xl font-bold">After approval</h3>
                <p className="mt-2 text-sm leading-relaxed text-background/70">
                  You review the finished website first. The final payment is
                  due before launch or file transfer.
                </p>
              </li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Clear scope
            </p>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              The price stays simple.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              The $100 offer covers a standard informational website for a small
              business. I confirm the pages and features with you before work
              begins.
            </p>
            <p>
              Domain names, hosting plans, paid booking tools, online stores,
              and other third-party subscriptions are not included. I will
              explain any outside cost before you agree to it.
            </p>
            <a
              href="mailto:hello@emmanuelwebsolutions.me?subject=My%20%24100%20website"
              className="inline-block font-mono text-sm font-bold uppercase tracking-[0.1em] text-primary underline underline-offset-4"
            >
              Email me about your website →
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
