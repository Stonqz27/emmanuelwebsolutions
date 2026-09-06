import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { services } from "@/lib/site-data";
import restaurantCover from "@/assets/case-bistro.jpg";
import salonCover from "@/assets/case-salon.jpg";

const featuredDemos = [
  {
    name: "Artisan Kitchen",
    category: "Restaurant website concept",
    href: "/demo/restaurant",
    cover: restaurantCover,
  },
  {
    name: "Lush & Luxe",
    category: "Salon website concept",
    href: "/demo/salon",
    cover: salonCover,
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Emmanuel Web Solutions — Modern websites for local businesses",
      },
      {
        name: "description",
        content:
          "Affordable, mobile-friendly websites for local businesses. One clear $100 price, split into two $50 payments.",
      },
      { property: "og:title", content: "Emmanuel Web Solutions" },
      {
        property: "og:description",
        content:
          "Professional websites for local businesses for one clear $100 price.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden border-b-2 border-foreground py-20 md:py-28">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 hero-glow opacity-60 pointer-events-none" />

        <div className="container-page relative">
          <div className="max-w-6xl animate-fade-up">
            <div className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Booking new website projects
            </div>

            <h1 className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-[-0.065em] sm:text-7xl md:text-8xl lg:text-9xl">
              Websites that turn clicks
              <br />
              <span className="text-gradient">into customers.</span>
            </h1>

            <p className="mt-10 max-w-2xl text-xl font-light leading-snug text-muted-foreground md:text-2xl">
              I design and build fast, mobile-friendly websites for local
              businesses. One clear $100 price: $50 to begin and $50 after you
              approve the finished site.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 font-mono text-sm uppercase tracking-[0.12em]">
              <Link
                to="/contact"
                className="border-2 border-foreground bg-foreground px-7 py-4 font-semibold text-background transition-colors hover:border-primary hover:bg-primary"
              >
                Start your $100 website
              </Link>
              <Link
                to="/portfolio"
                className="border-2 border-foreground px-7 py-4 font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Explore live demos
              </Link>
            </div>

            <dl className="mt-20 grid max-w-2xl grid-cols-3 border-y-2 border-foreground font-mono">
              {[
                { v: "$100", l: "Flat website price" },
                { v: "$50", l: "To begin" },
                { v: "$50", l: "After approval" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="border-r-2 border-foreground px-3 py-5 last:border-r-0 md:px-6"
                >
                  <dt className="font-display text-2xl font-bold text-foreground md:text-4xl">
                    {s.v}
                  </dt>
                  <dd className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="brutal-marquee py-4" aria-hidden="true">
        <div className="brutal-marquee-track font-mono text-sm font-semibold uppercase tracking-[0.18em] md:text-lg">
          <span className="pr-10">
            Website Design • Website Redesign • Mobile Optimization • Local SEO
            •
          </span>
          <span className="pr-10">
            Website Design • Website Redesign • Mobile Optimization • Local SEO
            •
          </span>
        </div>
      </div>

      {/* Services preview */}
      <section className="theme-light border-b-2 border-foreground bg-background py-24">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                What we do
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
                Four disciplines, one outcome.
              </h2>
            </div>
            <Link
              to="/services"
              className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary pb-1 uppercase tracking-widest text-xs"
            >
              All services →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group border-2 border-border bg-surface p-7 transition-colors duration-300 hover:bg-foreground hover:text-background"
              >
                <div className="mb-6 grid size-11 place-items-center border-2 border-primary transition-colors group-hover:bg-primary">
                  <div className="size-4 border-2 border-primary group-hover:border-background" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-background/70">
                  {s.tagline}
                </p>
                <p className="mt-6 text-xs font-bold tracking-widest uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio teaser */}
      <section className="border-b-2 border-foreground py-32">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
                Website demos
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight italic">
                Real designs you can explore.
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary pb-1 uppercase tracking-widest text-xs"
            >
              All live demos →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {featuredDemos.map((demo, i) => (
              <a
                key={demo.href}
                href={demo.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${i === 1 ? "md:mt-24" : ""}`}
              >
                <div className="aspect-[4/3] overflow-hidden border-2 border-border bg-surface">
                  <img
                    src={demo.cover}
                    alt={`${demo.name} concept website preview`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-8 flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-2">
                      {demo.name}
                    </h3>
                    <p className="text-muted-foreground">{demo.category}</p>
                  </div>
                  <div className="size-10 rounded-full border border-border grid place-items-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section className="py-24">
        <div className="container-page">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
            Process
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-16 max-w-2xl">
            Simple, transparent, and built around approval.
          </h2>
          <ol className="grid md:grid-cols-4 gap-8">
            {[
              {
                n: "01",
                t: "Plan",
                d: "We talk through your business, content, and goals.",
              },
              {
                n: "02",
                t: "Build",
                d: "I design and build your responsive website.",
              },
              {
                n: "03",
                t: "Review",
                d: "You review the site and request final adjustments.",
              },
              {
                n: "04",
                t: "Approve & launch",
                d: "You approve it, pay the final $50, and I launch it.",
              },
            ].map((step) => (
              <li
                key={step.n}
                className="border-2 border-border bg-background p-6 transition-colors hover:border-primary"
              >
                <p className="font-display text-xs font-bold text-primary mb-4">
                  {step.n}
                </p>
                <h3 className="font-display text-xl font-bold mb-2">
                  {step.t}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageShell>
  );
}
