import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Emmanuel Web Solutions" },
      {
        name: "description",
        content:
          "A one-person studio for local businesses that are tired of generic templates and want a site that actually performs.",
      },
      { property: "og:title", content: "About — Emmanuel Web Solutions" },
      {
        property: "og:description",
        content:
          "A one-person studio for local businesses that want a serious website built by a single craftsman.",
      },
      { property: "og:image", content: portrait },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-40 pointer-events-none" />
        <div className="container-page relative grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-7">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
              About
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.02]">
              A one-person studio for{" "}
              <span className="text-gradient italic">serious businesses.</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">
              I'm Emmanuel — designer, developer, and the single point of
              contact on every project. No account managers, no junior
              hand-offs. You talk to the person who builds your site.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-border aspect-[3/4] bg-surface">
              <img
                src={portrait}
                alt="Emmanuel, founder"
                width={900}
                height={1100}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface/40 border-y border-border">
        <div className="container-page max-w-3xl">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-6">
            Philosophy
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            "A website should pay for itself in the first 90 days. If it
            doesn't, it's not a website — it's a brochure."
          </h2>
          <div className="mt-12 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I started this studio after watching too many small businesses get
              sold $300 templates that loaded in 8 seconds and ranked nowhere. A
              local restaurant deserves the same engineering rigor as a Series-B
              startup.
            </p>
            <p>
              Every project here is hand-coded, accessibility-checked, and
              measured against Core Web Vitals before launch. You get a real
              system, not a Squarespace export.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { v: "100%", l: "Projects hand-coded" },
              { v: "<1s", l: "Avg page load" },
              { v: "1", l: "Person on your project" },
            ].map((s) => (
              <div
                key={s.l}
                className="p-8 rounded-2xl bg-surface border border-border"
              >
                <p className="font-display text-5xl font-bold text-gradient">
                  {s.v}
                </p>
                <p className="mt-4 text-sm uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-4">
            <Link
              to="/portfolio"
              className="px-7 py-4 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] transition-transform"
            >
              See the work
            </Link>
            <Link
              to="/contact"
              className="px-7 py-4 bg-surface border border-border text-foreground font-bold rounded-xl hover:bg-surface-2 transition-colors"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
