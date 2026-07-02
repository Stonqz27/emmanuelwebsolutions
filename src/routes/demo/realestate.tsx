import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/realestate")({
  component: RealEstateDemo,
  head: () => ({
    meta: [
      { title: "Skyline Properties — Homes with a Point of View" },
      { name: "description", content: "A boutique brokerage for architectural, historic, and modernist homes." },
    ],
  }),
});

const listings = [
  { p: "$4,250,000", a: "Modernist retreat", loc: "Hillside Terrace, Los Feliz", meta: "4 bd · 4 ba · 3,890 sqft", c: "from-[#c9a389] to-[#5a3f2e]", tag: "New" },
  { p: "$1,850,000", a: "Restored craftsman", loc: "Elm Street, Silver Lake", meta: "3 bd · 2 ba · 2,140 sqft", c: "from-[#e8d0b8] to-[#8a6d55]", tag: "Open Sun" },
  { p: "$6,900,000", a: "Ocean-front estate", loc: "Coastline Dr, Malibu", meta: "5 bd · 6 ba · 5,600 sqft", c: "from-[#d8c4a8] to-[#3f5a52]" },
  { p: "$980,000", a: "Historic loft", loc: "Warehouse Ln, Arts District", meta: "2 bd · 2 ba · 1,600 sqft", c: "from-[#c9b89a] to-[#5a4a3a]" },
];

function RealEstateDemo() {
  return (
    <div className="min-h-screen bg-[#faf6ef] text-[#2b241d]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#faf6ef]/90 backdrop-blur border-b border-[#2b241d]/10">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-2xl tracking-wide">
            Skyline <em className="italic text-[#a35435]">Properties</em>
          </div>
          <div className="hidden md:flex gap-10 text-sm text-[#5a4a3a]">
            <a href="#listings" className="hover:text-[#a35435]">Listings</a>
            <a href="#agents" className="hover:text-[#a35435]">Agents</a>
            <a href="#story" className="hover:text-[#a35435]">Story</a>
            <a href="#contact" className="hover:text-[#a35435]">Contact</a>
          </div>
          <a href="#contact" className="text-xs uppercase tracking-[0.3em] border border-[#2b241d] px-5 py-2.5 hover:bg-[#2b241d] hover:text-[#faf6ef] transition">Enquire</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-16 pb-24">
        <p className="text-xs uppercase tracking-[0.4em] text-[#a35435] mb-8">— A boutique brokerage, since 2004</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] font-light tracking-tight">
          Homes with<br/>
          <em className="italic text-[#a35435]">a point of</em> view.
        </h1>
        <div className="mt-16 grid lg:grid-cols-12 gap-10">
          <p className="lg:col-span-5 text-lg text-[#5a4a3a] leading-relaxed">
            We represent architectural, historic, and modernist properties across the Southland — and the
            discerning buyers and sellers who care about them.
          </p>
          <div className="lg:col-span-7 grid grid-cols-3 gap-px bg-[#2b241d]/10 border border-[#2b241d]/10">
            {[["$1.4B","Sold"],["220+","Homes closed"],["18","Days on market"]].map(([n,l]) => (
              <div key={l} className="bg-[#faf6ef] p-6">
                <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl">{n}</p>
                <p className="text-xs uppercase tracking-widest text-[#5a4a3a] mt-2">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listing — hero */}
      <section id="listings" className="max-w-7xl mx-auto px-8 pb-20">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#a35435]">— Currently offered</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl mt-3">Featured listings.</h2>
          </div>
          <a href="#" className="text-sm underline underline-offset-4 hover:text-[#a35435]">View full portfolio →</a>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {listings.map((l, i) => (
            <a href="#" key={l.a} className={`group ${i === 0 ? "md:col-span-2" : ""}`}>
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${l.c} overflow-hidden`}>
                {l.tag && <span className="absolute top-4 left-4 bg-[#faf6ef] text-[#2b241d] text-xs uppercase tracking-widest px-3 py-1.5">{l.tag}</span>}
                <div className="absolute inset-6 border border-white/30"/>
              </div>
              <div className="mt-5 flex justify-between items-baseline flex-wrap gap-2">
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl group-hover:text-[#a35435] transition">{l.a}</p>
                  <p className="text-[#5a4a3a] italic">{l.loc}</p>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl text-[#a35435]">{l.p}</p>
              </div>
              <p className="text-sm text-[#5a4a3a] mt-2">{l.meta}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Story pull */}
      <section id="story" className="bg-[#2b241d] text-[#faf6ef] py-32">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl md:text-5xl italic leading-tight text-[#e8d0b8]">
            "The best homes have a spine — a reason they were built. Our job is to introduce them to the people
            who'll listen."
          </p>
          <p className="mt-10 text-xs uppercase tracking-[0.4em] text-[#a35435]">— Helena Reyes, principal broker</p>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="max-w-7xl mx-auto px-8 py-24">
        <p className="text-xs uppercase tracking-[0.4em] text-[#a35435]">— Advisors</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl mt-3 mb-14">A small bench of specialists.</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { n: "Helena Reyes", r: "Modernist & historic", s: "$420M sold" },
            { n: "Marcus Bell", r: "Coastal & estate", s: "$310M sold" },
            { n: "Priya Kapoor", r: "Investment & multi-fam", s: "$260M sold" },
            { n: "Ana Duarte", r: "First-time buyers", s: "120+ closes" },
          ].map((a) => (
            <div key={a.n}>
              <div className="aspect-[4/5] bg-gradient-to-br from-[#e8d0b8] to-[#a35435] mb-4"/>
              <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl">{a.n}</p>
              <p className="text-[#a35435] text-sm italic">{a.r}</p>
              <p className="text-xs uppercase tracking-widest text-[#5a4a3a] mt-2">{a.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#f0e8d8] py-24">
        <div className="max-w-3xl mx-auto px-8 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#a35435] mb-4">— Enquire</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl">Buying, selling, or curious?</h2>
            <p className="mt-6 text-[#5a4a3a]">Introductory calls are complimentary. We'll match you with the right advisor.</p>
          </div>
          <form className="space-y-4">
            <input placeholder="Name" className="w-full bg-transparent border-b border-[#2b241d]/30 py-3 focus:border-[#a35435] outline-none"/>
            <input placeholder="Email" className="w-full bg-transparent border-b border-[#2b241d]/30 py-3 focus:border-[#a35435] outline-none"/>
            <select className="w-full bg-transparent border-b border-[#2b241d]/30 py-3 focus:border-[#a35435] outline-none">
              <option>I'm interested in...</option>
              <option>Buying</option>
              <option>Selling</option>
              <option>Both</option>
            </select>
            <button className="mt-4 bg-[#2b241d] text-[#faf6ef] px-8 py-4 uppercase text-xs tracking-[0.3em]">Send enquiry</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#2b241d]/10">
        <div className="max-w-7xl mx-auto px-8 py-10 flex flex-wrap justify-between gap-4 text-sm text-[#5a4a3a]">
          <p>© Skyline Properties · DRE #01234567</p>
          <p>240 Sunset Blvd · (323) 555-0166</p>
        </div>
      </footer>
    </div>
  );
}
