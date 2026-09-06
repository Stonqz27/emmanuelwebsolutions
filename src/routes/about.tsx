import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

// Replace with Emmanuel's public LinkedIn profile before launch.
const LINKEDIN_URL = "https://www.linkedin.com/";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Emmanuel — Emmanuel Web Solutions" },
      {
        name: "description",
        content:
          "Meet Emmanuel, the designer and developer behind affordable websites for local businesses.",
      },
      { property: "og:title", content: "About Emmanuel" },
      {
        property: "og:description",
        content:
          "A one-person website studio with straightforward service and one clear $100 price.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b-2 border-foreground py-20 md:py-24">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="container-page relative grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">
              About
            </p>
            <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              One person. <span className="text-gradient">Direct service.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              I&apos;m Emmanuel—the designer, developer, and person you talk to
              throughout the entire project. There are no account managers and
              no handoffs. I build your website and answer your questions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="border-2 border-foreground bg-foreground px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.1em] text-background transition-colors hover:border-primary hover:bg-primary"
              >
                Work with me
              </Link>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-foreground px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.1em] transition-colors hover:bg-foreground hover:text-background"
              >
                LinkedIn →
              </a>
            </div>
          </div>

          <div className="md:col-span-5">
            {/* Replace this branded placeholder with Emmanuel's portrait image. */}
            <div
              className="grid aspect-[3/4] place-items-center border-2 border-foreground bg-surface"
              role="img"
              aria-label="Portrait of Emmanuel coming soon"
            >
              <div className="text-center">
                <p className="font-display text-8xl font-bold text-primary">
                  E.
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Founder portrait
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="theme-light border-b-2 border-foreground bg-background py-20 md:py-24">
        <div className="container-page grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">
              How I work
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              Straightforward websites. Straightforward pricing.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground md:col-span-7">
            <p>
              I started Emmanuel Web Solutions to help small businesses get a
              professional website without confusing packages or a large upfront
              bill.
            </p>
            <p>
              Every website is designed for the business it represents, checked
              on mobile, and built around a clear next step for the
              customer—calling, emailing, booking, or visiting.
            </p>
            <p>
              You pay $50 when the project begins and the final $50 after you
              have reviewed and approved the finished website.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { v: "$100", l: "Total website price" },
              { v: "$50", l: "Payment to begin" },
              { v: "1", l: "Person on your project" },
            ].map((item) => (
              <div
                key={item.l}
                className="border-2 border-foreground bg-surface p-8"
              >
                <p className="font-display text-5xl font-bold text-primary">
                  {item.v}
                </p>
                <p className="mt-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">
                  {item.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
