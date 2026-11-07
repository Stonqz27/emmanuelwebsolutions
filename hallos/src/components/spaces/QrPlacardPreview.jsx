import { QRCodeSVG } from 'qrcode.react';
import { MapPin, ScanLine, ShieldCheck, Sparkles } from 'lucide-react';
import { buildSpaceBadge, buildSpaceCode } from '@/lib/qrPlacards';
import { cn } from '@/lib/utils';

export default function QrPlacardPreview({ space, hallName, url, variant = 'signature', className = '' }) {
  if (!space || !url) return null;
  const badge = buildSpaceBadge(space);
  const code = buildSpaceCode(space);
  const isSignature = variant === 'signature';

  if (!isSignature) {
    return (
      <div className={cn('mx-auto w-full max-w-[360px] overflow-hidden rounded-[28px] border border-border bg-white shadow-lift print:shadow-none', className)}>
        <div className="border-b border-border/70 bg-brand-orangeSoft px-6 py-4 text-center">
          <p className="font-heading text-[28px] font-black tracking-tight text-brand-navy">HallOS</p>
          <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-orange">
            <ScanLine className="h-3.5 w-3.5" /> Scan to report
          </p>
        </div>
        <div className="space-y-4 px-6 py-5 text-center">
          <div className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-navy/70">
            <MapPin className="h-3.5 w-3.5 text-brand-orange" /> {badge}
          </div>
          <div className="mx-auto inline-flex rounded-[28px] border border-border bg-white p-4 shadow-sm">
            <QRCodeSVG value={url} size={220} level="H" marginSize={2} title={`Open HallOS for ${space.name}`} />
          </div>
          <div>
            <p className="font-heading text-[20px] font-extrabold text-brand-navy">{space.name}</p>
            <p className="mt-1 text-[12px] text-brand-navy/60">{hallName}</p>
          </div>
          <div className="rounded-2xl bg-secondary px-4 py-3 text-[12px] font-medium leading-relaxed text-brand-navy/70">
            Scan to report a new issue or confirm an existing one in this shared space.
          </div>
          <div className="flex items-start justify-center gap-2 text-left text-[10.5px] leading-relaxed text-brand-navy/55">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange" />
            <p>HallOS QR codes contain only a shared-space link. Sign in with an approved hall account to view reports.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[34px] border border-brand-navy/10 bg-white shadow-[0_18px_60px_-30px_rgba(16,24,39,0.45)] print:shadow-none', className)}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-10 top-6 h-40 w-40 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute -left-12 bottom-20 h-36 w-36 rounded-full bg-brand-navy/[0.06] blur-3xl" />
      </div>
      <div className="relative overflow-hidden bg-brand-navy px-6 pb-10 pt-6 text-white">
        <div className="absolute inset-x-0 top-0 h-px bg-white/30" />
        <div className="absolute right-5 top-5 h-24 w-24 rounded-full border border-white/10" />
        <div className="absolute right-2 top-2 h-32 w-32 rounded-full border border-white/5" />
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-heading text-[28px] font-black tracking-tight">HallOS</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">Signature QR placard</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-orange-200">
            <Sparkles className="h-3.5 w-3.5" /> Scan ready
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-[11px] text-white/70">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">Residence hall</p>
            <p className="mt-1 font-semibold text-white">{hallName}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">Space code</p>
            <p className="mt-1 font-semibold text-white">{code}</p>
          </div>
        </div>
      </div>
      <div className="relative px-6 pb-6 -mt-7">
        <div className="rounded-[30px] border border-white bg-white p-4 shadow-[0_14px_40px_-28px_rgba(16,24,39,0.8)]">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <p className="font-heading text-[20px] font-extrabold tracking-tight text-brand-navy">{space.name}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-brand-orangeSoft px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-orange">
                <MapPin className="h-3.5 w-3.5" /> {badge}
              </p>
            </div>
            <span className="rounded-2xl border border-border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-navy/55">
              Scan-to-Solve
            </span>
          </div>
          <div className="rounded-[28px] border border-brand-navy/10 bg-[#fbfcfe] p-4 text-center">
            <div className="mx-auto inline-flex rounded-[28px] bg-white p-3 shadow-[0_12px_32px_-24px_rgba(16,24,39,0.55)] ring-1 ring-brand-navy/8">
              <QRCodeSVG value={url} size={214} level="H" marginSize={2} title={`Open HallOS for ${space.name}`} />
            </div>
            <p className="mt-3 text-[12px] font-semibold text-brand-navy/70">Scan to report a new issue or confirm one already reported.</p>
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-2xl bg-secondary/80 px-4 py-3 text-[11px] leading-relaxed text-brand-navy/65">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange" />
            <p>Approved hall accounts only. Resident reports in HallOS do not replace official university maintenance work orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
