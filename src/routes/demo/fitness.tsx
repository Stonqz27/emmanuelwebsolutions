import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/fitness")({
  component: FitnessDemo,
  head: () => ({
    meta: [
      { title: "PEAK — Strength & Conditioning Gym" },
      { name: "description", content: "Barbell club and conditioning gym. Coached classes, open gym, and personal programming." },
    ],
  }),
});

const classes = [
  { code: "S01", name: "STRENGTH", desc: "Percentage-based squat / bench / dead", time: "06 · 12 · 17" },
  { code: "M02", name: "METCON", desc: "Mixed-modal conditioning, 45 min", time: "05:30 · 06:30 · 18" },
  { code: "C03", name: "CONDITIONING", desc: "Zone-2 rowing, ski, bike intervals", time: "07 · 17:30" },
  { code: "O04", name: "OLYMPIC", desc: "Snatch, clean & jerk technique", time: "19:00 (Tue/Thu)" },
];

function FitnessDemo() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-lime-400"/>
            <span className="font-black text-2xl tracking-tighter">PEAK</span>
            <span className="font-mono text-xs text-white/40">/ 001</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-white/60">
            <a href="#classes" className="hover:text-lime-400">Classes</a>
            <a href="#coach" className="hover:text-lime-400">Coaches</a>
            <a href="#members" className="hover:text-lime-400">Membership</a>
          </div>
          <a href="#join" className="bg-lime-400 text-black px-5 py-2 font-bold text-sm hover:bg-lime-300">Free trial →</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="font-mono text-xs uppercase tracking-widest text-lime-400 mb-8">// est. 2016 · warehouse 12</div>
          <h1 className="text-[18vw] md:text-[13rem] lg:text-[17rem] font-black leading-[0.82] tracking-tighter">
            LIFT<br/>
            <span className="text-lime-400">HEAVY.</span><br/>
            <span className="text-white/20">SLEEP<br/>WELL.</span>
          </h1>
          <div className="mt-16 grid md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
            <p className="text-lg text-white/70 leading-relaxed md:col-span-2 max-w-xl">
              A coached strength & conditioning gym in a 12,000 sq ft warehouse. No mirrors on the platforms.
              No leaderboard on the wall. Just a plan and a barbell.
            </p>
            <div className="flex flex-wrap gap-4 items-start">
              <a href="#join" className="bg-lime-400 text-black px-8 py-4 font-black">START TRIAL</a>
              <a href="#classes" className="border border-white/30 px-8 py-4 font-black hover:border-lime-400 hover:text-lime-400">SEE CLASSES</a>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-b border-white/10 py-6 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap font-black text-3xl tracking-tighter text-white/40">
          <span>SQUAT · BENCH · DEADLIFT · SNATCH · CLEAN · JERK · ROW · SKI · BIKE · PULL · PRESS · PUSH ·</span>
          <span>SQUAT · BENCH · DEADLIFT · SNATCH · CLEAN · JERK · ROW · SKI · BIKE · PULL · PRESS · PUSH ·</span>
        </div>
      </div>

      {/* Classes */}
      <section id="classes" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-widest text-lime-400">§ 01 / classes</p>
            <h2 className="text-6xl md:text-7xl font-black tracking-tighter mt-4">TRAIN WITH<br/>A COACH.</h2>
          </div>
          <p className="md:col-span-5 text-white/60">Every class is programmed and coached. Capped at 14 to keep hands on every bar.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {classes.map((c) => (
            <div key={c.code} className="bg-black p-10 group hover:bg-lime-400 hover:text-black transition">
              <div className="flex justify-between items-start mb-8">
                <span className="font-mono text-xs text-white/40 group-hover:text-black/60">{c.code}</span>
                <span className="font-mono text-xs group-hover:text-black">{c.time}</span>
              </div>
              <p className="text-5xl md:text-6xl font-black tracking-tighter mb-4">{c.name}</p>
              <p className="text-white/60 group-hover:text-black/80">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coaches */}
      <section id="coach" className="border-t border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-lime-400">§ 02 / coaches</p>
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter mt-4 mb-16">THE FLOOR STAFF.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "MARA K.", s: "Strength", b: "USAW L2 · 340# squat · 15 yrs" },
              { n: "DEVON R.", s: "Conditioning", b: "Ex-D1 rower · MetCon lead" },
              { n: "ALI T.", s: "Olympic", b: "National qualifier · L3" },
            ].map((c) => (
              <div key={c.n} className="border border-white/10">
                <div className="aspect-[4/5] bg-gradient-to-b from-white/10 to-transparent"/>
                <div className="p-6">
                  <p className="text-3xl font-black tracking-tighter">{c.n}</p>
                  <p className="text-lime-400 font-mono text-xs uppercase tracking-widest mt-2">{c.s}</p>
                  <p className="text-white/60 text-sm mt-3">{c.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="members" className="border-t border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-lime-400">§ 03 / membership</p>
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter mt-4 mb-16">PICK A LANE.</h2>
          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { t: "OPEN GYM", p: "89", d: "Full access · no classes" },
              { t: "UNLIMITED", p: "179", d: "All classes · open gym", h: true },
              { t: "1-ON-1", p: "349", d: "Personal programming · 4 sessions" },
            ].map((p) => (
              <div key={p.t} className={`p-10 ${p.h ? "bg-lime-400 text-black" : "bg-black"}`}>
                <p className="font-mono text-xs uppercase tracking-widest opacity-60">Per month</p>
                <p className="text-2xl font-black mt-4">{p.t}</p>
                <p className="text-6xl font-black tracking-tighter mt-6">${p.p}</p>
                <p className={`mt-6 ${p.h ? "text-black/70" : "text-white/60"}`}>{p.d}</p>
                <button className={`mt-8 w-full py-3 font-black ${p.h ? "bg-black text-lime-400" : "bg-lime-400 text-black"}`}>SELECT →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="border-t border-white/10 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-6xl md:text-8xl font-black tracking-tighter">FIRST WEEK<br/><span className="text-lime-400">ON US.</span></p>
          <p className="mt-8 text-white/60">Fill this out. We'll message you back the same day.</p>
          <form className="mt-12 grid gap-4 max-w-md mx-auto">
            <input placeholder="NAME" className="bg-transparent border-b border-white/30 py-4 text-center focus:border-lime-400 outline-none font-mono uppercase tracking-widest text-sm"/>
            <input placeholder="EMAIL" className="bg-transparent border-b border-white/30 py-4 text-center focus:border-lime-400 outline-none font-mono uppercase tracking-widest text-sm"/>
            <button className="mt-6 bg-lime-400 text-black py-4 font-black">CLAIM MY WEEK →</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-widest text-white/40">
          <p>© PEAK ATHLETIC · WAREHOUSE 12</p>
          <p>1420 INDUSTRY WAY</p>
        </div>
      </footer>
    </div>
  );
}
