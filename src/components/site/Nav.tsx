import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-foreground bg-background">
      <div className="container-page h-14 flex items-center justify-between">
        <Link
          to="/"
          className="group font-mono text-sm font-semibold tracking-[0.2em] uppercase"
        >
          <span className="transition-colors group-hover:text-primary">
            EMMANUEL<span className="text-primary">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9 font-mono text-xs font-medium uppercase tracking-[0.14em] text-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-foreground" }}
              className="hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-2 border-2 border-foreground px-5 py-2 text-xs font-semibold transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            Start a project
          </Link>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden size-9 grid place-items-center border-2 border-foreground"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t-2 border-foreground bg-background">
          <div className="container-page py-6 flex flex-col gap-5 font-mono text-sm uppercase tracking-[0.14em]">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-foreground hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block border-2 border-primary bg-primary px-5 py-3 text-center font-semibold text-primary-foreground"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
