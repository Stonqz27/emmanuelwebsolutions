export default function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <header className="mb-5 flex flex-wrap items-start justify-between gap-3 sm:mb-6">
      <div className="min-w-0 flex-1">
        {eyebrow && <p className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-orange"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#F47937]" />{eyebrow}</p>}
        <h1 className="mt-1.5 font-heading text-[25px] font-black leading-[1.15] tracking-[-0.045em] text-brand-navy sm:text-[30px]">{title}</h1>
        {subtitle && <p className="mt-1.5 max-w-xl text-[12.5px] leading-[1.65] text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
