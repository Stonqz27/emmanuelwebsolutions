import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, actionLabel, actionTo, onAction }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3 px-0.5">
      <div>
        <h2 className="font-heading text-[17px] font-bold text-brand-navy">{title}</h2>
        {subtitle && <p className="mt-0.5 text-[12.5px] text-muted-foreground">{subtitle}</p>}
      </div>
      {actionLabel && (
        actionTo ? (
          <Link
            to={actionTo}
            className="flex shrink-0 items-center gap-1 text-[12.5px] font-semibold text-brand-orange"
          >
            {actionLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <button onClick={onAction} className="flex shrink-0 items-center gap-1 text-[12.5px] font-semibold text-brand-orange">
            {actionLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )
      )}
    </div>
  );
}