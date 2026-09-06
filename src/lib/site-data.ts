export const services = [
  {
    slug: "website-design",
    title: "Website Design",
    tagline: "A professional website designed for your business.",
    blurb:
      "A clear, professional website built around your business, your customers, and the action you want visitors to take.",
    deliverables: [
      "Discovery & competitor audit",
      "Wireframes and high-fidelity design",
      "Hand-coded responsive build",
      "Contact and call-to-action setup",
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
    tagline: "A better experience on the device that matters most.",
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
    tagline: "Give search engines a clear foundation.",
    blurb:
      "Basic technical SEO, clear page structure, and local signals help search engines understand your business.",
    deliverables: [
      "Google Business Profile guidance",
      "Local schema markup",
      "Search-friendly page titles and descriptions",
      "Keyword-aware content structure",
      "Launch-day search checklist",
    ],
    timeline: "Included in build",
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];
