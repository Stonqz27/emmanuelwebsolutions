import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/landscaping")({
  component: LandscapingDemo,
  head: () => ({
    meta: [
      { title: "GreenScape — Landscape Design & Build" },
      { name: "description", content: "Native-first landscape design and installation. 20+ years designing outdoor rooms." },
    ],
  }),
});

const projects = [
  { n: "Modern Zen Courtyard", tag: "Design + Build", loc: "Portola Valley", c: "from-[#8fa583] to-[#3f4d3a]" },
  { n: "Family Entertainment Oasis", tag: "Hardscape", loc: "Los Altos", c: "from-[#c9a373] to-[#6d5a3a]" },
  { n: "Coastal Native Garden", tag: "Ecological", loc: "Half Moon Bay", c: "from-[#a8b89a] to-[#5a6d54]" },
  { n: "Estate Grounds Renewal", tag: "Renovation", loc: "Woodside", c: "from-[#b8a888]  to-[#4d3f2e]" },
];

function LandscapingDemo() {
  return (
    <div className="min-h-screen bg-[#f2ede0] text-[#2b3226]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#f2ede0]/85 backdrop-blur border-b border-[#2b3226]/10">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8fa583] to-[#3f4d3a]"/>
            <span style={{ fontFamily: "'Fraunces', Georgia, serif" }} className="text-xl">GreenScape <em className="italic text-[#a35a2e]">Design</em></span>
          </div>
          <div className="hidden md:flex gap-10 text-sm text-[#5a6154]">
            <a href="#work" className="hover:text-[#a35a2e]">Work</a>
            <a href="#services" className="hover:text-[#a35a2e]">Services</a>
            <a href="#process" className="hover:text-[#a35a2e]">Process</a>
            <a href="#quote" className="hover:text-[#a35a2e]">Enquire</a>
          </div>
          <a href="#quote" className="text-sm border border-[#2b3226] px-5 py-2 rounded-full hover:bg-[#2b3226] hover:text-[#f2ede0] transition">Free consult</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 pt-16 pb-24 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-[0.4em] text-[#a35a2e] mb-8">— Design · Build · Steward</p>
            <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9] font-light">
              Outdoor rooms,<br/>
              <em className="italic text-[#3f4d3a]">rooted in place</em>.
            </h1>
            <p className="mt-10 text-lg text-[#5a6154] max-w-lg leading-relaxed">
              Native-first landscape design and construction. We design gardens that mature into something better
              every year — not less.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#quote" className="bg-[#3f4d3a] text-[#f2ede0] px-8 py-4 rounded-full">Start a project</a>
              <a href="#work" className="border border-[#2b3226] px-8 py-4 rounded-full hover:bg-[#2b3226] hover:text-[#f2ede0]">See our work →</a>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="aspect-square rounded-full bg-gradient-to-br from-[#8fa583] via-[#c9a373] to-[#3f4d3a] relative">
              <div className="absolute inset-8 rounded-full border border-[#f2ede0]/40"/>
              <div className="absolute inset-0 flex items-center justify-center text-center px-8">
                <div>
                  <p style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl text-[#f2ede0]">20+</p>
                  <p className="text-xs uppercase tracking-widest text-[#f2ede0]/80 mt-1">years cultivating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="work" className="max-w-6xl mx-auto px-8 py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#a35a2e]">— Selected work</p>
            <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl md:text-5xl mt-3 font-light">A garden per season.</h2>
          </div>
          <p className="max-w-sm text-[#5a6154] italic">We take on twelve projects a year. Each gets our full attention.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <a href="#" key={p.n} className={`group ${i === 0 ? "md:row-span-2" : ""}`}>
              <div className={`bg-gradient-to-br ${p.c} ${i === 0 ? "aspect-[4/5]" : "aspect-[4/3]"} relative overflow-hidden`}>
                <div className="absolute inset-4 border border-[#f2ede0]/30"/>
                <div className="absolute bottom-4 left-4 bg-[#f2ede0] text-[#2b3226] text-xs uppercase tracking-widest px-3 py-1.5">{p.tag}</div>
              </div>
              <div className="mt-4">
                <p style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl group-hover:text-[#a35a2e] transition">{p.n}</p>
                <p className="text-[#5a6154] italic">{p.loc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-[#e6dfcb] py-24">
        <div className="max-w-6xl mx-auto px-8">
          <p className="text-xs uppercase tracking-[0.4em] text-[#a35a2e]">— What we do</p>
          <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl md:text-5xl mt-3 mb-14 font-light">Services.</h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {[
              { t: "Landscape Design", d: "Site analysis, planting plans, and construction drawings for residential grounds." },
              { t: "Hardscape & Build", d: "Patios, pergolas, retaining walls, water features — installed by our own crew." },
              { t: "Native Ecology", d: "Meadow conversions, pollinator gardens, low-water designs for California climate." },
              { t: "Stewardship", d: "Ongoing seasonal care so gardens improve year over year, not decline." },
            ].map((s) => (
              <div key={s.t} className="border-t border-[#2b3226]/20 pt-6">
                <p style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl mb-3">— {s.t}</p>
                <p className="text-[#5a6154] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="max-w-6xl mx-auto px-8 py-24">
        <p className="text-xs uppercase tracking-[0.4em] text-[#a35a2e]">— The process</p>
        <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl md:text-5xl mt-3 mb-14 font-light">Six months, then a lifetime.</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            ["01", "Walk", "We visit, listen, and read the site."],
            ["02", "Design", "Master plan, plantings, materials."],
            ["03", "Build", "In-house crew installs to spec."],
            ["04", "Steward", "Seasonal visits so it thrives."],
          ].map(([n,t,d]) => (
            <div key={n} className="border-t border-[#2b3226] pt-6">
              <p style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl text-[#a35a2e]">{n}</p>
              <p style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl mt-2">{t}</p>
              <p className="text-[#5a6154] mt-2 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="bg-[#2b3226] text-[#f2ede0] py-24">
        <div className="max-w-3xl mx-auto px-8 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#c9a373] mb-4">— Enquire</p>
            <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl md:text-5xl">Tell us about the site.</h2>
            <p className="mt-6 text-[#c9c9c9]">We schedule complimentary walk-throughs the first Friday of every month.</p>
          </div>
          <form className="space-y-4">
            <input placeholder="Name" className="w-full bg-transparent border-b border-[#f2ede0]/30 py-3 focus:border-[#c9a373] outline-none"/>
            <input placeholder="Email" className="w-full bg-transparent border-b border-[#f2ede0]/30 py-3 focus:border-[#c9a373] outline-none"/>
            <input placeholder="City / zip" className="w-full bg-transparent border-b border-[#f2ede0]/30 py-3 focus:border-[#c9a373] outline-none"/>
            <textarea rows={4} placeholder="Briefly describe the site" className="w-full bg-transparent border-b border-[#f2ede0]/30 py-3 focus:border-[#c9a373] outline-none"/>
            <button className="mt-4 bg-[#c9a373] text-[#2b3226] px-8 py-4 rounded-full font-medium">Request a visit</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#2b3226]/10">
        <div className="max-w-6xl mx-auto px-8 py-10 flex flex-wrap justify-between gap-4 text-sm text-[#5a6154]">
          <p>© GreenScape Design · License #C-27 987654</p>
          <p>hello@greenscape.co · (650) 555-0122</p>
        </div>
      </footer>
    </div>
  );
}
