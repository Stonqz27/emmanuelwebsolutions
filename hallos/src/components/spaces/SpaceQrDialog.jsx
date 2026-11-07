import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Copy, Download, FileDown, Printer, QrCode, ShieldCheck, Sparkles } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { spaceUrl } from '@/lib/space-links';
import { QR_PLACARD_THEMES, buildQrPlacardFileName, getQrPlacardTheme } from '@/lib/qrPlacards';
import QrPlacardPreview from '@/components/spaces/QrPlacardPreview';
import { cn } from '@/lib/utils';

export default function SpaceQrDialog({ space, hallName, onClose }) {
  const [copied, setCopied] = useState(false);
  const [variant, setVariant] = useState('signature');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState('');
  const placardRef = useRef(null);

  const url = useMemo(() => {
    if (!space || typeof window === 'undefined') return '';
    try { return spaceUrl(space.id, window.location.origin); } catch { return ''; }
  }, [space]);

  const theme = getQrPlacardTheme(variant);
  const fileName = buildQrPlacardFileName({ hallName, spaceName: space?.name, theme: variant, ext: 'png' });

  async function copyLink() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setStatus('Link copied — you can paste it into a message, email, or another QR workflow.');
    } catch {
      setCopied(false);
      setStatus('Could not copy the link on this device.');
    }
  }

  async function renderPlacardCanvas() {
    if (!placardRef.current) throw new Error('Placard preview unavailable');
    return html2canvas(placardRef.current, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
    });
  }

  async function downloadPng() {
    try {
      setBusy('png');
      const canvas = await renderPlacardCanvas();
      const anchor = document.createElement('a');
      anchor.href = canvas.toDataURL('image/png');
      anchor.download = fileName;
      anchor.click();
      setStatus('PNG downloaded — ready to share or print.');
    } catch (error) {
      setStatus(error?.message || 'Could not create the PNG sign.');
    } finally {
      setBusy('');
    }
  }

  async function downloadPdf() {
    try {
      setBusy('pdf');
      const canvas = await renderPlacardCanvas();
      const image = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 42;
      const targetWidth = pageWidth - margin * 2;
      const targetHeight = canvas.height * (targetWidth / canvas.width);
      const height = Math.min(targetHeight, pageHeight - margin * 2);
      pdf.addImage(image, 'PNG', margin, margin, targetWidth, height, undefined, 'FAST');
      pdf.save(fileName.replace(/\.png$/i, '.pdf'));
      setStatus('PDF downloaded — ideal for printing the sign.');
    } catch (error) {
      setStatus(error?.message || 'Could not create the PDF sign.');
    } finally {
      setBusy('');
    }
  }

  async function printPlacard() {
    try {
      setBusy('print');
      const canvas = await renderPlacardCanvas();
      const popup = window.open('', '_blank', 'noopener,noreferrer,width=920,height=1200');
      if (!popup) throw new Error('Please allow pop-ups to print the QR sign.');
      const image = canvas.toDataURL('image/png');
      popup.document.write(`<!doctype html><html><head><title>HallOS QR Sign</title><style>
        body { margin: 0; background: #f5f7fa; display: grid; place-items: center; min-height: 100vh; }
        .wrap { padding: 24px; }
        img { width: min(100%, 420px); height: auto; display: block; box-shadow: 0 18px 60px -30px rgba(16,24,39,.45); border-radius: 28px; background: white; }
        @media print { body { background: white; min-height: auto; } .wrap { padding: 0; } img { box-shadow: none; width: 100%; max-width: none; } }
      </style></head><body><div class="wrap"><img alt="HallOS QR sign" src="${image}" /></div><script>window.onload = () => { window.print(); };</script></body></html>`);
      popup.document.close();
      setStatus('Print window opened. Use letter-size paper for the cleanest result.');
    } catch (error) {
      setStatus(error?.message || 'Could not prepare the print view.');
    } finally {
      setBusy('');
    }
  }

  return (
    <Dialog open={!!space} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading text-lg"><QrCode className="h-5 w-5 text-brand-orange" /> Premium QR signage</DialogTitle>
          <DialogDescription>Generate a polished HallOS sign for this shared space. Keep it stylish, printable, and easy to scan.</DialogDescription>
        </DialogHeader>
        {space && url && (
          <div className="space-y-4">
            {url.includes('localhost') || url.includes('127.0.0.1') ? (
              <div role="note" className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[11px] leading-relaxed text-amber-900">
                <strong>Local QR preview:</strong> This code points back to this computer. For a phone scan, run START_HALLOS_PHONE_TEST.bat and open the LAN address on your laptop before generating the sign. Published QR signs should use your live app URL.
              </div>
            ) : null}
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start">
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-navy/45">Choose a sign style</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {QR_PLACARD_THEMES.map((option) => {
                      const selected = option.id === variant;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setVariant(option.id)}
                          aria-pressed={selected}
                          className={cn('rounded-2xl border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange', selected ? 'border-brand-navy bg-brand-navy text-white' : 'border-border bg-white text-brand-navy hover:border-brand-navy/25')}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="font-heading text-[13.5px] font-extrabold">{option.label}</p>
                              <p className={cn('mt-0.5 text-[10px] font-bold uppercase tracking-[0.16em]', selected ? 'text-white/55' : 'text-brand-orange')}>{option.eyebrow}</p>
                            </div>
                            {option.id === 'signature' && <Sparkles className={cn('h-4 w-4', selected ? 'text-orange-200' : 'text-brand-orange')} />}
                          </div>
                          <p className={cn('mt-2 text-[11px] leading-relaxed', selected ? 'text-white/75' : 'text-muted-foreground')}>{option.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-secondary/50 p-3.5 text-[12px] leading-relaxed text-brand-navy/70">
                  <p className="font-bold text-brand-navy">Why this helps HallOS stand out</p>
                  <p className="mt-1">A strong QR sign turns your scan flow into a real-world touchpoint judges can picture on a residence hall wall.</p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  <button type="button" onClick={copyLink} className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2.5 text-xs font-bold text-brand-navy"><Copy className="h-4 w-4" />{copied ? 'Copied!' : 'Copy link'}</button>
                  <button type="button" onClick={downloadPng} disabled={busy !== ''} className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2.5 text-xs font-bold text-brand-navy disabled:opacity-60"><Download className="h-4 w-4" />{busy === 'png' ? 'Creating…' : 'Download PNG'}</button>
                  <button type="button" onClick={downloadPdf} disabled={busy !== ''} className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2.5 text-xs font-bold text-brand-navy disabled:opacity-60"><FileDown className="h-4 w-4" />{busy === 'pdf' ? 'Creating…' : 'Download PDF'}</button>
                  <button type="button" onClick={printPlacard} disabled={busy !== ''} className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-orange px-3 py-2.5 text-xs font-bold text-white disabled:opacity-60"><Printer className="h-4 w-4" />{busy === 'print' ? 'Preparing…' : 'Print sign'}</button>
                </div>
                {status && <p role="status" className="rounded-xl bg-brand-orangeSoft px-3 py-2 text-[11.5px] text-brand-navy">{status}</p>}
                <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" /> QR codes contain only a shared-space link, not student data. Place signage only with residence hall permission.</p>
              </div>

              <div className="lg:sticky lg:top-4">
                <div ref={placardRef}>
                  <QrPlacardPreview space={space} hallName={hallName} url={url} variant={theme.id} />
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
