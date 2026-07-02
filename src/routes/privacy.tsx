import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Emmanuel Web Solutions" },
      {
        name: "description",
        content:
          "Read how Emmanuel Web Solutions handles privacy, cookie choices, and data requests.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell>
      <div className="container-page py-24">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Privacy Policy
          </h1>

          <p className="mt-6 text-base text-muted-foreground">
            Last updated: July 1, 2026
          </p>

          <section className="mt-8 space-y-6 text-sm text-foreground/90">
            <p>
              Emmanuel Web Solutions (“we”, “us”, “our”) respects your privacy
              and is committed to protecting your personal data. This page
              explains what data we collect, why we collect it, and your
              choices regarding it. This is a general-purpose policy template
              — please contact us at hello@emmanuelwebsolutions.me for
              specific questions.
            </p>

            <h2 className="font-medium text-lg">Information we collect</h2>
            <p>
              We collect information that helps us provide our services, such
              as contact information you provide when requesting a consultation
              (name, email, phone) and analytics data to understand site
              performance. We do not sell personal data.
            </p>

            <h2 className="font-medium text-lg">Cookies &amp; tracking</h2>
            <p>
              We use functional cookies required for the site to operate and
              optional analytics cookies. You can accept or decline analytics
              cookies via the cookie banner on the site. For details, see the
              Cookie Settings in the banner.
            </p>

            <h2 className="font-medium text-lg">Third parties</h2>
            <p>
              We may use third-party services (for analytics, hosting,
              payments) that may collect data under their own policies. We
              evaluate providers for security and compliance.
            </p>

            <h2 className="font-medium text-lg">Your rights</h2>
            <p>
              Depending on where you live you may have rights to access,
              correct, delete, or port your data. To exercise those rights,
              contact hello@emmanuelwebsolutions.me. We respond promptly and
              will follow applicable law.
            </p>

            <h2 className="font-medium text-lg">Data retention &amp; security</h2>
            <p>
              We retain personal data only as long as needed to provide
              services and as required by law. We maintain administrative and
              technical safeguards to protect data, and regularly review our
              practices.
            </p>

            <h2 className="font-medium text-lg">Contact</h2>
            <p>
              Questions about this policy or requests regarding your data can
              be sent to hello@emmanuelwebsolutions.me.
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
