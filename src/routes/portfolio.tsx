import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { projects } from "@/lib/site-data";

const demoSites = [
  {
    slug: "artisan-kitchen",
    name: "Artisan Kitchen",
    category: "Fine Dining · Hospitality",
    summary:
      "A fully branded restaurant landing page built around bookings, menus, and chef storytelling.",
    href: "/demo/restaurant",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "lush-luxe",
    name: "Lush & Luxe",
    category: "Hair Salon · Beauty",
    summary:
      "A premium salon experience, designed to inspire new bookings and membership loyalty.",
    href: "/demo/salon",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "proflow",
    name: "ProFlow",
    category: "Plumbing · Service",
    summary:
      "A conversion-first service site with easy contact, reviews, and local trust signals.",
    href: "/demo/plumbing",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "skyline",
    name: "Skyline",
    category: "Real Estate · Brokerage",
    summary:
      "A modern property showcase for agents who want fast search, concise listings, and strong visuals.",
    href: "/demo/realestate",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "peak-gym",
    name: "Peak Gym",
    category: "Fitness · Wellness",
    summary:
      "An energetic fitness homepage with membership plans, class schedules, and trainer highlights.",
    href: "/demo/fitness",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "bright-smile",
    name: "Bright Smile",
    category: "Dental · Health",
    summary:
      "A care-focused clinic landing page for appointment booking, service details, and patient trust.",
    href: "/demo/dental",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "greenscape",
    name: "GreenScape",
    category: "Landscaping · Design",
    summary:
      "A visual garden of services, projects, and seasonal offers for landscape designers.",
    href: "/demo/landscaping",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "luminous",
    name: "Luminous",
    category: "Photography · Creative",
    summary:
      "A portfolio-forward creative site with image-first storytelling and client booking prompts.",
    href: "/demo/photography",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "morrison-co",
    name: "Morrison & Co",
    category: "Law Firm · Professional",
    summary:
      "A polished advisory presence for legal services, client confidence, and clear next steps.",
    href: "/demo/lawyer",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "fasttrack-auto",
    name: "FastTrack Auto",
    category: "Auto Repair · Retail",
    summary:
      "A service-driven mechanic site with appointment scheduling, trust badges, and quick estimates.",
    href: "/demo/autorepair",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Emmanuel Web Solutions" },
      {
        name: "description",
        content:
          "Recent case studies: fintech dashboards, architecture studios, restaurants, and salons rebuilt for speed and conversion.",
      },
      { property: "og:title", content: "Portfolio — Emmanuel Web Solutions" },
      {
        property: "og:description",
        content:
          "Recent case studies and digital transformations from Emmanuel Web Solutions.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <PageShell>
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-40 pointer-events-none" />
        <div className="container-page relative">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
            Portfolio
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight max-w-3xl leading-[1.02]">
            Recent <span className="text-gradient italic">transformations.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            A collection of recent projects — bridging vision and digital reality across fintech, hospitality, and local services.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-page space-y-24">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              className={`grid md:grid-cols-12 gap-12 items-center ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="md:col-span-7">
                <div className="overflow-hidden rounded-3xl bg-surface border border-border aspect-[4/3]">
                  <img
                    src={p.cover}
                    alt={p.name}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-5">
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-3">
                  {p.category}
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-5">
                  {p.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {p.summary}
                </p>
                <dl className="grid grid-cols-3 gap-4 border-t border-border pt-6">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-2">
                        {m.label}
                      </dt>
                      <dd className="font-display text-xl md:text-2xl font-bold">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}

          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-3">
                Interactive Demos
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
                Live demos built like the case studies above
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mt-6">
                These demo sites are displayed in the same portfolio flow so you can replace the placeholder covers with your own images and keep the same visual rhythm.
              </p>
            </div>

            <div className="grid gap-24">
              {demoSites.map((demo, i) => (
                <article
                  key={demo.slug}
                  className={`grid md:grid-cols-12 gap-12 items-center ${
                    i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="md:col-span-7">
                    <a
                      href={demo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-3xl bg-surface border border-border aspect-[4/3]"
                    >
                      <div className="relative h-full w-full">
                        <img
                          src={demo.image}
                          alt={demo.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <p className="text-sm uppercase tracking-[0.18em] text-white/80 mb-3">
                            Demo preview
                          </p>
                          <p className="font-display text-3xl font-bold text-white">
                            {demo.name}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-3">
                      {demo.category}
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-5">
                      {demo.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {demo.summary}
                    </p>
                    <a
                      href={demo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      View live demo →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
