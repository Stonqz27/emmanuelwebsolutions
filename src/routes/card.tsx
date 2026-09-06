import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MessageSquare,
  Globe,
  ArrowUpRight,
  Frame,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

const PHONE_TEL = "+14426534922";
const PHONE_DISPLAY = "(442) 653-4922";
const EMAIL = "hello@emmanuelwebsolutions.me";
const VCF = "/contact.vcf";

export const Route = createFileRoute("/card")({
  head: () => ({
    meta: [
      { title: "Emmanuel — Web Designer / Developer" },
      {
        name: "description",
        content:
          "Digital business card for Emmanuel. Web designer / developer. Need a website? Starting at $100.",
      },
      { property: "og:title", content: "Emmanuel — Web Designer / Developer" },
      {
        property: "og:description",
        content:
          "Web designer / developer. Call, text, email, or view the work.",
      },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: CardPage,
});

const actions: {
  label: string;
  value: string;
  href: string;
  icon: typeof Phone;
  external?: boolean;
  internal?: boolean;
}[] = [
  {
    label: "Call Me",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_TEL}`,
    icon: Phone,
  },
  {
    label: "Text Me",
    value: PHONE_DISPLAY,
    href: `sms:${PHONE_TEL}`,
    icon: MessageSquare,
  },
  { label: "Email Me", value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail },
  {
    label: "View My Work",
    value: "portfolio",
    href: "/portfolio",
    icon: Frame,
    internal: true,
  },
  {
    label: "LinkedIn",
    value: "Add profile URL",
    href: "https://www.linkedin.com/",
    icon: Globe,
    external: true,
  },
  {
    label: "My Website",
    value: "emmanuelwebsolutions.me",
    href: "https://emmanuelwebsolutions.me",
    icon: Globe,
    external: true,
  },
];

function CardPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 hero-glow opacity-50 pointer-events-none" />
        <div className="container-page relative flex justify-center">
          {/* Card */}
          <div className="w-full max-w-md">
            <div className="relative rounded-3xl bg-surface border border-border overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

              <div className="relative p-8 md:p-10">
                {/* Brand */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="size-11 rounded-xl bg-primary text-primary-foreground grid place-items-center font-display font-bold shadow-lg shadow-primary/20">
                    E
                  </div>
                  <div>
                    <p className="font-display font-bold uppercase tracking-tight leading-none">
                      Emmanuel
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
                      Web Solutions
                    </p>
                  </div>
                </div>

                {/* Name + role */}
                <div className="mb-10">
                  <h1 className="font-display text-4xl font-bold tracking-tight">
                    Emmanuel
                  </h1>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-gradient font-semibold">
                    Web Designer / Developer
                  </p>
                  <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                    Custom websites designed and hand-coded for local
                    businesses. Fast, modern, built to bring in customers.
                  </p>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="group flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-foreground text-background font-bold hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  <span>
                    Need a website?
                    <span className="block text-background/70 font-medium text-sm">
                      $100 total · $50 now, $50 after approval
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                {/* Actions */}
                <div className="mt-4 space-y-2">
                  {actions.map((a) => {
                    const Icon = a.icon;
                    const content = (
                      <>
                        <span className="size-10 rounded-xl bg-surface border border-border grid place-items-center shrink-0">
                          <Icon className="size-4 text-primary" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold">
                            {a.label}
                          </span>
                          <span className="block text-xs text-muted-foreground truncate">
                            {a.value}
                          </span>
                        </span>
                        <ArrowUpRight className="size-4 text-muted-foreground shrink-0" />
                      </>
                    );
                    const cls =
                      "flex items-center gap-3 px-4 py-3 rounded-2xl border border-border hover:border-primary/40 hover:bg-surface-2 transition-colors";
                    return a.internal ? (
                      <Link key={a.label} to={a.href} className={cls}>
                        {content}
                      </Link>
                    ) : (
                      <a
                        key={a.label}
                        href={a.href}
                        target={a.external ? "_blank" : undefined}
                        rel={a.external ? "noopener noreferrer" : undefined}
                        className={cls}
                      >
                        {content}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Save contact */}
            <a
              href={VCF}
              download="Emmanuel.web.vcf"
              className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="size-4 text-primary" /> Save contact
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
