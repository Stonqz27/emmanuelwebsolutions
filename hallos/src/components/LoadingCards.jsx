export default function LoadingCards({ rows = 3 }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="card-surface animate-pulse space-y-2.5 p-4">
          <div className="h-3 w-20 rounded-full bg-brand-navy/[0.06]" />
          <div className="h-4 w-3/4 rounded-full bg-brand-navy/[0.08]" />
          <div className="h-3 w-full rounded-full bg-brand-navy/[0.05]" />
          <div className="h-3 w-2/3 rounded-full bg-brand-navy/[0.05]" />
        </div>
      ))}
    </div>
  );
}