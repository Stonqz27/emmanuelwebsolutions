import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/plumbing")({
  component: PlumbingDemo,
  head: () => ({
    meta: [
      { title: "ProFlow Plumbing — 24/7 Licensed Plumbers" },
      { name: "description", content: "Metro-area plumbing you can trust. 25+ years, 24/7 emergency response, upfront pricing." },
    ],
  }),
});

const services = [
  { n: "01", t: "Emergency Repairs", d: "Burst pipes, floods, overflows. Truck rolls in under 45 min.", p: "From $89" },
  { n: "02", t: "Drain Cleaning", d: "Video-inspected, hydro-jetted, warrantied for 12 months.", p: "From $129" },
  { n: "03", t: "Water Heaters", d: "Tank, tankless, hybrid — install, repair, and yearly service.", p: "From $249" },
  { n: "04", t: "Repipe & Sewer", d: "Trenchless sewer, PEX repipes, full-home diagnostics.", p: "Quoted" },
  { n: "05", t: "Bath & Kitchen", d: "Remodel-grade plumbing for fixtures, disposals, gas lines.", p: "Quoted" },
  { n: "06", t: "Preventive Care", d: "Annual inspection, leak detection, pressure balancing.", p: "$149/yr" },
];

function PlumbingDemo() {
  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-100 font-sans" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Utility bar */}
      <div className="bg-yellow-400 text-[#0b1220] text-xs font-mono uppercase tracking-widest">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between">
          <span>◆ License #PL-88821 · Bonded · Insured</span>
          <span className="hidden sm:inline">24 / 7 dispatch → (555) 234-5678</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#0b1220]/90 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-400 text-[#0b1220] grid place-items-center font-black text-lg">P</div>
            <div className="font-bold tracking-tight">PROFLOW <span className="text-yellow-400">/</span> PLUMBING</div>
          </div>
          <div className="hidden md:flex gap-10 text-sm text-slate-300">
            <a href="#services" className="hover:text-yellow-400">Services</a>
            <a href="#work" className="hover:text-yellow-400">Recent Work</a>
            <a href="#quote" className="hover:text-yellow-400">Get Quote</a>
          </div>
          <a href="tel:5552345678" className="hidden sm:inline-flex items-center gap-2 bg-yellow-400 text-[#0b1220] px-5 py-2.5 font-semibold hover:bg-yellow-300">
            Call now →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-400 mb-8">// est. 1999 · metro service area</p>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">
              Water goes<br/>
              <span className="text-yellow-400">where we say</span><br/>
              it goes.
            </h1>
            <p className="mt-8 text-lg text-slate-300 max-w-xl">
              Twenty-five years of pipes, pressure, and predictable pricing. If it's leaking, backing up, or making
              a sound it shouldn't — we're the call.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#quote" className="bg-yellow-400 text-[#0b1220] px-7 py-4 font-bold hover:bg-yellow-300">Book a visit</a>
              <a href="tel:5552345678" className="border border-white/20 px-7 py-4 font-semibold hover:border-yellow-400 hover:text-yellow-400">(555) 234-5678</a>
            </div>
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 gap-px bg-white/10 border border-white/10">
            {[["45m","Avg response"],["10k+","Jobs completed"],["25","Years running"],["4.9★","1,200 reviews"]].map(([n,l]) => (
              <div key={l} className="bg-[#0b1220] p-6">
                <p className="text-3xl font-black text-yellow-400">{n}</p>
                <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">{l}</p>
              </div>
            ))}
          </div>
        </div>
        {/* diagonal tape */}
        <div className="h-3 bg-[repeating-linear-gradient(45deg,#facc15_0_20px,#0b1220_20px_40px)]"/>
      </section>

      {/* Services */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-400">/ 01 — what we do</p>
            <h2 className="text-4xl md:text-5xl font-black mt-3">Every job, priced up front.</h2>
          </div>
          <p className="text-slate-400 max-w-sm">No hourly surprises. No "we'll see when we get there." A written quote before a wrench turns.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-white/10">
          {services.map((s) => (
            <div key={s.n} className="border-r border-b border-white/10 p-8 group hover:bg-yellow-400 hover:text-[#0b1220] transition">
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-xs text-slate-500 group-hover:text-[#0b1220]">{s.n}</span>
                <span className="font-mono text-xs text-yellow-400 group-hover:text-[#0b1220]">{s.p}</span>
              </div>
              <p className="text-2xl font-bold mb-3">{s.t}</p>
              <p className="text-slate-400 group-hover:text-[#0b1220]/80 text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency band */}
      <section className="bg-yellow-400 text-[#0b1220]">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] mb-2">◆ emergency line</p>
            <p className="text-3xl md:text-4xl font-black">Flooding? Call now. We answer at 3 AM.</p>
          </div>
          <a href="tel:5552345678" className="bg-[#0b1220] text-yellow-400 px-8 py-4 font-bold hover:bg-black">(555) 234-5678 →</a>
        </div>
      </section>

      {/* Recent work */}
      <section id="work" className="max-w-7xl mx-auto px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-400">/ 02 — recent tickets</p>
        <h2 className="text-4xl md:text-5xl font-black mt-3 mb-12">This week's log.</h2>
        <div className="divide-y divide-white/10 border-y border-white/10 font-mono text-sm">
          {[
            ["MON 06:12","Riverside","Burst main, closed valve, replaced 4ft copper","$412"],
            ["MON 14:30","Oak Park","Water heater swap, 50gal → tankless","$2,180"],
            ["TUE 09:45","Downtown","Hydro-jet 60ft sewer line, video verified","$489"],
            ["WED 22:11","Highlands","Emergency slab leak, isolated + repaired","$975"],
            ["THU 11:02","Metro N","Full bathroom repipe, PEX-A","$3,650"],
          ].map(([t,l,d,p]) => (
            <div key={t} className="grid grid-cols-12 gap-4 py-4 hover:bg-white/5 px-2">
              <span className="col-span-3 md:col-span-2 text-yellow-400">{t}</span>
              <span className="col-span-3 md:col-span-2 text-slate-300">{l}</span>
              <span className="col-span-4 md:col-span-6 text-slate-400">{d}</span>
              <span className="col-span-2 text-right">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="border-t border-white/10 bg-[#070c17]">
        <div className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-400">/ 03 — free estimate</p>
            <h2 className="text-4xl md:text-5xl font-black mt-3">Tell us what's broken.</h2>
            <p className="mt-6 text-slate-400">A dispatcher will call within 20 minutes during business hours, faster after hours if it's an emergency.</p>
            <div className="mt-10 space-y-3 font-mono text-sm text-slate-400">
              <p>→ No trip fee on quoted jobs</p>
              <p>→ Written estimate before work starts</p>
              <p>→ 12-month workmanship warranty</p>
            </div>
          </div>
          <form className="space-y-4">
            <input placeholder="Name" className="w-full bg-transparent border border-white/20 px-4 py-4 focus:border-yellow-400 outline-none"/>
            <input placeholder="Phone" className="w-full bg-transparent border border-white/20 px-4 py-4 focus:border-yellow-400 outline-none"/>
            <input placeholder="Zip code" className="w-full bg-transparent border border-white/20 px-4 py-4 focus:border-yellow-400 outline-none"/>
            <textarea rows={5} placeholder="What's going on?" className="w-full bg-transparent border border-white/20 px-4 py-4 focus:border-yellow-400 outline-none"/>
            <button className="w-full bg-yellow-400 text-[#0b1220] py-4 font-bold hover:bg-yellow-300">Request estimate →</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap justify-between gap-4 text-sm text-slate-400 font-mono">
          <p>© ProFlow Plumbing · License #PL-88821</p>
          <p>(555) 234-5678 · dispatch@proflow.co</p>
        </div>
      </footer>
    </div>
  );
}
