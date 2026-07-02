import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/restaurant")({
  component: RestaurantDemo,
  head: () => ({
    meta: [
      { title: "Artisan Kitchen & Bar — Seasonal Tasting Menu" },
      { name: "description", content: "A James Beard finalist chef's counter. Rotating monthly menu, natural wine, walk-in bar." },
    ],
  }),
});

const menu = {
  Snacks: [
    ["Warm cultured bread", "cold-churned butter, sea salt", "9"],
    ["Kampachi crudo", "green strawberry, shiso, koji", "22"],
    ["Duck fat potatoes", "black garlic aioli, chive", "14"],
  ],
  Plates: [
    ["Diver scallops", "corn silk, prosciutto, brown butter", "38"],
    ["Aged duck breast", "sour cherry, fermented rhubarb, jus", "44"],
    ["Handmade cavatelli", "morel, ramp, cured yolk", "32"],
    ["Wood-grilled halibut", "peas, buttermilk, dill oil", "46"],
  ],
  Sweets: [
    ["Buckwheat honey cake", "crème fraîche, bee pollen", "14"],
    ["Chocolate & olive oil", "smoked salt, sherry", "13"],
  ],
};

function RestaurantDemo() {
  return (
    <div className="min-h-screen bg-[#0f0d0a] text-[#ecdfc7]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#0f0d0a]/90 backdrop-blur border-b border-[#ecdfc7]/10">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-2xl tracking-wide">
            Artisan <span className="italic text-[#c9a961]">Kitchen</span>
          </div>
          <div className="hidden md:flex gap-10 text-xs uppercase tracking-[0.3em] text-[#ecdfc7]/70">
            <a href="#menu" className="hover:text-[#c9a961]">Menu</a>
            <a href="#chef" className="hover:text-[#c9a961]">Chef</a>
            <a href="#room" className="hover:text-[#c9a961]">The Room</a>
            <a href="#reserve" className="hover:text-[#c9a961]">Reserve</a>
          </div>
          <a href="#reserve" className="text-xs uppercase tracking-[0.25em] border border-[#c9a961] text-[#c9a961] px-5 py-2.5 hover:bg-[#c9a961] hover:text-[#0f0d0a] transition">Book</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1e1913_0%,#0f0d0a_70%)]"/>
        <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,#ecdfc7_0_1px,transparent_1px_40px)]"/>
        <div className="relative max-w-6xl mx-auto px-8 py-24 grid lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-[0.4em] text-[#c9a961] mb-10">— James Beard Finalist · 2024</p>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9] font-normal">
              Cooked slowly,<br/>
              <em className="italic text-[#c9a961]">served attentively.</em>
            </h1>
            <p className="mt-10 text-lg text-[#ecdfc7]/70 max-w-lg leading-relaxed">
              A twenty-eight seat counter run by chef Rosa Hidalgo. One rotating menu each month,
              built around what our farmers picked that week.
            </p>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#ecdfc7]/40 mb-1">Dinner</p>
                <p>Wed – Sun · 5:30 to 10:30</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#ecdfc7]/40 mb-1">Address</p>
                <p>218 Alameda St, Second Floor</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#ecdfc7]/40 mb-1">Tasting</p>
                <p>7 courses · $128</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <div className="aspect-[3/4] bg-gradient-to-br from-[#3b2f1e] via-[#1a1510] to-[#0f0d0a] relative">
              <div className="absolute inset-4 border border-[#c9a961]/30"/>
              <div className="absolute bottom-6 left-6 right-6">
                <p style={{ fontFamily: "'Playfair Display', serif" }} className="italic text-[#c9a961]">"an heirloom-driven, deeply personal room"</p>
                <p className="text-xs uppercase tracking-widest text-[#ecdfc7]/50 mt-3">— The Standard Review</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="max-w-4xl mx-auto px-8 py-32">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-[#c9a961]">— This month</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-7xl mt-4">The <em className="italic">April</em> menu.</h2>
          <p className="mt-6 text-[#ecdfc7]/60 italic">Menu changes with the season. À la carte, or as a chef's tasting.</p>
        </div>
        <div className="space-y-16">
          {Object.entries(menu).map(([sec, items]) => (
            <div key={sec}>
              <div className="flex items-center gap-6 mb-8">
                <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl italic text-[#c9a961]">{sec}</p>
                <div className="flex-1 border-t border-[#ecdfc7]/15"/>
              </div>
              <div className="space-y-8">
                {items.map(([name, desc, price]) => (
                  <div key={name} className="flex gap-6">
                    <div className="flex-1">
                      <p style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl">{name}</p>
                      <p className="text-[#ecdfc7]/60 mt-1 italic">{desc}</p>
                    </div>
                    <p className="text-[#c9a961] font-light">{price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chef */}
      <section id="chef" className="bg-[#161210] py-32 border-y border-[#ecdfc7]/10">
        <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] bg-gradient-to-tr from-[#3b2f1e] to-[#1a1510] relative">
            <div className="absolute inset-6 border border-[#c9a961]/40"/>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#c9a961] mb-6">— At the counter</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-6xl leading-tight">
              Chef <em className="italic">Rosa Hidalgo</em>
            </h2>
            <p className="mt-8 text-[#ecdfc7]/70 leading-relaxed">
              Trained under Aduriz in San Sebastián, then eight years at three-star kitchens across Copenhagen and
              Kyoto. Rosa opened Artisan in 2019 as a return to home cooking — refined, but generous.
            </p>
            <p className="mt-4 text-[#ecdfc7]/70 leading-relaxed">
              She cooks on the line every night. If you're at the counter, she'll walk you through each plate.
            </p>
          </div>
        </div>
      </section>

      {/* Reserve */}
      <section id="reserve" className="max-w-3xl mx-auto px-8 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#c9a961] mb-8">— Reserve</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-5xl md:text-6xl">A table awaits.</h2>
        <p className="mt-6 text-[#ecdfc7]/60">Reservations open 30 days in advance. Counter seats released Sunday at noon.</p>
        <form className="mt-12 grid gap-4 max-w-md mx-auto text-left">
          <input placeholder="Name" className="bg-transparent border-b border-[#ecdfc7]/30 py-3 focus:border-[#c9a961] outline-none"/>
          <input placeholder="Email" className="bg-transparent border-b border-[#ecdfc7]/30 py-3 focus:border-[#c9a961] outline-none"/>
          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="bg-transparent border-b border-[#ecdfc7]/30 py-3 focus:border-[#c9a961] outline-none"/>
            <select className="bg-transparent border-b border-[#ecdfc7]/30 py-3 focus:border-[#c9a961] outline-none">
              <option className="bg-[#0f0d0a]">2 guests</option>
              <option className="bg-[#0f0d0a]">4 guests</option>
              <option className="bg-[#0f0d0a]">6 guests</option>
            </select>
          </div>
          <button className="mt-6 border border-[#c9a961] text-[#c9a961] py-4 hover:bg-[#c9a961] hover:text-[#0f0d0a] tracking-widest uppercase text-xs">Request reservation</button>
        </form>
      </section>

      <footer className="border-t border-[#ecdfc7]/10">
        <div className="max-w-6xl mx-auto px-8 py-10 flex flex-wrap justify-between gap-4 text-xs uppercase tracking-widest text-[#ecdfc7]/50">
          <p>© Artisan Kitchen & Bar</p>
          <p>218 Alameda St · (415) 555-0142</p>
        </div>
      </footer>
    </div>
  );
}
