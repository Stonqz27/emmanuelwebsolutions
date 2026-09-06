import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

type Consent = {
  analytics: boolean;
  functional: boolean;
};

const STORAGE_KEY = "ews_cookie_consent_v1";

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [showManage, setShowManage] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setConsent(JSON.parse(raw));
    } catch {
      setConsent(null);
    }
  }, []);

  function save(next: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setConsent(next);
      // emit a small window event for other scripts
      window.dispatchEvent(new CustomEvent("cookie-consent", { detail: next }));
    } catch (e) {
      console.error(e);
    }
  }

  if (consent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-auto md:right-6">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 border-2 border-foreground bg-card p-4 md:flex-row md:items-center md:p-6">
        <div className="flex-1">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            We use cookies to improve the site
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Functional cookies are required for the site to work. Analytics
            cookies help us improve performance. Manage your preferences or
            accept to continue.
          </p>
          <div className="mt-3 text-sm">
            <Link to="/privacy" className="underline">
              Privacy policy
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => save({ analytics: false, functional: true })}
            className="border-2 border-foreground bg-background px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background"
          >
            Decline
          </button>
          <button
            onClick={() => save({ analytics: true, functional: true })}
            className="border-2 border-primary bg-primary px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Accept
          </button>
          <button
            onClick={() => setShowManage((s) => !s)}
            className="ml-2 font-mono text-xs uppercase text-muted-foreground hover:text-primary"
            aria-expanded={showManage}
          >
            Manage
          </button>
        </div>

        {showManage && (
          <div className="mt-4 w-full border-2 border-foreground bg-background p-3 md:mt-0 md:w-72">
            <label className="flex items-center justify-between">
              <span className="text-sm">Analytics cookies</span>
              <input
                type="checkbox"
                onChange={(e) =>
                  save({ analytics: e.target.checked, functional: true })
                }
                defaultChecked={false}
                aria-label="Enable analytics cookies"
              />
            </label>
            <p className="mt-2 text-xs text-muted-foreground">
              Allow anonymous analytics to help us improve site performance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
