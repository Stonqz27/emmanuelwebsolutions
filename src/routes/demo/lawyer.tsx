import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/lawyer")({
  component: LawyerDemo,
  head: () => ({
    meta: [
      { title: "Morrison & Associates — Trial Attorneys" },
      { name: "description", content: "Thirty years of courtroom experience in personal injury, family, and criminal defense." },
    ],
  }),
});

function LawyerDemo() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#0b1a2e]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Utility */}
      <div className="bg-[#0b1a2e] text-[#c9a961] text-xs">
        <div className="max-w-6xl mx-auto px-8 h-9 flex items-center justify-between tracking-widest uppercase">
          <span>Bar Certified · Est. 1994</span>
          <span className="hidden sm:inline">Consultations: (415) 555-0199</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="border-b border-[#0b1a2e]/10 bg-[#f4f1ea]">
        <div className="max-w-6xl mx-auto px-8 h-24 flex items-center justify-between">
          <div>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-2xl leading-none">Morrison <span className="text-[#c9a961]">&</span> Associates</p>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#0b1a2e]/60 mt-1">Attorneys at Law</p>
          </div>
          <div className="hidden md:flex gap-10 text-sm uppercase tracking-widest">
            <a href="#practice" className="hover:text-[#c9a961]">Practice</a>
            <a href="#team" className="hover:text-[#c9a961]">Attorneys</a>
            <a href="#results" className="hover:text-[#c9a961]">Results</a>
            <a href="#contact" className="hover:text-[#c9a961]">Contact</a>
          </div>
          <a href="#contact" className="border border-[#0b1a2e] px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-[#0b1a2e] hover:text-[#f4f1ea] transition">Free consultation</a>
        </div>
      </nav>

      {/* Hero — split editorial */}
      <section className="grid lg:grid-cols-2 min-h-[80vh]">
        <div className="bg-[#0b1a2e] text-[#f4f1ea] p-12 lg:p-20 flex flex-col justify-between">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a961]">— Case No. I</p>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-7xl leading-[1.02] font-normal">
              When the outcome
              <span className="block italic text-[#c9a961]">actually matters,</span>
              call a trial lawyer.
            </h1>
            <p className="mt-10 text-[#c9c9c9] max-w-md leading-relaxed">
              Thirty years, more than 400 verdicts, and a practice built on the cases other firms wouldn't
              take to a jury.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="bg-[#c9a961] text-[#0b1a2e] px-8 py-4 font-medium">Schedule a call</a>
              <a href="#results" className="border border-[#c9a961] text-[#c9a961] px-8 py-4 hover:bg-[#c9a961] hover:text-[#0b1a2e]">Case results</a>
            </div>
          </div>
          <p className="text-xs text-[#c9c9c9]/60 italic">"Prepared like they'd already won." — American Trial Journal</p>
        </div>
        <div className="bg-[#eee7d5] p-12 lg:p-20 flex flex-col justify-between">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#0b1a2e]/60">— At a glance</p>
          <div className="space-y-10">
            {[
              ["$180M+", "Recovered for clients"],
              ["30 yrs", "Continuous practice"],
              ["94%", "Success rate at trial"],
              ["24 hr", "Response to new matters"],
            ].map(([n,l]) => (
              <div key={l} className="border-b border-[#0b1a2e]/15 pb-6 flex items-baseline justify-between">
                <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl">{n}</p>
                <p className="uppercase text-xs tracking-widest text-[#0b1a2e]/60">{l}</p>
              </div>
            ))}
          </div>
          <div/>
        </div>
      </section>

      {/* Practice */}
      <section id="practice" className="max-w-6xl mx-auto px-8 py-24">
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a961] mb-4">— Practice areas</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl">A focused firm, <em className="italic">not a factory</em>.</h2>
          </div>
          <p className="md:col-span-7 md:col-start-6 text-[#4a5568] mt-4">
            We take a limited number of cases each year so every client gets a partner in the room. No junior handoffs,
            no auto-responder emails.
          </p>
        </div>
        <div className="grid md:grid-cols-3 border-t border-l border-[#0b1a2e]/15">
          {[
            { n: "I", t: "Personal Injury", d: "Auto, premises liability, medical malpractice, wrongful death." },
            { n: "II", t: "Family Law", d: "Divorce, custody, prenups, high-asset separation." },
            { n: "III", t: "Criminal Defense", d: "State and federal defense, DUI, white-collar, appeals." },
          ].map((a) => (
            <div key={a.n} className="border-r border-b border-[#0b1a2e]/15 p-10">
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-[#c9a961] text-3xl italic mb-6">{a.n}.</p>
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl mb-3">{a.t}</p>
              <p className="text-[#4a5568] text-sm leading-relaxed">{a.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section id="results" className="bg-[#0b1a2e] text-[#f4f1ea] py-24">
        <div className="max-w-6xl mx-auto px-8">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a961] mb-4">— Selected results</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl mb-14">Verdicts & settlements.</h2>
          <div className="divide-y divide-[#c9a961]/20 border-y border-[#c9a961]/20">
            {[
              ["$14.2M", "Medical malpractice — birth injury", "Superior Court, 2024"],
              ["$8.7M", "Trucking collision — wrongful death", "Federal District, 2023"],
              ["$5.1M", "Product liability — verdict", "Superior Court, 2023"],
              ["Dismissed", "Federal white-collar defense", "N.D. Cal, 2022"],
              ["$3.4M", "Premises liability — settlement", "Superior Court, 2022"],
            ].map(([r,c,v]) => (
              <div key={c} className="grid md:grid-cols-12 gap-4 py-6 items-baseline">
                <p style={{ fontFamily: "'Playfair Display', serif" }} className="md:col-span-3 text-3xl text-[#c9a961]">{r}</p>
                <p className="md:col-span-6">{c}</p>
                <p className="md:col-span-3 text-sm uppercase tracking-widest text-[#c9c9c9]/60 md:text-right">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="max-w-6xl mx-auto px-8 py-24">
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a961] mb-4">— The bench</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl mb-14">Attorneys.</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { n: "James Morrison", r: "Managing Partner", b: "Personal Injury · 30 yrs" },
            { n: "Elena Vega", r: "Partner", b: "Family Law · 18 yrs" },
            { n: "David Kim", r: "Partner", b: "Criminal Defense · 22 yrs" },
          ].map((p) => (
            <div key={p.n}>
              <div className="aspect-[3/4] bg-[#eee7d5] mb-6 relative">
                <div className="absolute inset-4 border border-[#0b1a2e]/20"/>
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl">{p.n}</p>
              <p className="text-[#c9a961] uppercase text-xs tracking-widest mt-2">{p.r}</p>
              <p className="text-[#4a5568] text-sm mt-2">{p.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#eee7d5] py-24">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a961] mb-4">— Consultation</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl">Tell us about your case.</h2>
          <p className="mt-6 text-[#4a5568]">Confidential. No obligation. A partner reviews every intake personally.</p>
          <form className="mt-12 grid gap-4 text-left">
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Name" className="bg-transparent border-b border-[#0b1a2e]/30 py-3 focus:border-[#c9a961] outline-none"/>
              <input placeholder="Phone" className="bg-transparent border-b border-[#0b1a2e]/30 py-3 focus:border-[#c9a961] outline-none"/>
            </div>
            <input placeholder="Email" className="bg-transparent border-b border-[#0b1a2e]/30 py-3 focus:border-[#c9a961] outline-none"/>
            <textarea rows={4} placeholder="Brief description of your matter" className="bg-transparent border-b border-[#0b1a2e]/30 py-3 focus:border-[#c9a961] outline-none"/>
            <button className="mt-6 bg-[#0b1a2e] text-[#c9a961] py-4 uppercase text-xs tracking-[0.4em] hover:bg-black">Request consultation</button>
          </form>
        </div>
      </section>

      <footer className="bg-[#0b1a2e] text-[#c9c9c9] py-10">
        <div className="max-w-6xl mx-auto px-8 flex flex-wrap justify-between gap-4 text-xs uppercase tracking-widest">
          <p>© Morrison & Associates · Bar #48291</p>
          <p>210 Market St, Suite 1400 · (415) 555-0199</p>
        </div>
      </footer>
    </div>
  );
}
