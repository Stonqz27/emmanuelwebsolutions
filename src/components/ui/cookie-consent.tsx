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
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:bottom-6 z-50">
      <div className="max-w-3xl mx-auto bg-card/95 backdrop-blur rounded-xl shadow-lg border p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="font-medium">We use cookies to improve the site</p>
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
            className="rounded-md px-4 py-2 bg-background border text-foreground"
          >
            Decline
          </button>
          <button
            onClick={() => save({ analytics: true, functional: true })}
            className="rounded-md px-4 py-2 bg-primary text-primary-foreground font-bold"
          >
            Accept
          </button>
          <button
            onClick={() => setShowManage((s) => !s)}
            className="ml-2 text-sm text-muted-foreground"
            aria-expanded={showManage}
          >
            Manage
          </button>
        </div>

        {showManage && (
          <div className="w-full mt-4 md:mt-0 md:w-72 bg-background rounded-md p-3 border">
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
