import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/dental")({
  component: DentalDemo,
  head: () => ({
    meta: [
      { title: "Bright Smile Dental — Calm, Modern Family Dentistry" },
      { name: "description", content: "Gentle family dentistry in a spa-quiet studio. Same-week appointments, transparent pricing, zero pressure." },
    ],
  }),
});

const services = [
  { t: "General", items: ["Cleanings & exams", "Fillings", "Sealants", "Night guards"] },
  { t: "Cosmetic", items: ["Whitening", "Porcelain veneers", "Bonding", "Smile design"] },
  { t: "Orthodontics", items: ["Clear aligners", "Retainers", "Space maintainers"] },
  { t: "Restorative", items: ["Crowns", "Bridges", "Implants", "Root canals"] },
];

function DentalDemo() {
  return (
    <div className="min-h-screen bg-[#f5f1ea] text-[#1f2a24]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#f5f1ea]/85 backdrop-blur">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            <span className="text-2xl font-medium tracking-tight">Bright Smile</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#7a9d84]"/>
          </div>
          <div className="hidden md:flex gap-10 text-sm text-[#4c5b53]">
            <a href="#services" className="hover:text-[#1f2a24]">Care</a>
            <a href="#team" className="hover:text-[#1f2a24]">Dentists</a>
            <a href="#studio" className="hover:text-[#1f2a24]">Studio</a>
            <a href="#book" className="hover:text-[#1f2a24]">Visit</a>
          </div>
          <a href="#book" className="text-sm border border-[#1f2a24] rounded-full px-5 py-2 hover:bg-[#1f2a24] hover:text-[#f5f1ea] transition">
            Book a visit
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-16 pb-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.35em] text-[#7a9d84] mb-8">A quieter kind of dentist</p>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif" }} className="text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-light tracking-tight">
              Dentistry that <em className="italic text-[#7a9d84]">actually</em> feels calm.
            </h1>
            <p className="mt-8 text-lg text-[#4c5b53] max-w-xl leading-relaxed">
              A small studio in the neighborhood — natural light, warm blankets, honest conversations,
              and modern tools that make appointments shorter and gentler.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#book" className="bg-[#1f2a24] text-[#f5f1ea] px-8 py-4 rounded-full hover:bg-black">Reserve a chair</a>
              <a href="#services" className="px-8 py-4 rounded-full border border-[#1f2a24]/20 hover:border-[#1f2a24]">See our care →</a>
            </div>
            <div className="mt-14 flex gap-10 text-sm text-[#4c5b53]">
              <div><p className="text-2xl font-medium text-[#1f2a24]" style={{ fontFamily: "'Fraunces', serif" }}>4.9★</p><p>on 800+ reviews</p></div>
              <div><p className="text-2xl font-medium text-[#1f2a24]" style={{ fontFamily: "'Fraunces', serif" }}>Same-week</p><p>appointments</p></div>
              <div><p className="text-2xl font-medium text-[#1f2a24]" style={{ fontFamily: "'Fraunces', serif" }}>18 yrs</p><p>in the neighborhood</p></div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[#c9d9cf] via-[#e7ded1] to-[#f0e6d6] relative overflow-hidden">
              <div className="absolute inset-8 rounded-2xl border border-white/40"/>
              <div className="absolute bottom-8 left-8 right-8 bg-[#f5f1ea]/90 backdrop-blur rounded-2xl p-6">
                <p className="text-xs uppercase tracking-widest text-[#7a9d84]">Now booking</p>
                <p className="mt-1" style={{ fontFamily: "'Fraunces', serif" }}>New-patient exam + cleaning · <span className="text-[#7a9d84]">$149</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-[#eee7db] py-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#7a9d84]">Care menu</p>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl md:text-5xl mt-3 font-light">Full-family care, without the upsell.</h2>
            </div>
            <p className="max-w-sm text-[#4c5b53]">If you don't need it, we won't recommend it. Everything is quoted before you sit in the chair.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.t} className="bg-[#f5f1ea] rounded-3xl p-10">
                <p style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl font-light mb-6 text-[#7a9d84]">— {s.t}</p>
                <ul className="space-y-3 text-[#1f2a24]">
                  {s.items.map((i) => (
                    <li key={i} className="flex justify-between border-b border-[#1f2a24]/10 pb-3">
                      <span>{i}</span>
                      <span className="text-[#4c5b53] text-sm">included</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio quote */}
      <section id="studio" className="max-w-4xl mx-auto px-8 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[#7a9d84] mb-8">The studio</p>
        <p style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-5xl font-light leading-tight">
          "We designed a dental practice we'd want to visit — <em className="italic text-[#7a9d84]">less clinic,
          more sunroom</em>. Weighted blankets, wireless headphones, and never more than one appointment at a time."
        </p>
        <p className="mt-10 text-sm uppercase tracking-widest text-[#4c5b53]">— Dr. Elena Rowe, founder</p>
      </section>

      {/* Team */}
      <section id="team" className="max-w-6xl mx-auto px-8 pb-24">
        <p className="text-xs uppercase tracking-[0.35em] text-[#7a9d84]">The team</p>
        <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-4xl md:text-5xl mt-3 font-light mb-12">People, not badges.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "Dr. Elena Rowe", r: "General & cosmetic", b: "UCSF · 15 years", c: "from-[#c9d9cf] to-[#7a9d84]" },
            { n: "Dr. Marcus Ito", r: "Pediatric care", b: "NYU · 10 years", c: "from-[#e7ded1] to-[#c8b898]" },
            { n: "Dr. Priya Shah", r: "Orthodontics", b: "Columbia · 12 years", c: "from-[#f0d9c9] to-[#c9a389]" },
          ].map((p) => (
            <div key={p.n}>
              <div className={`aspect-[4/5] rounded-3xl bg-gradient-to-br ${p.c} mb-5`}/>
              <p style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl">{p.n}</p>
              <p className="text-[#7a9d84]">{p.r}</p>
              <p className="text-sm text-[#4c5b53] mt-1">{p.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Book */}
      <section id="book" className="bg-[#1f2a24] text-[#f5f1ea] py-24">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#7a9d84] mb-8">Reserve</p>
          <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl md:text-6xl font-light">Come see the space.</h2>
          <p className="mt-6 text-[#c9d9cf]">Complimentary consult for new patients. Insurance welcome — we'll verify before your visit.</p>
          <form className="mt-12 grid gap-4 text-left">
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Your name" className="bg-transparent border-b border-white/30 py-3 focus:border-[#7a9d84] outline-none"/>
              <input placeholder="Email" className="bg-transparent border-b border-white/30 py-3 focus:border-[#7a9d84] outline-none"/>
            </div>
            <input placeholder="Reason for visit" className="bg-transparent border-b border-white/30 py-3 focus:border-[#7a9d84] outline-none"/>
            <button className="mt-6 bg-[#f5f1ea] text-[#1f2a24] rounded-full py-4 font-medium hover:bg-white justify-self-center px-12">Request an appointment</button>
          </form>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-8 py-10 flex flex-wrap gap-4 justify-between text-sm text-[#4c5b53]">
        <p>© Bright Smile Dental Studio</p>
        <p>412 Linden Lane · (415) 555-0182</p>
      </footer>
    </div>
  );
}
