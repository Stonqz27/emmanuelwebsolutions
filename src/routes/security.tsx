import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/site/PageShell";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security Practices — Emmanuel Web Solutions" },
      {
        name: "description",
        content:
          "See how Emmanuel Web Solutions approaches security, access control, and incident readiness.",
      },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <PageShell>
      <div className="container-page py-24">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Security Practices
          </h1>

          <p className="mt-6 text-base text-muted-foreground">
            Last updated: July 1, 2026
          </p>

          <section className="mt-8 space-y-6 text-sm text-foreground/90">
            <p>
              We take security seriously. This page summarizes technical and
              organizational measures we use to protect client and user data.
            </p>

            <h2 className="font-medium text-lg">Encryption</h2>
            <p>
              Data in transit is protected via HTTPS/TLS. Where applicable we
              use encryption at rest provided by our hosting and database
              providers.
            </p>

            <h2 className="font-medium text-lg">Access control</h2>
            <p>
              Access to production systems and sensitive data is limited to
              authorized personnel. We follow principle of least privilege and
              use strong authentication methods for team access.
            </p>

            <h2 className="font-medium text-lg">Vulnerability management</h2>
            <p>
              We apply security patches regularly, scan dependencies for
              vulnerabilities, and remediate issues based on risk.
            </p>

            <h2 className="font-medium text-lg">Incident response</h2>
            <p>
              We maintain an incident response plan to investigate and remediate
              security incidents promptly, and to notify affected parties as
              required by law.
            </p>

            <h2 className="font-medium text-lg">Contact</h2>
            <p>
              Report security concerns to hello@emmanuelwebsolutions.me.
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
