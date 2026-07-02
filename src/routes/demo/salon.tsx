import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/salon")({
  component: SalonDemo,
  head: () => ({
    meta: [
      { title: "Lush & Luxe — A Modern Hair Studio" },
      { name: "description", content: "A quiet, sunlit hair studio for cut, color, and care. Book with our senior stylists." },
    ],
  }),
});

function SalonDemo() {
  return (
    <div className="min-h-screen bg-[#f4ecdf] text-[#2a1e18]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#f4ecdf]/85 backdrop-blur">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div style={{ fontFamily: "'Fraunces', Georgia, serif" }} className="text-xl tracking-widest">
            LUSH <span className="italic text-[#b04a2e]">&</span> LUXE
          </div>
          <div className="hidden md:flex gap-10 text-sm">
            <a href="#services" className="hover:text-[#b04a2e]">Services</a>
            <a href="#stylists" className="hover:text-[#b04a2e]">Stylists</a>
            <a href="#story" className="hover:text-[#b04a2e]">The Studio</a>
            <a href="#book" className="hover:text-[#b04a2e]">Book</a>
          </div>
          <a href="#book" className="text-sm border border-[#2a1e18] px-5 py-2 hover:bg-[#2a1e18] hover:text-[#f4ecdf] transition">Reserve →</a>
        </div>
      </nav>

      {/* Hero — editorial magazine cover */}
      <section className="max-w-6xl mx-auto px-8 pt-8 pb-24">
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 space-y-3">
            <div className="aspect-[3/4] bg-gradient-to-br from-[#e8c7b4] to-[#b04a2e] rounded-sm"/>
            <p className="text-xs uppercase tracking-widest text-[#7a5b4a]">Vol. IX · Spring Issue</p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-[0.4em] text-[#b04a2e] mb-6">— A hair studio, quietly considered</p>
            <h1 style={{ fontFamily: "'Fraunces', serif" }} className="text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] font-light tracking-tight">
              Hair,<br/>
              <em className="italic text-[#b04a2e]">in good</em><br/>
              hands.
            </h1>
            <div className="mt-10 grid md:grid-cols-2 gap-6 items-end">
              <p className="text-lg text-[#5a4438] leading-relaxed">
                A small three-chair studio in the Arts District. Cuts that grow out beautifully, color built in
                natural light, and never more than two guests in the room.
              </p>
              <div className="flex gap-4">
                <a href="#book" className="bg-[#2a1e18] text-[#f4ecdf] px-6 py-3">Book a chair</a>
                <a href="#services" className="border border-[#2a1e18] px-6 py-3 hover:bg-[#2a1e18] hover:text-[#f4ecdf]">Menu</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services — menu style */}
      <section id="services" className="border-y border-[#2a1e18]/15 bg-[#ede2cf] py-24">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-[#b04a2e]">— The menu</p>
            <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl md:text-6xl mt-4 font-light">Every service, <em className="italic">tailored</em>.</h2>
          </div>
          <div className="space-y-10">
            {[
              { t: "Precision Cut", d: "Consultation, wash, cut, blow-dry", p: "$95" },
              { t: "Full Colour", d: "Single-process or gloss + demi refresh", p: "$180" },
              { t: "Balayage & Highlights", d: "Hand-painted, custom-toned", p: "from $260" },
              { t: "Bond & Repair", d: "Olaplex or K18 restorative treatment", p: "$85" },
              { t: "Bridal / Event", d: "In-studio or on-location styling", p: "from $220" },
            ].map((s) => (
              <div key={s.t} className="flex items-baseline gap-6 border-b border-[#2a1e18]/15 pb-8">
                <p style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-4xl flex-1">{s.t}</p>
                <p className="hidden md:block text-[#7a5b4a] flex-1 italic">{s.d}</p>
                <p className="text-[#b04a2e] font-medium">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stylists */}
      <section id="stylists" className="max-w-6xl mx-auto px-8 py-24">
        <p className="text-xs uppercase tracking-[0.4em] text-[#b04a2e]">— The chairs</p>
        <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl md:text-6xl mt-4 font-light mb-14">Three stylists. Three points of view.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "Aria Vance", r: "Color · Balayage", q: "The right blonde is the one no one asks about.", c: "from-[#e8c7b4] to-[#c98a68]" },
            { n: "Jordan Wei", r: "Precision cutting", q: "Cut once, live in it for eight weeks.", c: "from-[#c98a68] to-[#7a3f2a]" },
            { n: "Sam Okafor", r: "Textured & curly", q: "Curls set the rules. I follow.", c: "from-[#d4b09a] to-[#8a5a44]" },
          ].map((s) => (
            <div key={s.n}>
              <div className={`aspect-[3/4] bg-gradient-to-b ${s.c} mb-6`}/>
              <p style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl">{s.n}</p>
              <p className="text-[#b04a2e] text-sm uppercase tracking-widest mt-1">{s.r}</p>
              <p className="mt-4 italic text-[#5a4438]">"{s.q}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="bg-[#2a1e18] text-[#f4ecdf] py-32">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <p style={{ fontFamily: "'Fraunces', serif" }} className="text-3xl md:text-5xl italic leading-tight">
            "We wanted a studio that felt like a friend's kitchen — warm, unhurried,
            and a bit obsessive about the details."
          </p>
          <p className="mt-10 text-xs uppercase tracking-[0.4em] text-[#e8c7b4]">— Aria Vance, founder</p>
        </div>
      </section>

      {/* Book */}
      <section id="book" className="max-w-3xl mx-auto px-8 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#b04a2e]">— Reserve</p>
        <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-5xl md:text-6xl mt-4 font-light">Come sit down.</h2>
        <form className="mt-12 grid gap-4 max-w-md mx-auto text-left">
          <input placeholder="Name" className="bg-transparent border-b border-[#2a1e18]/30 py-3 focus:border-[#b04a2e] outline-none"/>
          <input placeholder="Phone" className="bg-transparent border-b border-[#2a1e18]/30 py-3 focus:border-[#b04a2e] outline-none"/>
          <select className="bg-transparent border-b border-[#2a1e18]/30 py-3 focus:border-[#b04a2e] outline-none">
            <option>Choose a service</option>
            <option>Precision cut</option>
            <option>Colour</option>
            <option>Balayage</option>
            <option>Treatment</option>
          </select>
          <input type="date" className="bg-transparent border-b border-[#2a1e18]/30 py-3 focus:border-[#b04a2e] outline-none"/>
          <button className="mt-6 bg-[#2a1e18] text-[#f4ecdf] py-4 justify-self-center px-12">Request appointment</button>
        </form>
      </section>

      <footer className="border-t border-[#2a1e18]/15">
        <div className="max-w-6xl mx-auto px-8 py-10 flex flex-wrap justify-between gap-4 text-sm text-[#5a4438]">
          <p>© Lush & Luxe Studio</p>
          <p>892 Fifth Ave · (212) 555-0198</p>
        </div>
      </footer>
    </div>
  );
}
