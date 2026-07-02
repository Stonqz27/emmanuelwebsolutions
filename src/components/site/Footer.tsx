import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary-foreground/70 mb-6">
            Let's build
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Ready to elevate your presence?
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl">
            Book a 20-minute consultation. We'll audit your current site live
            and send you a recording — even if you don't hire us.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/contact"
              className="px-8 py-4 bg-background text-foreground font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-transform shadow-xl"
            >
              Book a consultation
            </Link>
            <a
              href="mailto:hello@emmanuelwebsolutions.me"
              className="text-primary-foreground/90 font-medium underline-offset-4 hover:underline"
            >
              hello@emmanuelwebsolutions.me
            </a>
          </div>
        </div>

          <div className="mt-24 pt-10 border-t border-primary-foreground/15 flex flex-col md:flex-row justify-between gap-6 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Emmanuel Web Solutions.</p>
          <div className="flex gap-8">
            <Link to="/services" className="hover:text-primary-foreground">
              Services
            </Link>
            <Link to="/portfolio" className="hover:text-primary-foreground">
              Portfolio
            </Link>
            <Link to="/about" className="hover:text-primary-foreground">
              About
            </Link>
            <Link to="/contact" className="hover:text-primary-foreground">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-primary-foreground">
              Privacy
            </Link>
            <Link to="/pricing" className="hover:text-primary-foreground">
              Pricing
            </Link>
            <Link to="/terms" className="hover:text-primary-foreground">
              Terms
            </Link>
            <Link to="/security" className="hover:text-primary-foreground">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
