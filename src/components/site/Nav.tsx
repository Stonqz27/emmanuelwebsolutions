import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="container-page h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="size-9 rounded-lg bg-primary text-primary-foreground grid place-items-center font-display font-bold shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            E
          </div>
          <span className="font-display text-lg font-bold tracking-tight uppercase">
            Emmanuel
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-foreground" }}
              className="hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Start a project
          </Link>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden size-10 grid place-items-center rounded-lg border border-border"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container-page py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-base text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-center"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
