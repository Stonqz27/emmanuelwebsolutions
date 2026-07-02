import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { services, projects } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Emmanuel Web Solutions — Modern websites for local businesses",
      },
      {
        name: "description",
        content:
          "We engineer high-performance websites that turn local search traffic into customers. Custom design, flawless mobile, and local SEO built in.",
      },
      { property: "og:title", content: "Emmanuel Web Solutions" },
      {
        property: "og:description",
        content:
          "Modern websites engineered for local businesses. Beautiful design, sub-second load times, and local SEO that puts you on the map.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 md:pt-32 pb-32">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 hero-glow opacity-60 pointer-events-none" />

        <div className="container-page relative">
          <div className="max-w-4xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold tracking-[0.18em] uppercase mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Now accepting Q3 projects
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold leading-[1.02] tracking-tight">
              Digital products{" "}
              <span className="text-gradient italic">built for impact.</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              We engineer high-performance websites that turn local search
              traffic into customers. Custom design, sub-second load times, and
              local SEO built into the foundation.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/portfolio"
                className="px-7 py-4 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-transform shadow-xl shadow-primary/10"
              >
                View portfolio
              </Link>
              <Link
                to="/services"
                className="px-7 py-4 bg-surface border border-border text-foreground font-bold rounded-xl hover:bg-surface-2 transition-colors"
              >
                Our process
              </Link>
            </div>

            <dl className="mt-20 grid grid-cols-3 gap-8 max-w-xl">
              {[
                { v: "0.8s", l: "Avg load time" },
                { v: "100%", l: "Custom built" },
                { v: "5–7", l: "Day delivery" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {s.v}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-24 bg-surface/40 border-y border-border">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
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
                className="group p-7 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all duration-500"
              >
                <div className="size-11 rounded-xl grid place-items-center mb-6 bg-primary/10 group-hover:scale-110 transition-transform">
                  <div className="size-5 rounded-sm border-2 border-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
      <section className="py-32">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
                Selected works
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight italic">
                Recent transformations.
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary pb-1 uppercase tracking-widest text-xs"
            >
              All case studies →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {projects.slice(0, 2).map((p, i) => (
              <Link
                key={p.slug}
                to="/portfolio"
                className={`group ${i === 1 ? "md:mt-24" : ""}`}
              >
                <div className="overflow-hidden rounded-3xl bg-surface border border-border aspect-[4/3]">
                  <img
                    src={p.cover}
                    alt={p.name}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-8 flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-2">
                      {p.name}
                    </h3>
                    <p className="text-muted-foreground">{p.category}</p>
                  </div>
                  <div className="size-10 rounded-full border border-border grid place-items-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section className="py-24 bg-surface/40 border-y border-border">
        <div className="container-page">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
            Process
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-16 max-w-2xl">
            Simple, transparent, results-driven.
          </h2>
          <ol className="grid md:grid-cols-4 gap-8">
            {[
              {
                n: "01",
                t: "Discovery",
                d: "We learn your business, goals, and customers.",
              },
              {
                n: "02",
                t: "Design",
                d: "We craft a system tailored to your brand.",
              },
              {
                n: "03",
                t: "Develop",
                d: "We build it fast, responsive, and SEO-ready.",
              },
              {
                n: "04",
                t: "Launch & grow",
                d: "We launch and help your business grow online.",
              },
            ].map((step) => (
              <li
                key={step.n}
                className="p-6 rounded-2xl bg-background border border-border"
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
