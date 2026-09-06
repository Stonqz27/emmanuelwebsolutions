import { createFileRoute } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const EMAIL = "hello@emmanuelwebsolutions.me";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Start Your $100 Website — Emmanuel Web Solutions" },
      {
        name: "description",
        content:
          "Tell Emmanuel about your business and start a professional website for $100 total.",
      },
      {
        property: "og:title",
        content: "Start Your $100 Website — Emmanuel Web Solutions",
      },
      {
        property: "og:description",
        content: "$50 to begin and $50 after you approve the finished website.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  function openEmailDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const company = String(form.get("company") ?? "");
    const projectType = String(form.get("projectType") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = encodeURIComponent(`$100 website inquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Business: ${company || "Not provided"}`,
        `Project type: ${projectType}`,
        "",
        "Project details:",
        message,
      ].join("\n"),
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b-2 border-foreground py-20 md:py-24">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="container-page relative">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Start a project
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
            Let&apos;s build your{" "}
            <span className="text-gradient">$100 website.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Tell me about your business and what the website needs to do. I
            reply within one business day—usually faster.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-page grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <form onSubmit={openEmailDraft} className="space-y-6">
              <Field label="Name" name="name" autoComplete="name" required />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
              <Field
                label="Business name"
                name="company"
                autoComplete="organization"
              />
              <div>
                <label
                  htmlFor="projectType"
                  className="mb-3 block font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground"
                >
                  What do you need?
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  className="w-full border-2 border-foreground bg-surface px-4 py-4 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option>New business website</option>
                  <option>Redesign my current website</option>
                  <option>Improve my mobile website</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-3 block font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground"
                >
                  Project details
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me what your business does, the pages you need, and when you would like to launch."
                  required
                />
              </div>
              <div>
                <Button type="submit" className="w-full md:w-auto">
                  Open email draft
                </Button>
                <p className="mt-3 text-sm text-muted-foreground">
                  This opens your email app with the project details filled in.
                </p>
              </div>
            </form>
          </div>

          <aside className="space-y-6 md:col-span-5">
            <div className="border-2 border-foreground bg-surface p-8">
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Email
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="break-words font-display text-xl font-bold transition-colors hover:text-primary"
              >
                {EMAIL}
              </a>
            </div>
            <div className="border-2 border-foreground bg-surface p-8">
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Call or text
              </p>
              <a
                href="tel:+14426534922"
                className="font-display text-xl font-bold transition-colors hover:text-primary"
              >
                (442) 653-4922
              </a>
            </div>
            <div className="border-2 border-foreground bg-primary p-8 text-primary-foreground">
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] opacity-80">
                Straightforward payment
              </p>
              <p className="font-display text-3xl font-bold leading-tight">
                $50 to begin. $50 after approval.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
                Total website price: $100. Any optional domain, hosting, or
                third-party service cost is explained before you agree to it.
              </p>
            </div>
            <div className="border-2 border-foreground bg-surface p-8">
              <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Availability
              </p>
              <p className="font-display text-xl font-bold">
                Booking new projects
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Every inquiry receives a personal reply from Emmanuel.
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
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-3 block font-mono text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground"
      >
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
}
