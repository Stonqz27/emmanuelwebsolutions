import { db } from '@/api/base44Client';
import { useState } from 'react';
import { Loader2, Megaphone, Send } from 'lucide-react';

import { useSession } from '@/lib/session';
import { ANNOUNCEMENT_CATEGORIES } from '@/lib/constants';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const PRIORITIES = [
  { value: 'normal', label: 'Standard' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export default function PublishAnnouncementButton({ onPublished, triggerClassName }) {
  const { hall, profile } = useSession();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('normal');
  const [floor, setFloor] = useState('all');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [requiresAck, setRequiresAck] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const floors = Array.from({ length: hall?.floor_count || 5 }, (_, i) => String(i + 1));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await db.functions.invoke('publishAnnouncement', {
        hall_id: hall.id,
        floor: floor === 'all' ? '' : floor,
        category,
        priority,
        title,
        body,
        requires_ack: requiresAck,
      });
      setTitle('');
      setBody('');
      setRequiresAck(false);
      setOpen(false);
      onPublished?.();
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Could not publish right now.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={cn('tap flex items-center gap-1.5 rounded-xl bg-brand-navy px-3.5 py-2.5 text-[12.5px] font-bold text-white transition hover:bg-brand-ink', triggerClassName)}>
          <Megaphone className="h-3.5 w-3.5" />
          New post
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-[17px]">Publish to {hall?.name}</DialogTitle>
          <DialogDescription className="text-[12.5px]">
            Posts are labeled with your name and staff role. Residents get an inbox item immediately.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ANNOUNCEMENT_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Audience</label>
            <Select value={floor} onValueChange={setFloor}>
              <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Entire hall</SelectItem>
                {floors.map((f) => <SelectItem key={f} value={f}>Floor {f} only</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Headline</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={140}
              placeholder="What should residents know?"
              className="mt-1.5 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-[13.5px] text-brand-navy outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Message</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              maxLength={2000}
              placeholder="Give the details residents need — times, locations, what to do."
              className="mt-1.5 w-full resize-none rounded-xl border border-border bg-white px-3 py-2.5 text-[13.5px] leading-relaxed text-brand-navy outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10"
            />
          </div>

          <label className="flex items-center gap-2.5 rounded-xl bg-secondary/70 px-3 py-2.5">
            <input type="checkbox" checked={requiresAck} onChange={(e) => setRequiresAck(e.target.checked)} className="h-4 w-4 accent-brand-orange" />
            <span className="text-[12.5px] font-medium text-brand-navy">Require residents to acknowledge</span>
          </label>

          {error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-[12.5px] font-medium text-rose-700">{error}</p>}

          <button
            type="submit"
            disabled={saving || !title.trim() || !body.trim()}
            className="tap flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-[13.5px] font-bold text-white transition hover:bg-[#EA580C] disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Publish announcement
          </button>
          <p className="text-center text-[10.5px] text-muted-foreground">
            No email or push is sent. Residents see this in Hallcast and their inbox.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}