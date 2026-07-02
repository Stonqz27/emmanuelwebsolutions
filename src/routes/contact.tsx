import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Emmanuel Web Solutions" },
      {
        name: "description",
        content:
          "Tell us about your project. We respond to every inquiry within one business day.",
      },
      { property: "og:title", content: "Contact — Emmanuel Web Solutions" },
      {
        property: "og:description",
        content: "Start a project — every inquiry gets a reply within a day.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageShell>
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-40 pointer-events-none" />
        <div className="container-page relative">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-4">
            Contact
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight max-w-3xl leading-[1.02]">
            Let's build{" "}
            <span className="text-gradient italic">something real.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Tell me about your project. I reply to every inquiry within one
            business day — usually faster.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-page grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            {submitted ? (
              <div className="p-10 rounded-2xl bg-surface border border-primary/30">
                <p className="text-primary text-xs font-bold tracking-widest uppercase mb-4">
                  Thank you
                </p>
                <h2 className="font-display text-3xl font-bold mb-4">
                  Message received.
                </h2>
                <p className="text-muted-foreground">
                  I'll be in touch within one business day. In the meantime,
                  feel free to browse the portfolio.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Company / business" name="company" />
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-3"
                  >
                    Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full bg-surface border border-border rounded-[var(--radius)] px-[var(--space-2)] py-[var(--space-2)] text-[var(--font-size-base)] focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>Under $5k</option>
                    <option>$5k – $15k</option>
                    <option>$15k – $40k</option>
                    <option>$40k+</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-3"
                  >
                    Project details
                  </label>
                  <Textarea id="message" name="message" rows={6} required />
                </div>
                <div>
                  <Button type="submit" className="w-full md:w-auto">
                    Send message
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside className="md:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-surface border border-border">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-3">
                Email
              </p>
              <a
                href="mailto:hello@emmanuelwebsolutions.me"
                className="font-display text-xl font-bold hover:text-primary transition-colors break-words"
              >
                hello@emmanuelwebsolutions.me
              </a>
            </div>
            <div className="p-8 rounded-2xl bg-surface border border-border">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-3">
                Response time
              </p>
              <p className="font-display text-xl font-bold">
                Within 1 business day
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-primary text-primary-foreground">
              <p className="text-xs font-bold tracking-[0.18em] uppercase opacity-80 mb-3">
                Currently
              </p>
              <p className="font-display text-2xl font-bold leading-tight">
                Accepting Q3 projects.
              </p>
              <p className="mt-4 text-sm text-primary-foreground/80">
                Three project slots open. Book early to secure a kickoff date.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-3"
      >
        {label}
      </label>
      <Input id={name} name={name} type={type} required={required} />
    </div>
  );
}
