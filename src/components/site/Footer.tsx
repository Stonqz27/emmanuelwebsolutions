import { Link } from "@tanstack/react-router";

const footerLinks = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
  { to: "/pricing", label: "Pricing" },
  { to: "/terms", label: "Terms" },
  { to: "/security", label: "Security" },
] as const;

export function Footer() {
  return (
    <footer className="border-t-2 border-foreground bg-background text-foreground">
      <div className="container-page py-24">
        <div className="max-w-3xl">
          <p className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            [ Let&apos;s build ]
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Ready to elevate your presence?
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Tell me what your business needs. I&apos;ll reply personally and
            show you how the $100 website process works.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/contact"
              className="border-2 border-foreground px-8 py-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
            >
              Start your $100 website
            </Link>
            <a
              href="mailto:hello@emmanuelwebsolutions.me"
              className="font-mono text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              hello@emmanuelwebsolutions.me
            </a>
            {/* Replace the generic LinkedIn URL with Emmanuel's profile URL. */}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-medium text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-24 flex flex-col justify-between gap-6 border-t-2 border-foreground pt-8 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Emmanuel Web Solutions.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
            {footerLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
