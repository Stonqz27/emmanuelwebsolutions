import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/photography")({
  component: PhotographyDemo,
  head: () => ({
    meta: [
      { title: "LUMINOUS — Fine Art & Editorial Photography" },
      { name: "description", content: "Editorial, wedding, and commercial photography. Award-winning studio." },
    ],
  }),
});

const shots = [
  { t: "Morrison Wedding", c: "Ojai · 2024", g: "from-[#4a3a2a] to-black", span: "md:col-span-2 md:row-span-2" },
  { t: "Ito Editorial", c: "Vogue Japan", g: "from-[#8a6d5a] to-[#1a1310]" },
  { t: "Vale Campaign", c: "Aesop", g: "from-[#3a4a4a] to-black" },
  { t: "Bianca Studio", c: "Portrait Series", g: "from-[#6d4a3a] to-black" },
  { t: "Coastline No. 7", c: "Personal work", g: "from-[#4a5a6d] to-black", span: "md:col-span-2" },
  { t: "Studio Nakamura", c: "Interiors", g: "from-[#5a4a3a] to-black" },
];

function PhotographyDemo() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="tracking-[0.5em] text-sm font-light">LUMINOUS</div>
          <div className="hidden md:flex gap-10 text-xs uppercase tracking-[0.35em] font-light">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#book">Contact</a>
          </div>
          <a href="#book" className="text-xs uppercase tracking-[0.35em]">Book →</a>
        </div>
      </nav>

      {/* Hero — full bleed image */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a1a10] via-[#0a0605] to-black"/>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,#c9a373_0%,transparent_60%)]"/>
        <div className="relative max-w-7xl mx-auto px-8 pb-20 w-full">
          <p className="text-xs uppercase tracking-[0.5em] text-white/50 mb-8">— Est. 2011 · Los Angeles</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-[14vw] md:text-[10rem] lg:text-[13rem] leading-[0.85] font-light">
            LIGHT<br/>
            <em className="italic text-white/60">is the</em><br/>
            SUBJECT.
          </h1>
          <div className="mt-16 flex flex-wrap justify-between items-end gap-6 border-t border-white/20 pt-8">
            <p className="text-white/60 max-w-md">
              Editorial, wedding, and commercial photography by <em className="italic text-white">Nadia Reyes</em>.
              A quiet approach, twelve years in.
            </p>
            <div className="flex gap-10 text-xs uppercase tracking-[0.35em] font-light">
              <div>◇ FEATURED IN VOGUE</div>
              <div>◇ CANNES SHORTLIST 2023</div>
            </div>
          </div>
        </div>
      </section>

      {/* Work grid */}
      <section id="work" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-4">— 001 / Selected work</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-5xl md:text-6xl font-light italic">Recent frames.</h2>
            </div>
            <a href="#" className="text-xs uppercase tracking-[0.4em] border-b border-white/40 pb-1">View full archive</a>
          </div>
          <div className="grid md:grid-cols-4 gap-3 auto-rows-[220px]">
            {shots.map((s) => (
              <a href="#" key={s.t} className={`group relative bg-gradient-to-br ${s.g} overflow-hidden ${s.span ?? ""}`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/60 transition"/>
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition">
                  <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl italic">{s.t}</p>
                  <p className="text-xs uppercase tracking-widest text-white/70 mt-1">{s.c}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-white/10 py-32 px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="aspect-[3/4] bg-gradient-to-br from-[#6d4a3a] to-black"/>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-4">— 002 / About</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-5xl md:text-6xl font-light">
              A photograph is a decision <em className="italic">about what to leave out.</em>
            </h2>
            <p className="mt-8 text-white/60 leading-relaxed">
              Nadia trained under Paolo Roversi in Paris and has been photographing full-time since 2011. Her work has
              appeared in Vogue Japan, The New York Times Magazine, and campaigns for Aesop, Rimowa, and Loewe.
            </p>
            <p className="mt-4 text-white/60 leading-relaxed">
              The studio takes on a limited slate of weddings and editorial commissions each year, from Los Angeles
              and abroad.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/10 py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-4">— 003 / Services</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-5xl md:text-6xl font-light italic mb-16">The three tables.</h2>
          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { t: "Weddings", p: "From $8,400", d: "Full-day coverage, editorial-quality delivery, one photographer, one assistant." },
              { t: "Editorial", p: "By commission", d: "Portraits, features, campaigns for magazines and cultural brands." },
              { t: "Commercial", p: "Day rate", d: "Product, hospitality, and lifestyle campaigns. Studio & location." },
            ].map((s) => (
              <div key={s.t} className="bg-black p-10">
                <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl italic mb-2">{s.t}</p>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">{s.p}</p>
                <p className="mt-6 text-white/60 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book */}
      <section id="book" className="border-t border-white/10 py-32 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-white/40 mb-4">— 004 / Enquire</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-5xl md:text-7xl font-light">Say <em className="italic">hello</em>.</h2>
          <p className="mt-6 text-white/60">A short note goes a long way. Responses within 48 hours.</p>
          <form className="mt-16 grid gap-6 text-left">
            <input placeholder="Your name" className="bg-transparent border-b border-white/20 py-3 focus:border-white outline-none"/>
            <input placeholder="Email" className="bg-transparent border-b border-white/20 py-3 focus:border-white outline-none"/>
            <textarea rows={4} placeholder="Tell us about your project" className="bg-transparent border-b border-white/20 py-3 focus:border-white outline-none"/>
            <button className="mt-8 self-start text-xs uppercase tracking-[0.5em] border-b border-white pb-2 hover:text-white/60">Send enquiry →</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-4 text-xs uppercase tracking-[0.4em] text-white/40">
          <p>© LUMINOUS STUDIO · MMXXV</p>
          <p>Los Angeles · New York · Kyoto</p>
        </div>
      </footer>
    </div>
  );
}
