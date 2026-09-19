import { FormEvent, useEffect, useMemo, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import {
  AlertCircle,
  BarChart3,
  ClipboardList,
  ExternalLink,
  Lock,
  LogOut,
  Mail,
  RefreshCw,
  Shield,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import {
  ENQUIRY_STATUSES,
  EVENT_METRICS,
  SF_ADMIN_REDIRECT_URL,
  SF_CASE_STUDIES_URL,
  SF_PORTFOLIO_URL,
  adminDashboardRedirectUrl,
  countSfEvents,
  defaultDateRange,
  listSfEnquiries,
  listSfEvents,
  savedEnquiryRate,
  sendAdminMagicLink,
  updateSfEnquiry,
  utmBreakdown,
  type DateRange,
  type SfEnquiryRow,
} from '../../lib/shafeeqahAdmin';

type Props = {
  user: User | null;
  isAdmin: boolean;
  authLoading: boolean;
  membershipError: string | null;
  onSignedOut: () => void;
};

const privacyCopy =
  'Events store page and button counts only — no names, emails, phones or form contents. Enquiries are stored so an authorised person can follow up. This site does not send automated email or WhatsApp. Analytics are not claimed to be anonymous, and page views are not unique visitors.';

function formatPct(value: number | null) {
  if (value === null) return '—';
  return `${Math.round(value * 1000) / 10}%`;
}

function formatWhen(value: string | null | undefined) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export default function ShafeeqahPortfolioPanel({
  user,
  isAdmin,
  authLoading,
  membershipError,
  onSignedOut,
}: Props) {
  const [email, setEmail] = useState('');
  const [linkStatus, setLinkStatus] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [range, setRange] = useState<DateRange>(defaultDateRange);
  const [includeSynthetic, setIncludeSynthetic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [events, setEvents] = useState<Awaited<ReturnType<typeof listSfEvents>>>([]);
  const [enquiries, setEnquiries] = useState<SfEnquiryRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ status: 'new', owner: '', next_action: '', follow_up_date: '' });
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const redirectUrl = typeof window === 'undefined' ? SF_ADMIN_REDIRECT_URL : adminDashboardRedirectUrl();

  async function handleMagicLink(event: FormEvent) {
    event.preventDefault();
    setSending(true);
    setLinkStatus(null);
    const { error: sendError } = await sendAdminMagicLink(email);
    setSending(false);
    setLinkStatus(
      sendError
        ? 'Unable to send the link. The address must already exist in Auth (new users are not created here).'
        : 'Check your email for the sign-in link.',
    );
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    onSignedOut();
  }

  async function loadBoard() {
    if (!isAdmin) return;
    setLoading(true);
    setError(null);
    try {
      const metricCounts = await Promise.all(
        EVENT_METRICS.map(async (metric) => [metric.name, await countSfEvents(metric.name, range, includeSynthetic)] as const),
      );
      const [eventRows, enquiryRows] = await Promise.all([
        listSfEvents(range, includeSynthetic),
        listSfEnquiries(range, includeSynthetic),
      ]);
      setCounts(Object.fromEntries(metricCounts));
      setEvents(eventRows);
      setEnquiries(enquiryRows);
    } catch (err: any) {
      const message = String(err?.message || err);
      if (err?.code === 'PGRST205' || /schema cache|could not find the table/i.test(message)) {
        setError('Migration 009 is not applied yet, so sf_events and sf_enquiries cannot be read.');
      } else {
        setError(message);
      }
      setCounts({});
      setEvents([]);
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isAdmin) return;
    void loadBoard();
  }, [isAdmin, range.from, range.to, includeSynthetic]);

  useEffect(() => {
    const selected = enquiries.find((row) => row.id === selectedId);
    if (!selected) {
      setDraft({ status: 'new', owner: '', next_action: '', follow_up_date: '' });
      return;
    }
    setDraft({
      status: selected.status || 'new',
      owner: selected.owner || '',
      next_action: selected.next_action || '',
      follow_up_date: selected.follow_up_date || '',
    });
    setSaveStatus(null);
  }, [selectedId, enquiries]);

  const starts = counts.enquiry_start || 0;
  const saved = counts.enquiry_saved || 0;
  const rate = savedEnquiryRate(starts, saved);
  const sources = useMemo(() => utmBreakdown(events), [events]);
  const selected = enquiries.find((row) => row.id === selectedId) || null;

  async function handleEnquirySave(event: FormEvent) {
    event.preventDefault();
    if (!selected) return;
    setSaveStatus(null);
    const updateError = await updateSfEnquiry(selected.id, {
      status: draft.status,
      owner: draft.owner,
      next_action: draft.next_action,
      follow_up_date: draft.follow_up_date || null,
    });
    if (updateError) {
      setSaveStatus(updateError.message);
      return;
    }
    setSaveStatus('Saved.');
    await loadBoard();
  }

  return (
    <div className="flex-1 p-6 overflow-auto flex flex-col gap-6">
      <header className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Shafeeqah portfolio</h1>
          <p className="mt-1 text-sm text-slate-400 max-w-3xl">
            Enquiry queue and usage events for the public site at{' '}
            <a className="text-cyan-400 hover:text-cyan-300" href={SF_PORTFOLIO_URL} target="_blank" rel="noreferrer">
              shafeeqahfrancis-gif.github.io/portfolio
            </a>
            . Ordinary visitors cannot read these rows.
          </p>
        </div>
        {user ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg"
          >
            <LogOut size={14} />
            Sign out
          </button>
        ) : null}
      </header>

      <aside className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-100">
        <p className="font-semibold text-white mb-1">How this data is handled</p>
        <p>{privacyCopy}</p>
      </aside>

      {!user && !authLoading ? (
        <section className="rounded-2xl border border-white/10 bg-black/30 p-5 max-w-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock size={16} /> Sign in to open the queue
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Magic link for authorised Shafeeqah site admins only. This is Supabase Auth, not the public VIP localStorage flag.
          </p>
          <form onSubmit={handleMagicLink} className="mt-4 flex flex-col sm:flex-row gap-2">
            <label className="sr-only" htmlFor="sf-admin-email">Email</label>
            <input
              id="sf-admin-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@email"
              className="flex-1 rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
            />
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-black disabled:opacity-60"
            >
              <Mail size={14} />
              {sending ? 'Sending…' : 'Send link'}
            </button>
          </form>
          {linkStatus ? <p className="mt-3 text-sm text-slate-300">{linkStatus}</p> : null}
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            Redirect URL used: <span className="text-slate-300 break-all">{redirectUrl}</span>
            . Production must allow <span className="text-slate-300">{SF_ADMIN_REDIRECT_URL}</span> in Supabase Auth. Do not
            remove Exchange-Line redirect URLs. Signing out here also ends other Supabase sessions on this GitHub Pages
            origin.
          </p>
        </section>
      ) : null}

      {user && !isAdmin && !authLoading ? (
        <section className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-200">
          <p className="font-semibold text-white flex items-center gap-2">
            <Shield size={16} /> Signed in, but not a Shafeeqah site admin
          </p>
          <p className="mt-2">
            {user.email} is authenticated. Access to sf_enquiries and sf_events requires a matching row in
            public.sf_site_admins (site_id shafeeqah-portfolio, user_id = auth.uid()). Exchange-Line internal roles are not
            used here.
          </p>
          {membershipError ? <p className="mt-2">{membershipError}</p> : null}
        </section>
      ) : null}

      {isAdmin ? (
        <>
          <section className="flex flex-col lg:flex-row gap-3 lg:items-end">
            <label className="text-sm text-slate-400">
              From
              <input
                type="date"
                value={range.from}
                onChange={(event) => setRange((current) => ({ ...current, from: event.target.value }))}
                className="mt-1 block rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="text-sm text-slate-400">
              To
              <input
                type="date"
                value={range.to}
                onChange={(event) => setRange((current) => ({ ...current, to: event.target.value }))}
                className="mt-1 block rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-300 pb-2">
              <input
                type="checkbox"
                checked={includeSynthetic}
                onChange={(event) => setIncludeSynthetic(event.target.checked)}
              />
              Include synthetic test events
            </label>
            <button
              type="button"
              onClick={loadBoard}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg w-fit"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </section>

          {error ? (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Unable to load Shafeeqah data</p>
                <p className="text-sm mt-1">{error}</p>
                <p className="text-sm mt-2 text-red-200/80">
                  Do not grant anonymous SELECT on sf_enquiries or other personal-data tables.
                </p>
              </div>
            </div>
          ) : null}

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <BarChart3 size={14} /> Usage events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {EVENT_METRICS.map((metric) => (
                <article key={metric.name} className="bg-surface-elevated border border-white/5 p-4 rounded-xl">
                  <p className="text-xs uppercase tracking-wide text-slate-500">{metric.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{counts[metric.name] ?? (loading ? '…' : 0)}</p>
                  <p className="text-xs text-slate-500 mt-2">{metric.note}</p>
                </article>
              ))}
              <article className="bg-surface-elevated border border-white/5 p-4 rounded-xl">
                <p className="text-xs uppercase tracking-wide text-slate-500">Saved-enquiry rate</p>
                <p className="text-2xl font-bold text-cyan-400 mt-1">{formatPct(rate)}</p>
                <p className="text-xs text-slate-500 mt-2">
                  enquiry_saved ÷ enquiry_start events in this date range
                  {includeSynthetic ? '' : ', excluding synthetic'}. Not a people conversion rate.
                </p>
              </article>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Default filter is is_synthetic = false so tests do not contaminate production metrics.
            </p>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="bg-surface-elevated border border-white/5 rounded-2xl overflow-hidden">
              <h3 className="px-4 py-3 text-sm font-semibold text-white border-b border-white/5">
                Source / medium / campaign (event rows loaded)
              </h3>
              <div className="overflow-auto max-h-64">
                <table className="w-full text-left text-sm">
                  <thead className="text-slate-500">
                    <tr>
                      <th className="px-4 py-2 font-medium">Source / medium / campaign</th>
                      <th className="px-4 py-2 font-medium">Events</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {sources.length === 0 ? (
                      <tr>
                        <td className="px-4 py-6 text-slate-500" colSpan={2}>
                          No UTM values in the loaded events.
                        </td>
                      </tr>
                    ) : (
                      sources.map((row) => (
                        <tr key={row.label}>
                          <td className="px-4 py-2 text-slate-300">{row.label}</td>
                          <td className="px-4 py-2 text-white">{row.count}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-surface-elevated border border-white/5 rounded-2xl overflow-hidden">
              <h3 className="px-4 py-3 text-sm font-semibold text-white border-b border-white/5">Recent events</h3>
              <div className="overflow-auto max-h-64">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-500">
                    <tr>
                      <th className="px-4 py-2">When</th>
                      <th className="px-4 py-2">Event</th>
                      <th className="px-4 py-2">Path / resource</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {events.slice(0, 25).map((row) => (
                      <tr key={row.id}>
                        <td className="px-4 py-2 text-slate-400 whitespace-nowrap">{formatWhen(row.created_at)}</td>
                        <td className="px-4 py-2 text-white">{row.event_name}</td>
                        <td className="px-4 py-2 text-slate-400 truncate max-w-[220px]">
                          {row.path || row.page_id || '—'}
                          {row.resource_key ? ` · ${row.resource_key}` : ''}
                          {row.is_synthetic ? ' · synthetic' : ''}
                        </td>
                      </tr>
                    ))}
                    {events.length === 0 ? (
                      <tr>
                        <td className="px-4 py-6 text-slate-500" colSpan={3}>
                          No events in this range.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <ClipboardList size={14} /> Enquiry queue
            </h2>
            <p className="text-xs text-slate-500 mb-3">
              Status, owner, next action and follow-up date can be updated by a signed-in sf admin. A saved enquiry is not a
              paid engagement.
            </p>
            <div className="grid gap-4 xl:grid-cols-[1.4fr_.9fr]">
              <div className="bg-surface-elevated border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-auto max-h-[28rem]">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-black/40 text-slate-400 sticky top-0">
                      <tr>
                        <th className="px-4 py-3">Received</th>
                        <th className="px-4 py-3">Contact</th>
                        <th className="px-4 py-3">Path</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Follow-up</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {enquiries.map((row) => (
                        <tr
                          key={row.id}
                          className={`cursor-pointer hover:bg-white/[0.03] ${selectedId === row.id ? 'bg-cyan-500/10' : ''}`}
                          onClick={() => setSelectedId(row.id)}
                        >
                          <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{formatWhen(row.created_at)}</td>
                          <td className="px-4 py-3">
                            <div className="text-white">{row.contact_name}</div>
                            <div className="text-xs text-slate-500">{row.email}</div>
                          </td>
                          <td className="px-4 py-3 text-slate-300">
                            {row.path}
                            {row.service || row.role ? ` · ${row.service || row.role}` : ''}
                          </td>
                          <td className="px-4 py-3 text-cyan-300">{row.status}</td>
                          <td className="px-4 py-3 text-slate-400">{row.follow_up_date || '—'}</td>
                        </tr>
                      ))}
                      {enquiries.length === 0 ? (
                        <tr>
                          <td className="px-4 py-8 text-slate-500" colSpan={5}>
                            No enquiries in this range{includeSynthetic ? '' : ' (synthetic excluded)'}.
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </div>

              <form onSubmit={handleEnquirySave} className="bg-surface-elevated border border-white/5 rounded-2xl p-4 space-y-3">
                {selected ? (
                  <>
                    <p className="text-xs text-slate-500">Reference {selected.reference}</p>
                    <h3 className="text-white font-semibold">{selected.contact_name}</h3>
                    <p className="text-sm text-slate-400">{selected.email}{selected.phone ? ` · ${selected.phone}` : ''}</p>
                    <p className="text-sm text-slate-300 whitespace-pre-wrap">{selected.description}</p>
                    <label className="block text-xs text-slate-500">
                      Status
                      <select
                        value={draft.status}
                        onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}
                        className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
                      >
                        {ENQUIRY_STATUSES.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                        {ENQUIRY_STATUSES.includes(draft.status as (typeof ENQUIRY_STATUSES)[number]) ? null : (
                          <option value={draft.status}>{draft.status}</option>
                        )}
                      </select>
                    </label>
                    <label className="block text-xs text-slate-500">
                      Owner
                      <input
                        value={draft.owner}
                        onChange={(event) => setDraft((current) => ({ ...current, owner: event.target.value }))}
                        className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
                      />
                    </label>
                    <label className="block text-xs text-slate-500">
                      Next action
                      <input
                        value={draft.next_action}
                        onChange={(event) => setDraft((current) => ({ ...current, next_action: event.target.value }))}
                        className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
                      />
                    </label>
                    <label className="block text-xs text-slate-500">
                      Follow-up date
                      <input
                        type="date"
                        value={draft.follow_up_date}
                        onChange={(event) => setDraft((current) => ({ ...current, follow_up_date: event.target.value }))}
                        className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white"
                      />
                    </label>
                    <button type="submit" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-black">
                      Save follow-up
                    </button>
                    {saveStatus ? <p className="text-sm text-slate-300">{saveStatus}</p> : null}
                  </>
                ) : (
                  <p className="text-sm text-slate-500">Select an enquiry to set owner, next action and follow-up date.</p>
                )}
              </form>
            </div>
          </section>

          <p className="text-xs text-slate-500">
            Public collection:{' '}
            <a className="text-cyan-400" href={SF_CASE_STUDIES_URL} target="_blank" rel="noreferrer">
              case studies <ExternalLink className="inline" size={10} />
            </a>
          </p>
        </>
      ) : null}
    </div>
  );
}
