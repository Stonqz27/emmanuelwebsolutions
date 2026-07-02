import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/autorepair")({
  component: AutoRepairDemo,
  head: () => ({
    meta: [
      { title: "FASTTRACK AUTO — Independent Repair Shop" },
      { name: "description", content: "ASE-certified auto repair and diagnostics. Straight talk, fair prices, all makes and models." },
    ],
  }),
});

const services = [
  { code: "01", t: "Oil & Fluids", d: "Full-synthetic, semi, conventional. Fluids topped and inspected.", p: "$59" },
  { code: "02", t: "Brakes", d: "Pads, rotors, calipers, lines. OEM parts, 2-year warranty.", p: "$189+" },
  { code: "03", t: "Diagnostics", d: "OBD-II scan, live-data pull, written diagnosis.", p: "$85" },
  { code: "04", t: "Battery & Charge", d: "Alternator, starter, battery load-test and replacement.", p: "$149+" },
  { code: "05", t: "Suspension", d: "Struts, shocks, control arms, alignment.", p: "By quote" },
  { code: "06", t: "AC & Heating", d: "Recharge, leak check, compressor and evap service.", p: "$129+" },
  { code: "07", t: "Transmission", d: "Fluid service, pan drop, filter and gasket replacement.", p: "$199+" },
  { code: "08", t: "Electrical", d: "Wiring, sensors, module programming, drivability.", p: "By quote" },
];

function AutoRepairDemo() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Utility */}
      <div className="bg-orange-500 text-black text-xs font-mono uppercase tracking-widest">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between">
          <span>◆ ASE Certified · NAPA AutoCare · BBB A+</span>
          <span className="hidden sm:inline">MON–SAT · 7A–6P</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#0e0e0e]/90 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-orange-500 grid place-items-center font-black text-orange-500">F</div>
            <div>
              <div className="font-black text-xl tracking-tight">FASTTRACK <span className="text-orange-500">/</span> AUTO</div>
              <div className="text-[10px] uppercase tracking-widest text-white/50">Independent Shop · Est. 2003</div>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-white/70">
            <a href="#services" className="hover:text-orange-500">Services</a>
            <a href="#specials" className="hover:text-orange-500">Specials</a>
            <a href="#appt" className="hover:text-orange-500">Book</a>
          </div>
          <a href="#appt" className="bg-orange-500 text-black px-5 py-2.5 font-black text-sm hover:bg-orange-400">SCHEDULE →</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(-45deg,#f97316_0_2px,transparent_2px_20px)]"/>
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-orange-500 mb-8">// bay 03 · lift ready</p>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black leading-[0.85] tracking-tighter">
              STRAIGHT TALK.<br/>
              <span className="text-orange-500">HONEST</span> WORK.
            </h1>
            <p className="mt-10 text-lg text-white/70 max-w-lg leading-relaxed">
              An independent shop for people who want their car fixed right — the first time — without
              being oversold. Written estimate before we turn a wrench.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#appt" className="bg-orange-500 text-black px-8 py-4 font-black hover:bg-orange-400">BOOK A BAY</a>
              <a href="tel:5551234567" className="border border-white/30 px-8 py-4 font-bold hover:border-orange-500 hover:text-orange-500">(555) 123-4567</a>
            </div>
          </div>
          <div className="lg:col-span-4 border border-white/10">
            <div className="grid grid-cols-2 divide-x divide-y divide-white/10">
              {[["18k+","cars serviced"],["4.9★","1,400+ reviews"],["24mo","parts warranty"],["45min","avg oil change"]].map(([n,l]) => (
                <div key={l} className="p-6">
                  <p className="text-3xl font-black text-orange-500">{n}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/60 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* hazard stripe */}
        <div className="h-3 bg-[repeating-linear-gradient(45deg,#f97316_0_24px,#0e0e0e_24px_48px)]"/>
      </section>

      {/* Services */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-orange-500">§ 01 · SERVICE MENU</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mt-4">EVERY SERVICE. PRICED UP FRONT.</h2>
          </div>
          <p className="max-w-sm text-white/60">All makes, all models — foreign and domestic. Fleet accounts welcome.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 border-l border-t border-white/10">
          {services.map((s) => (
            <div key={s.code} className="border-r border-b border-white/10 p-8 group hover:bg-orange-500 hover:text-black transition">
              <div className="flex justify-between mb-6">
                <span className="font-mono text-xs text-white/40 group-hover:text-black/60">{s.code}</span>
                <span className="font-mono text-xs text-orange-500 group-hover:text-black">{s.p}</span>
              </div>
              <p className="text-2xl font-black mb-3">{s.t}</p>
              <p className="text-sm text-white/60 group-hover:text-black/80 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specials strip */}
      <section id="specials" className="bg-orange-500 text-black">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <p className="font-mono text-xs uppercase tracking-widest mb-2">◆ this month</p>
            <p className="text-4xl font-black tracking-tighter">SPRING TUNE-UP SPECIALS.</p>
          </div>
          {[
            { t: "Synthetic oil change", p: "$49", was: "$79" },
            { t: "Brake inspection + rotation", p: "$29", was: "$59" },
          ].map((s) => (
            <div key={s.t} className="bg-black text-orange-500 p-6 flex items-baseline justify-between">
              <div>
                <p className="text-lg font-bold text-white">{s.t}</p>
                <p className="text-xs font-mono uppercase text-white/50 line-through mt-1">was {s.was}</p>
              </div>
              <p className="text-5xl font-black">{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-orange-500">§ 02 · THE SHOP</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mt-4">RUN BY MECHANICS. NOT SALESPEOPLE.</h2>
          <p className="mt-8 text-white/60 leading-relaxed max-w-lg">
            Six ASE-certified techs, twenty years average bay experience. We photograph every part we replace and
            hand you the old one on request. No commission-based upsells, ever.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            "PHOTOS OF EVERY REPAIR",
            "OLD PARTS RETURNED",
            "24-MONTH WARRANTY",
            "NO COMMISSION SALES",
            "SHUTTLE + LOANER",
            "WRITTEN ESTIMATES",
          ].map((f) => (
            <div key={f} className="border border-white/10 p-6 font-mono text-xs uppercase tracking-widest hover:border-orange-500 hover:text-orange-500">
              ✓ {f}
            </div>
          ))}
        </div>
      </section>

      {/* Appointment */}
      <section id="appt" className="border-t border-white/10 bg-[#0a0a0a] py-24">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-orange-500">§ 03 · BOOK A BAY</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-4">DROP IT OFF TOMORROW.</h2>
            <p className="mt-6 text-white/60">Book online. Confirmation and text updates within the hour.</p>
            <div className="mt-10 space-y-3 font-mono text-xs uppercase tracking-widest text-white/50">
              <p>→ 1420 industrial pkwy</p>
              <p>→ mon–sat · 7a to 6p</p>
              <p>→ shuttle within 10 miles</p>
            </div>
          </div>
          <form className="space-y-4">
            <input placeholder="Your name" className="w-full bg-transparent border border-white/20 px-4 py-4 focus:border-orange-500 outline-none"/>
            <input placeholder="Phone" className="w-full bg-transparent border border-white/20 px-4 py-4 focus:border-orange-500 outline-none"/>
            <input placeholder="Vehicle (year / make / model)" className="w-full bg-transparent border border-white/20 px-4 py-4 focus:border-orange-500 outline-none"/>
            <textarea rows={4} placeholder="What's going on?" className="w-full bg-transparent border border-white/20 px-4 py-4 focus:border-orange-500 outline-none"/>
            <button className="w-full bg-orange-500 text-black py-4 font-black hover:bg-orange-400">SCHEDULE APPOINTMENT →</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-widest text-white/40">
          <p>© FASTTRACK AUTO · SHOP #4471</p>
          <p>1420 INDUSTRIAL PKWY · (555) 123-4567</p>
        </div>
      </footer>
    </div>
  );
}
