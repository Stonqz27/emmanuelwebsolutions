import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Emmanuel Web Solutions" },
      {
        name: "description",
        content:
          "Affordable website packages from $300 with clear service scope and final pricing confirmed by call.",
      },
      { property: "og:title", content: "Pricing — Emmanuel Web Solutions" },
      {
        property: "og:description",
        content:
          "Simple website pricing packages for local businesses, with final costs confirmed in a quick call.",
      },
    ],
  }),
  component: PricingPage,
});

const packages = [
  {
    title: "Starter Website",
    subtitle: "Best for new local businesses",
    price: "$150",
    features: [
      "One clean landing page with mobile-first design",
      "Fast load speed, professional layout, contact CTA",
      "Essential local SEO structure and lead capture",
    ],
  },
  {
    title: "Growth Website",
    subtitle: "Great for businesses ready to expand",
    price: "$350",
    features: [
      "Up to 5 responsive pages",
      "Built-in contact form and appointment info",
      "SEO-friendly sections for local search",
    ],
  },
  {
    title: "Launch Website",
    subtitle: "For brands that want a polished online presence",
    price: "$450",
    features: [
      "Homepage, services, portfolio, and contact",
      "Speed optimization and user-friendly copy structure",
      "Support to launch and connect your email",
    ],
  },
];

function PricingPage() {
  return (
    <PageShell>
      <section className="pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-40 pointer-events-none" />
        <div className="container-page relative">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
            Pricing
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight max-w-3xl">
            Website packages designed to win customers — not waste your budget.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Packages start at $150. These prices are an aggressive entry offer, and the final project cost is confirmed in a free call so you get exactly what you need.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {packages.map((item) => (
            <div key={item.title} className="rounded-3xl border border-border bg-surface p-8 shadow-lg shadow-slate-900/5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-2">
                    {item.subtitle}
                  </p>
                  <h2 className="font-display text-3xl font-bold tracking-tight">
                    {item.title}
                  </h2>
                </div>
                <p className="text-3xl font-bold text-foreground">{item.price}</p>
              </div>
              <div className="mt-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
                {item.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span className="mt-1 text-primary">•</span>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <a
                  href="mailto:hello@emmanuelwebsolutions.me"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Email to book a call
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-32">
        <div className="container-page rounded-[2rem] border border-border bg-background p-10 md:p-14">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-4">
              Need help choosing?
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Final pricing is always agreed by call.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Every business is unique. These package prices show the typical starting value, and then we tailor the final scope during a quick discovery call.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-8 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                Start the inquiry
              </Link>
              <a
                href="mailto:hello@emmanuelwebsolutions.me"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Email hello@emmanuelwebsolutions.me
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
