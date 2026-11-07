import { cn } from '@/lib/utils';

export default function BrandMark({ variant = 'dark', compact = false }) {
  const isLight = variant === 'light';
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#F47937] to-[#C95323] shadow-[0_6px_16px_-6px_rgba(244,121,55,0.7)]">
        <span className="font-heading text-[15px] font-extrabold leading-none text-white">H</span>
      </div>
      {!compact && (
        <div className="leading-none">
          <div className={cn('font-heading text-[17px] font-extrabold tracking-tight', isLight ? 'text-white' : 'text-brand-navy')}>
            Hall<span className="text-[#F47937]">OS</span>
          </div>
          <div className={cn('mt-1 text-[10px] font-medium uppercase tracking-[0.14em]', isLight ? 'text-white/45' : 'text-muted-foreground')}>
            Your hall. One place.
          </div>
        </div>
      )}
    </div>
  );
}