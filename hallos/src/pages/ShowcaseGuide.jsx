import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, CheckCircle2, Circle, ClipboardCheck, Laptop, RotateCcw, ShieldCheck, Smartphone } from 'lucide-react';
import { getLocalPersona, resetLocalDemo, setLocalPersona } from '@/api/localDemoClient';

/** Local-demo-only guided checklist. Never routed in the live app. */
const KEY = 'hallos-v10-showcase-checklist';
const STEPS = [
  { id: 'home', role: 'resident', title: 'First impression', where: '/', action: 'Open Home. Check brand colors, greeting, cards, mobile navigation and status labels.', expected: 'Everything fits at phone width, no invented approved visitation hours.' },
  { id: 'qr', role: 'ra', title: 'Premium QR sign', where: '/radar', action: 'Choose a shared space, open its QR icon, preview Signature/Classic, download PNG and PDF.', expected: 'Both designs render; downloaded QR is legible. In local mode the code points to this computer.' },
  { id: 'report', role: 'resident', title: 'Create a resident report', where: '/hallfix', action: 'Report a NEW sample issue in a shared space. Write a unique description you can recognize.', expected: 'Report appears in the open queue; MorganReady handoff prepares the official submission without claiming HallOS submitted it.' },
  { id: 'official', role: 'resident', title: 'MorganReady handoff', where: '/hallfix', action: 'Open â€œMake it officialâ€ for the new report, check category, copy the prepared summary, open MorganReady, then confirm the resident submission.', expected: 'The handoff records a resident confirmation and optional ticket reference; no unverified â€œuniversity ticket createdâ€ claim.' },
  { id: 'confirm', role: 'resident2', title: 'Second resident confirms', where: '/hallfix', action: 'Find the new report and click Me too once, then check duplicate prevention.', expected: 'Confirmation count increases by one, not multiple times.' },
  { id: 'staff', role: 'ra', title: 'Staff follow-through', where: '/staff', action: 'Find the report. Acknowledge, set In progress, optionally add a fictional reference, then Mark fixed.', expected: 'Report leaves the active queue and appears under recently fixed. Reference is staff-entered, not synced.' },
  { id: 'vote', role: 'resident', title: 'FixLoop recheck', where: '/hallfix', action: 'Expand recent fixes, find the report, and vote â€œStill brokenâ€.', expected: 'The staff desk displays a â€œneeds recheckâ€ follow-up.' },
  { id: 'reopen', role: 'ra', title: 'Reopen + close again', where: '/staff', action: 'Reopen the flagged issue, mark fixed again, then view feedback counts.', expected: 'The new repair round starts with zero old votes.' },
  { id: 'notice', role: 'ra', title: 'Staff hall announcement', where: '/hallcast', action: 'Publish a fictional Floor 2 announcement from the RA account.', expected: 'Only approved Floor 2 recipients receive the private notice.' },
  { id: 'inbox', role: 'resident', title: 'Check delivery', where: '/inbox', action: 'View the update as a Floor 2 resident, then switch to Floor 1 / another hall.', expected: 'Floor 2 sees it; Floor 1 and other hall should not.' },
  { id: 'access', role: 'pending', title: 'Test access protection', where: '/welcome', action: 'Switch to Pending resident and attempt opening reports or staff desk.', expected: 'Pending accounts are blocked from hall-private records.' },
  { id: 'offcampus', role: 'otherHall', title: 'Off-campus residence services', where: '/more', action: 'Open HH Midtown (The Varsity) in More. Check the separate maintenance portal, published RA on-call contact, and BEARtransit shuttle schedule.', expected: 'HH Midtown does not point to MorganReady, and Rawlings-only announcements are not visible.' },
  { id: 'mobile', role: 'resident', title: 'Mobile quality', where: '/', action: 'Open the app in Chrome device emulation (375px and 390px) and on your phone if available.', expected: 'Four tabs remain readable, no horizontal overflow, dialogs scroll, and buttons can be tapped.' },
];
const PERSONA_LABEL = { resident: 'Resident (Floor 2)', resident2: 'Second resident (Floor 1)', ra: 'Resident Assistant', pending: 'Pending resident', otherHall: 'HH Midtown resident' };

function readChecks() {
  try { const raw = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(raw) ? raw : []; } catch { return []; }
}
export default function ShowcaseGuide() {
  const [checked, setChecked] = useState(readChecks);
  const [persona] = useState(getLocalPersona);
  const percent = Math.round(checked.length / STEPS.length * 100);

  function toggle(id) {
    const next = checked.includes(id) ? checked.filter(x => x !== id) : [...checked, id];
    setChecked(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }
  function switchPersona(role, where) {
    setLocalPersona(role);
    window.location.assign('/rawlings/app' + where);
  }
  function reset() {
    if (!window.confirm('Clear this checklist and reset every fictional report / announcement?')) return;
    localStorage.removeItem(KEY);
    resetLocalDemo();
    setLocalPersona('resident');
    window.location.assign('/rawlings/app/demo-guide');
  }

  return <div className="space-y-5">
    <section className="hallos-hero relative overflow-hidden rounded-[28px] p-5 text-white sm:p-7">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#FEBF50]"><ClipboardCheck className="h-3.5 w-3.5" /> Internal showcase guide</span>
      <h1 className="mt-4 font-heading text-[27px] font-black tracking-tight sm:text-[34px]">Make every tap count.</h1>
      <p className="mt-1 max-w-xl text-[12.5px] leading-relaxed text-white/80">Run the entire HallOS story yourself. This page is available only in the fictional local test build, never in production.</p>
      <div className="mt-5 flex items-end justify-between">
        <span className="font-heading text-[28px] font-black">{checked.length}<span className="text-white/50">/{STEPS.length}</span></span>
        <span className="text-[11px] font-bold text-[#FEBF50]">{percent}% completed</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-[#FEBF50] transition-all" style={{width: `${percent}%`}} /></div>
    </section>

    <div className="grid gap-3 sm:grid-cols-2">
      <div className="card-surface p-4"><Smartphone className="h-5 w-5 text-brand-orange"/><p className="mt-2 font-heading text-[13px] font-extrabold text-brand-navy">Test on phone</p><p className="mt-1 text-[11.5px] text-muted-foreground">Your phone and laptop must be on the same Wi-Fi. Open the LAN URL from the special launcher. Local demo data is not shared across browsers.</p></div>
      <div className="card-surface p-4"><ShieldCheck className="h-5 w-5 text-[#1B4383]"/><p className="mt-2 font-heading text-[13px] font-extrabold text-brand-navy">Safety boundary</p><p className="mt-1 text-[11.5px] text-muted-foreground">Don't submit fictional test data into MorganReady. A HallOS community report is not a university work order.</p></div>
    </div>

    <section className="space-y-2.5" aria-label="End-to-end test checklist">
      <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="hallos-section-title text-[16px]">End-to-end walkthrough</h2><button onClick={reset} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-orange hover:underline"><RotateCcw className="h-3.5 w-3.5"/> Reset test data</button></div>
      {STEPS.map((step, i) => {
        const done = checked.includes(step.id);
        const matches = persona === step.role;
        return <article key={step.id} className={`card-surface overflow-hidden border ${done ? 'border-emerald-200' : ''}`}>
          <div className="flex items-start gap-3 p-4">
            <button type="button" aria-label={`Mark ${step.title} ${done ? 'incomplete' : 'complete'}`} aria-pressed={done} onClick={() => toggle(step.id)} className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border ${done ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-[#CBD8E8] text-[#7B8BA6]'}`}>{done ? <Check className="h-4 w-4"/> : <span className="text-[11px] font-extrabold">{i+1}</span>}</button>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><h3 className="font-heading text-[13.5px] font-extrabold text-brand-navy">{step.title}</h3><span className="rounded-full bg-[#EDF3FC] px-2 py-0.5 text-[10px] font-bold text-[#1B4383]">{PERSONA_LABEL[step.role]}</span></div>
              <p className="mt-1 text-[11.5px] leading-relaxed text-brand-navy/75">{step.action}</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground"><span className="font-bold text-brand-navy">Expected:</span> {step.expected}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {matches ? <Link to={step.where} className="inline-flex items-center gap-1 rounded-lg bg-[#1B4383] px-3 py-2 text-[11px] font-bold text-white">Open this screen <ArrowRight className="h-3.5 w-3.5"/></Link> : <button onClick={() => switchPersona(step.role, step.where)} className="inline-flex items-center gap-1 rounded-lg bg-[#1B4383] px-3 py-2 text-[11px] font-bold text-white">Switch persona & open <ArrowRight className="h-3.5 w-3.5"/></button>}
                {!done && <button onClick={() => toggle(step.id)} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-[11px] font-bold text-brand-navy"><Circle className="h-3.5 w-3.5"/> Mark checked</button>}
              </div>
            </div>
          </div>
        </article>;
      })}
    </section>
    {checked.length === STEPS.length && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-[12.5px] font-bold text-emerald-900"><CheckCircle2 className="mb-2 h-5 w-5"/> You completed the manual walkthrough. Now run the automated tests and capture your judge demo video.</div>}
    <div className="flex items-center justify-center gap-2 text-[10.5px] text-muted-foreground"><Laptop className="h-3.5 w-3.5"/> V10 local test environment Â· not official Morgan systems</div>
  </div>;
}
