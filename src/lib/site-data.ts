import caseNexus from "@/assets/case-nexus.jpg";
import caseVantage from "@/assets/case-vantage.jpg";
import caseBistro from "@/assets/case-bistro.jpg";
import caseSalon from "@/assets/case-salon.jpg";

export const services = [
  {
    slug: "website-design",
    title: "Website Design",
    tagline: "Custom websites engineered from scratch.",
    blurb:
      "Bespoke websites built around your brand and customers — no themes, no templates, no compromises.",
    deliverables: [
      "Discovery & competitor audit",
      "Wireframes and high-fidelity design",
      "Hand-coded responsive build",
      "CMS setup and team training",
      "Performance & accessibility tuning",
    ],
    timeline: "5–7 days",
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    tagline: "Modernize an outdated site without losing what works.",
    blurb:
      "Keep your SEO equity, lose the clutter. We audit your current site, preserve what's earning, and rebuild the rest.",
    deliverables: [
      "Full UX & SEO audit",
      "Content migration plan",
      "Modernized design system",
      "Redirect map (no traffic lost)",
      "Side-by-side performance report",
    ],
    timeline: "5–10 days",
  },
  {
    slug: "mobile-optimization",
    title: "Mobile Optimization",
    tagline: "Sites that load instantly on the device that matters most.",
    blurb:
      "Over 70% of local searches happen on mobile. We make sure your site is fast, tappable, and conversion-ready on every screen.",
    deliverables: [
      "Core Web Vitals optimization",
      "Touch & gesture refinement",
      "Image & font delivery audit",
      "Mobile-first layout pass",
      "Real-device QA",
    ],
    timeline: "3–5 days",
  },
  {
    slug: "local-seo",
    title: "Local SEO",
    tagline: "Show up where your customers are searching.",
    blurb:
      "Technical SEO, schema markup, and a local content strategy that puts your business on the map — literally.",
    deliverables: [
      "Google Business Profile setup",
      "Local schema markup",
      "Citation & directory cleanup",
      "Keyword & content roadmap",
      "Monthly performance reports",
    ],
    timeline: "Ongoing",
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

export const projects = [
  {
    slug: "nexus-platform",
    name: "Nexus Platform",
    category: "Fintech · SaaS Development",
    summary:
      "A modular dashboard for a regional fintech, rebuilt from a slow WordPress site into a sub-second React app.",
    metrics: [
      { label: "Page load", value: "0.8s" },
      { label: "Lead increase", value: "+186%" },
      { label: "Time to ship", value: "9 days" },
    ],
    cover: caseNexus,
  },
  {
    slug: "vantage-arch",
    name: "Vantage Arch",
    category: "Real Estate · Brand Identity",
    summary:
      "An identity refresh and editorial portfolio site for a high-end architecture studio.",
    metrics: [
      { label: "Inquiries", value: "+212%" },
      { label: "Avg session", value: "3:42" },
      { label: "Lighthouse", value: "100" },
    ],
    cover: caseVantage,
  },
  {
    slug: "the-gilded-fork",
    name: "The Gilded Fork",
    category: "Hospitality · Reservations",
    summary:
      "A neighborhood bistro went from a Facebook page to a fully booked restaurant with online reservations.",
    metrics: [
      { label: "Bookings", value: "+340%" },
      { label: "Local rank", value: "#1" },
      { label: "Build time", value: "6 days" },
    ],
    cover: caseBistro,
  },
  {
    slug: "atelier-noir",
    name: "Atelier Noir",
    category: "Salon · Booking System",
    summary:
      "A premium salon's appointment system, redesigned around the stylist's day, not the customer's confusion.",
    metrics: [
      { label: "No-shows", value: "−54%" },
      { label: "Repeat clients", value: "+78%" },
      { label: "Mobile load", value: "0.6s" },
    ],
    cover: caseSalon,
  },
] as const;

export type ProjectSlug = (typeof projects)[number]["slug"];
