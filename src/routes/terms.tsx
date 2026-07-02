import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/site/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Emmanuel Web Solutions" },
      {
        name: "description",
        content:
          "Review the terms governing use of Emmanuel Web Solutions' website and services.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell>
      <div className="container-page py-24">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Terms of Service
          </h1>

          <p className="mt-6 text-base text-muted-foreground">
            Last updated: July 1, 2026
          </p>

          <section className="mt-8 space-y-6 text-sm text-foreground/90">
            <p>
              These Terms of Service govern your use of Emmanuel Web
              Solutions’ website and services. By accessing or using our
              services you agree to these terms. This document is a general
              template and does not constitute legal advice.
            </p>

            <h2 className="font-medium text-lg">Services</h2>
            <p>
              We provide web design and development services. Specific project
              terms (scope, deliverables, payment, timeline) are defined in
              individual contracts.
            </p>

            <h2 className="font-medium text-lg">Payment &amp; refunds</h2>
            <p>
              Project fees and payment schedules are set in proposals and
              contracts. Refunds and cancellations are governed by those
              agreements.
            </p>

            <h2 className="font-medium text-lg">Intellectual property</h2>
            <p>
              Unless otherwise specified, we retain ownership of pre-existing
              tools and components. Project deliverables are licensed or
              transferred as described in the contract.
            </p>

            <h2 className="font-medium text-lg">Limitation of liability</h2>
            <p>
              To the extent permitted by law, Emmanuel Web Solutions’ liability
              is limited as set out in individual agreements.
            </p>

            <h2 className="font-medium text-lg">Contact</h2>
            <p>
              For questions about these terms, contact hello@emmanuelwebsolutions.me.
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
