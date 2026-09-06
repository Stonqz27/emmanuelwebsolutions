import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Emmanuel Web Solutions" },
      {
        name: "description",
        content:
          "Read how Emmanuel Web Solutions handles contact information and privacy requests.",
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
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Privacy Policy
          </h1>

          <p className="mt-6 text-base text-muted-foreground">
            Last updated: September 5, 2026
          </p>

          <section className="mt-8 space-y-6 text-sm text-foreground/90">
            <p>
              Emmanuel Web Solutions respects your privacy. This page explains
              what information may be received when you contact the business and
              how to ask questions about it.
            </p>

            <h2 className="text-lg font-medium">Information you provide</h2>
            <p>
              When you send a website inquiry, you may provide your name, email
              address, business name, and project details. This information is
              used to reply to you and discuss the service you requested. It is
              not sold.
            </p>

            <h2 className="text-lg font-medium">Cookies and technical data</h2>
            <p>
              This website does not currently use advertising or analytics
              cookies. The hosting provider may process basic technical logs
              needed to deliver, maintain, and secure the website.
            </p>

            <h2 className="text-lg font-medium">Service providers</h2>
            <p>
              Hosting, email, domain, and payment providers may process limited
              information under their own privacy policies when their services
              are used. Any payment-provider details will be shown before a
              payment is requested.
            </p>

            <h2 className="text-lg font-medium">Retention and requests</h2>
            <p>
              Inquiry information is kept only as long as reasonably needed to
              respond, provide the requested service, maintain business records,
              or meet applicable obligations. To request access, correction, or
              deletion, email hello@emmanuelwebsolutions.me.
            </p>

            <h2 className="text-lg font-medium">Contact</h2>
            <p>
              Questions about this policy can be sent to
              hello@emmanuelwebsolutions.me.
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
