import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Emmanuel Web Solutions" },
      {
        name: "description",
        content:
          "Website design, redesign, mobile optimization, and local SEO services for businesses that want to be taken seriously online.",
      },
      { property: "og:title", content: "Services — Emmanuel Web Solutions" },
      {
        property: "og:description",
        content:
          "Website design, redesign, mobile optimization, and local SEO services for serious local businesses.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell>
      <section className="pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-40 pointer-events-none" />
        <div className="container-page relative">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
            Services
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight max-w-3xl">
            Everything your business{" "}
            <span className="text-gradient italic">needs online.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            The essentials work together in one straightforward website. Every
            $100 project includes design, mobile support, performance, and basic
            search setup.
          </p>
          <div className="mt-10">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition hover:bg-primary/90"
            >
              See the $100 website
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-page divide-y divide-border border-y border-border">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-12 items-center hover:bg-surface/30 px-4 -mx-4 rounded-2xl transition-colors"
            >
              <span className="md:col-span-1 font-display text-sm font-bold text-primary">
                0{i + 1}
              </span>
              <div className="md:col-span-5">
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                  {s.title}
                </h2>
                <p className="mt-2 text-primary text-sm font-medium">
                  {s.tagline}
                </p>
              </div>
              <p className="md:col-span-5 text-muted-foreground leading-relaxed">
                {s.blurb}
              </p>
              <span className="md:col-span-1 text-right text-2xl text-muted-foreground group-hover:text-foreground transition-colors">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
