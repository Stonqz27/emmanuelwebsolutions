import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    const title = s ? `${s.title} — Emmanuel Web Solutions` : "Service";
    const description = s?.blurb ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <PageShell>
      <section className="pt-20 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-50 pointer-events-none" />
        <div className="container-page relative">
          <Link
            to="/services"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
          >
            ← All services
          </Link>
          <h1 className="mt-8 font-display text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.02]">
            {service.title}
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gradient font-medium italic max-w-3xl">
            {service.tagline}
          </p>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {service.blurb}
          </p>
        </div>
      </section>

      <section className="py-20 border-y border-border bg-surface/30">
        <div className="container-page grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-6">
              What's included
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">
              The full deliverable.
            </h2>
            <ul className="space-y-4">
              {service.deliverables.map((d: string) => (
                <li
                  key={d}
                  className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border"
                >
                  <span className="mt-1 size-2 rounded-full bg-primary shrink-0" />
                  <span className="text-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="p-8 rounded-2xl bg-background border border-border">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-3">
                Timeline
              </p>
              <p className="font-display text-3xl font-bold">
                {service.timeline}
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-primary text-primary-foreground">
              <p className="text-xs font-bold tracking-[0.18em] uppercase opacity-80 mb-3">
                Ready to start?
              </p>
              <p className="font-display text-2xl font-bold mb-6 leading-tight">
                Book a free 20-minute consultation.
              </p>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-background text-foreground font-bold rounded-xl hover:scale-[1.02] transition-transform"
              >
                Get in touch
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
            Continue exploring
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Other services.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group p-7 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-colors"
              >
                <h3 className="font-display text-xl font-bold mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.tagline}
                </p>
                <p className="mt-6 text-xs font-bold tracking-widest uppercase text-primary">
                  Learn more →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
