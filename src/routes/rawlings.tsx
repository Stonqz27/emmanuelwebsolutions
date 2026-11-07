import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";

type Role = "resident" | "ra";
type Report = { id: string; space: string; issue: string; details: string; status: "Open" | "Acknowledged" | "Fixed"; created: string };
type Update = { id: string; floor: string; message: string; created: string };
const STORE = "ews-rawlings-hallos-showcase-v1";
const seedReports: Report[] = [
  { id: "R-101", space: "Floor 2 shared bathroom", issue: "Leaking faucet", details: "Fictional example for testing.", status: "Open", created: "Demo" },
  { id: "R-102", space: "Floor 1 trash area", issue: "Overflowing trash", details: "Fictional example for testing.", status: "Acknowledged", created: "Demo" },
];
const seedUpdates: Update[] = [
  { id: "U-101", floor: "2", message: "Welcome to the Floor 2 HallOS demo! This announcement is fictional.", created: "Demo" },
];
const uid = () => Math.random().toString(36).slice(2, 9);
function loadState(): { reports: Report[]; updates: Update[] } {
  if (typeof window === "undefined") return { reports: seedReports, updates: seedUpdates };
  try {
    const data = JSON.parse(window.localStorage.getItem(STORE) || "null");
    if (Array.isArray(data?.reports) && Array.isArray(data?.updates)) return data;
  } catch { /* Bad local data resets the demo */ }
  return { reports: seedReports, updates: seedUpdates };
}
export const Route = createFileRoute("/rawlings")({
  head: () => ({ meta: [
    { title: "HallOS — Rawlings Hall | Emmanuel Web Solutions" },
    { name: "description", content: "Explore an independent student-built Rawlings Hall coordination demo: announcements, maintenance reporting, and RA workflows." },
    { name: "robots", content: "noindex, nofollow" }
  ]}),
  component: RawlingsPage,
});
function RawlingsPage() {
  const [tab, setTab] = useState<"home" | "updates" | "report" | "staff">("home");
  const [role, setRole] = useState<Role>("resident");
  const [floor, setFloor] = useState("2");
  const [data, setData] = useState(loadState);
  const [space, setSpace] = useState("Floor 2 shared bathroom");
  const [issue, setIssue] = useState("Leak / plumbing");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [targetFloor, setTargetFloor] = useState("2");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    window.localStorage.setItem(STORE, JSON.stringify(data));
  }, [data]);
  const openCount = data.reports.filter(r => r.status !== "Fixed").length;
  function addReport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!details.trim()) { setNotice("Please describe the issue first."); return; }
    setData(prev => ({ ...prev, reports: [{
      id: "R-" + uid(), space, issue, details: details.trim().slice(0, 500),
      status: "Open", created: new Date().toLocaleDateString(),
    }, ...prev.reports] }));
    setDetails("");
    setNotice("Saved to this browser's fictional demo only. No MorganReady work order was created.");
    setTab("home");
  }
  function addUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) return;
    setData(prev => ({ ...prev, updates: [{
      id: "U-" + uid(), floor: targetFloor, message: message.trim().slice(0, 400),
      created: new Date().toLocaleDateString(),
    }, ...prev.updates] }));
    setMessage("");
    setNotice("Demo announcement published in this browser only.");
    setTab("updates");
  }
  function updateStatus(id: string, status: Report["status"]) {
    setData(prev => ({ ...prev, reports: prev.reports.map(r => r.id === id ? { ...r, status } : r) }));
  }
  const card = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";
  const input = "w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-900 focus:border-blue-700 focus:outline-none";
  return <PageShell>
    <main className="bg-[#f3f6fc] text-slate-900 min-h-screen pb-20">
      <section className="bg-[#0e1832] text-white py-16 md:py-20">
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">Emmanuel Web Solutions / Student project</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight">Hall<span className="text-[#f5b62a]">OS</span> / Rawlings</h1>
            <span className="rounded-full border border-amber-300/50 px-3 py-1 text-xs text-amber-200">Interactive demo</span>
          </div>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">Your hall. One place. Explore resident updates, issue reporting and RA workflows in a Rawlings Hall prototype.</p>
          <p className="mt-4 max-w-2xl text-sm text-amber-200">Independent student concept — not an official Morgan State University application. All accounts, announcements and reports on this page are fictional browser-local test data.</p>
        </div>
      </section>
      <div className="container-page relative -mt-7">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-xs uppercase tracking-widest text-slate-500">Demo identity</p><p className="text-lg font-bold">{role === "ra" ? "Sam Rivera · RA demo" : "Alex Morgan · Resident demo"}</p></div>
            <div className="flex flex-wrap gap-3">
              <label className="text-xs font-semibold">Role<select aria-label="Demo role" className={input} value={role} onChange={e => { setRole(e.target.value as Role); setNotice("Roles on this page are simulation-only."); }}>{["resident", "ra"].map(v => <option key={v} value={v}>{v === "ra" ? "RA (demo)" : "Resident (demo)"}</option>)}</select></label>
              <label className="text-xs font-semibold">Floor<select aria-label="Demo floor" className={input} value={floor} onChange={e => setFloor(e.target.value)}>{["1","2","3","4","5"].map(v => <option key={v} value={v}>Floor {v}</option>)}</select></label>
            </div>
          </div>
          <nav aria-label="HallOS sections" className="mt-6 flex flex-wrap gap-2 border-t border-slate-200 pt-5">
            {(["home", "updates", "report", ...(role === "ra" ? ["staff"] : [])] as const).map(v =>
              <button key={v} type="button" onClick={() => { setTab(v as typeof tab); setNotice(""); }} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tab === v ? "bg-[#132553] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{v === "home" ? "Home" : v === "updates" ? "HallCast" : v === "report" ? "HallFix" : "RA desk"}</button>)}
          </nav>
        </div>
        {notice && <p role="status" className="my-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-800">{notice}</p>}
        {tab === "home" && <section className="mt-8 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className={card}><p className="text-sm text-slate-500">Residence</p><p className="mt-2 text-2xl font-bold">Rawlings Hall</p><p className="mt-2 text-sm text-slate-500">Morgan State University · Demo</p></div>
            <div className={card}><p className="text-sm text-slate-500">Open demo issues</p><p className="mt-2 text-4xl font-bold">{openCount}</p><p className="mt-2 text-sm text-slate-500">Not university maintenance tickets</p></div>
            <div className={card}><p className="text-sm text-slate-500">Your floor</p><p className="mt-2 text-4xl font-bold">{floor}</p><p className="mt-2 text-sm text-slate-500">Simulated selection</p></div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <article className={card}><p className="text-xs font-bold uppercase tracking-widest text-blue-800">HallFix</p><h2 className="mt-3 text-2xl font-bold">Something broken?</h2><p className="my-4 text-slate-600">Try a local issue report and see how your hall's repair workflow could look.</p><button className="rounded-xl bg-[#132553] px-5 py-3 font-semibold text-white" onClick={() => setTab("report")}>Try issue reporting</button></article>
            <article className={card}><p className="text-xs font-bold uppercase tracking-widest text-blue-800">HallCast</p><h2 className="mt-3 text-2xl font-bold">Floor updates</h2><p className="my-4 text-slate-600">View announcements filtered to your selected floor.</p><button className="rounded-xl bg-[#132553] px-5 py-3 font-semibold text-white" onClick={() => setTab("updates")}>View updates</button></article>
          </div>
          <div className={card}><h2 className="text-xl font-bold">Official maintenance handoff</h2><p className="my-3 text-slate-600">A demo report does not create an official work order. For real maintenance, use Morgan's official channels.</p><a className="inline-flex rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950" href="https://morganready.assetworks.cloud/ready/" target="_blank" rel="noopener noreferrer">Open MorganReady ↗</a></div>
        </section>}
        {tab === "updates" && <section className="mt-8 space-y-4">
          <div><h2 className="text-3xl font-bold">HallCast</h2><p className="text-slate-600">Demo announcements for Floor {floor} and building-wide updates.</p></div>
          {data.updates.filter(u => u.floor === floor || u.floor === "all").length ? data.updates.filter(u => u.floor === floor || u.floor === "all").map(u => <article key={u.id} className={card}><p className="text-xs font-semibold uppercase tracking-widest text-blue-800">{u.floor === "all" ? "Building-wide" : "Floor " + u.floor} · {u.created}</p><p className="mt-3 whitespace-pre-wrap">{u.message}</p></article>) : <p className={card}>No demo announcements for this floor.</p>}
        </section>}
        {tab === "report" && <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <div><h2 className="text-3xl font-bold">HallFix</h2><p className="mt-3 text-slate-600">Create a fictional issue report for testing. Nothing is sent to Morgan State or any RA.</p>
            <form className={`mt-6 space-y-4 ${card}`} onSubmit={addReport}>
              <label className="block text-sm font-semibold">Shared space<select value={space} onChange={e => setSpace(e.target.value)} className={`mt-2 ${input}`}>{["Floor " + floor + " shared bathroom","Floor " + floor + " trash area","Laundry room","Common area"].map(v => <option key={v}>{v}</option>)}</select></label>
              <label className="block text-sm font-semibold">Issue type<select value={issue} onChange={e => setIssue(e.target.value)} className={`mt-2 ${input}`}>{["Leak / plumbing","Cleaning / trash","Electrical / lighting","Door / lock","Other"].map(v => <option key={v}>{v}</option>)}</select></label>
              <label className="block text-sm font-semibold">What happened?<textarea className={`mt-2 min-h-28 ${input}`} maxLength={500} value={details} onChange={e => setDetails(e.target.value)} placeholder="Describe a fictional issue…" required /></label>
              <button className="w-full rounded-xl bg-[#132553] px-5 py-3 font-bold text-white" type="submit">Save demo report</button>
            </form>
          </div>
          <div><h2 className="mb-4 text-2xl font-bold">Local issue feed</h2><div className="space-y-3">{data.reports.map(r => <article className={card} key={r.id}><div className="flex items-center justify-between gap-3"><p className="font-bold">{r.issue}</p><span className="rounded-full bg-slate-100 px-3 py-1 text-xs">{r.status}</span></div><p className="mt-2 text-sm text-slate-600">{r.space}</p><p className="mt-2 text-sm">{r.details}</p></article>)}</div></div>
        </section>}
        {tab === "staff" && role === "ra" && <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <div><h2 className="text-3xl font-bold">RA desk · Simulation</h2><p className="mt-3 text-slate-600">This role switch is only for a local demo. It does not grant staff access or authenticate anyone.</p><form className={`mt-5 space-y-4 ${card}`} onSubmit={addUpdate}>
            <h3 className="text-lg font-bold">Publish a demo update</h3><label className="block text-sm font-semibold">Audience<select className={`mt-2 ${input}`} value={targetFloor} onChange={e => setTargetFloor(e.target.value)}><option value="all">Building-wide</option>{["1","2","3","4","5"].map(v => <option key={v} value={v}>Floor {v}</option>)}</select></label>
            <label className="block text-sm font-semibold">Message<textarea className={`mt-2 min-h-28 ${input}`} maxLength={400} value={message} onChange={e => setMessage(e.target.value)} required placeholder="Write a fictional hall update…" /></label><button type="submit" className="rounded-xl bg-[#132553] px-5 py-3 font-bold text-white">Publish locally</button></form>
          </div>
          <div><h2 className="mb-4 text-2xl font-bold">Demo report triage</h2><div className="space-y-3">{data.reports.map(r => <article key={r.id} className={card}><p className="font-bold">{r.issue}</p><p className="my-2 text-sm text-slate-600">{r.space} · {r.status}</p><div className="flex flex-wrap gap-2">{(["Open","Acknowledged","Fixed"] as const).map(status => <button type="button" key={status} disabled={r.status === status} onClick={() => updateStatus(r.id, status)} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold disabled:opacity-40">{status}</button>)}</div></article>)}</div></div>
        </section>}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-7">
          <p className="max-w-2xl text-xs text-slate-600">HallOS V10-inspired public showcase. This page is a lightweight local simulation, not the complete Base44 backend, not an official housing portal, and not a place for personal information or real maintenance requests.</p>
          <button type="button" className="text-sm font-semibold text-blue-800 underline" onClick={() => { setData({reports:seedReports,updates:seedUpdates});setNotice("Browser demo reset.");setTab("home"); }}>Reset demo data</button>
        </div>
      </div>
    </main>
  </PageShell>;
}
