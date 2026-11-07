export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="card-surface flex flex-col items-center px-6 py-10 text-center">
      {Icon && (
        <span className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-brand-navy/[0.05] text-brand-navy/50">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <p className="font-heading text-[14.5px] font-bold text-brand-navy">{title}</p>
      {description && <p className="mt-1 max-w-sm text-[12.5px] leading-relaxed text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}