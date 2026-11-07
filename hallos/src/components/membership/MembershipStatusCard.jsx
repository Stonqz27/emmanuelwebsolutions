import { CheckCircle2, Clock3, XCircle, ShieldAlert } from 'lucide-react';
const labels = { pending: 'Awaiting approval', approved: 'Approved membership', rejected: 'Membership not approved', suspended: 'Membership suspended' };
const icons = { pending: Clock3, approved: CheckCircle2, rejected: XCircle, suspended: ShieldAlert };
export default function MembershipStatusCard({ profile, hallName, onChangeHall }) {
  const status = profile?.membership_status || 'pending';
  const Icon = icons[status] || Clock3;
  return (
    <div className="card-surface space-y-3 p-5">
      <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-orangeSoft text-brand-orange"><Icon className="h-5 w-5" /></span><div><p className="font-heading text-[15px] font-bold text-brand-navy">{labels[status] || 'Membership status'}</p><p className="text-[12px] text-muted-foreground">{hallName || 'Residence hall'}</p></div></div>
      <p className="text-[12px] leading-relaxed text-muted-foreground">{profile?.membership_note || (status === 'pending' ? 'An authorized staff reviewer needs to approve your hall request.' : status === 'approved' ? 'Your hall is connected to your HallOS account.' : 'Ask residence hall staff for help with your membership.')}</p>
      <button type="button" onClick={onChangeHall} className="rounded-xl border border-border px-3 py-2 text-[12px] font-bold text-brand-navy">Request another hall</button>
    </div>
  );
}
