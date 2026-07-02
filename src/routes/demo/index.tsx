import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/")({
  component: DemoIndex,
  head: () => ({
    meta: [
      { title: "Demo Gallery — Ten Redesigned Templates" },
      { name: "description", content: "Ten small-business landing pages, each with a distinct art direction." },
    ],
  }),
});

const demos = [
  { slug: "plumbing", name: "ProFlow Plumbing", tag: "Industrial · utility yellow" },
  { slug: "dental", name: "Bright Smile Dental", tag: "Editorial · sage & cream" },
  { slug: "restaurant", name: "Artisan Kitchen", tag: "Fine dining · warm dark" },
  { slug: "fitness", name: "PEAK Gym", tag: "Brutalist · acid lime" },
  { slug: "salon", name: "Lush & Luxe", tag: "Magazine · terracotta" },
  { slug: "lawyer", name: "Morrison & Associates", tag: "Austere · navy & gold" },
  { slug: "realestate", name: "Skyline Properties", tag: "Luxury · ivory serif" },
  { slug: "landscaping", name: "GreenScape Design", tag: "Earthy · botanical" },
  { slug: "photography", name: "LUMINOUS Studio", tag: "Gallery · full-bleed dark" },
  { slug: "autorepair", name: "FastTrack Auto", tag: "Garage · hazard stripe" },
];

function DemoIndex() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 md:p-16" style={{ fontFamily: "Inter, system-ui" }}>
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-6">— Demo gallery</p>
        <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl md:text-7xl font-light leading-tight">
          Ten templates, <em className="italic text-amber-400">ten voices</em>.
        </h1>
        <p className="mt-6 text-neutral-400 max-w-xl">Each page below is a distinct redesign of the original starter templates — different typography, palette, composition, and tone.</p>
        <div className="mt-16 divide-y divide-neutral-800 border-y border-neutral-800">
          {demos.map((d, i) => (
            <a href={`/demo/${d.slug}`} key={d.slug} className="grid grid-cols-12 gap-4 py-6 hover:bg-neutral-900 px-4 items-baseline group">
              <span className="col-span-1 text-neutral-500 font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontFamily: "'Fraunces', serif" }} className="col-span-6 text-2xl group-hover:text-amber-400">{d.name}</span>
              <span className="col-span-4 text-sm text-neutral-500">{d.tag}</span>
              <span className="col-span-1 text-right text-neutral-500 group-hover:text-amber-400">→</span>
            </a>

          ))}
        </div>
      </div>
    </div>
  );
}
