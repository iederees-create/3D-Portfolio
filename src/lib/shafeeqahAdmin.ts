import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { ADMIN_DASHBOARD_URL } from './site';

export const SF_SITE_ID = 'shafeeqah-portfolio';

/** Production magic-link redirect. Add this to Supabase Auth allow-list; do not remove Exchange-Line URLs. */
export const SF_ADMIN_REDIRECT_URL = ADMIN_DASHBOARD_URL;

export const SF_PORTFOLIO_URL = 'https://shafeeqahfrancis-gif.github.io/portfolio/';
export const SF_CASE_STUDIES_URL = 'https://shafeeqahfrancis-gif.github.io/portfolio/case-studies/';

export const ENQUIRY_STATUSES = ['new', 'in_review', 'waiting', 'closed', 'spam'] as const;
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export const EVENT_METRICS = [
  {
    name: 'page_view',
    label: 'Page views',
    note: 'Event count. Not unique visitors.',
  },
  {
    name: 'case_study_view',
    label: 'Case-study views',
    note: 'Event count for case_study_view. Not unique readers.',
  },
  {
    name: 'case_study_download',
    label: 'Case-study downloads',
    note: 'Download-click events. Not confirmed file receipts.',
  },
  {
    name: 'linkedin_click',
    label: 'LinkedIn clicks',
    note: 'Outbound click events.',
  },
  {
    name: 'whatsapp_click',
    label: 'WhatsApp clicks',
    note: 'Click events only. Not delivered or replied messages.',
  },
  {
    name: 'enquiry_start',
    label: 'Enquiry starts',
    note: 'enquiry_start events (form/page). Not unique people.',
  },
  {
    name: 'enquiry_saved',
    label: 'Saved enquiries',
    note: 'enquiry_saved events after a successful store.',
  },
  {
    name: 'affiliate_outbound',
    label: 'Affiliate outbound clicks',
    note: 'Outbound click events. Not commissions or sales.',
  },
] as const;

export type SfEventRow = {
  id: string;
  created_at: string;
  site_id: string;
  event_name: string;
  path: string | null;
  page_id: string | null;
  resource_key: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  is_synthetic: boolean;
};

export type SfEnquiryRow = {
  id: string;
  created_at: string;
  updated_at: string;
  site_id: string;
  reference: string;
  path: string;
  service: string | null;
  role: string | null;
  description: string;
  timing: string | null;
  budget: string | null;
  project_url: string | null;
  contact_name: string;
  email: string;
  phone: string | null;
  preferred_contact: string | null;
  source_path: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  is_synthetic: boolean;
  status: EnquiryStatus | string;
  owner: string | null;
  next_action: string | null;
  follow_up_date: string | null;
};

export type DateRange = { from: string; to: string };

export function defaultDateRange(): DateRange {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 29);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  return { from: iso(from), to: iso(to) };
}

export function rangeBounds(range: DateRange) {
  return {
    fromIso: `${range.from}T00:00:00.000`,
    toIso: `${range.to}T23:59:59.999`,
  };
}

export function adminDashboardRedirectUrl() {
  if (typeof window === 'undefined') return SF_ADMIN_REDIRECT_URL;
  const origin = window.location.origin;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${origin}${base}/admin-dashboard`;
}

export async function sendAdminMagicLink(email: string) {
  return supabase.auth.signInWithOtp({
    email: email.trim().toLowerCase(),
    options: {
      emailRedirectTo: adminDashboardRedirectUrl(),
      shouldCreateUser: false,
    },
  });
}

export async function loadSfAdminMembership(user: User | null) {
  if (!user) return { isAdmin: false, error: null as string | null };
  const { data, error } = await supabase
    .from('sf_site_admins')
    .select('site_id')
    .eq('user_id', user.id)
    .eq('site_id', SF_SITE_ID)
    .maybeSingle();

  if (error) {
    if (error.code === 'PGRST205' || /schema cache|could not find the table/i.test(error.message)) {
      return {
        isAdmin: false,
        error: 'Migration 009 is not applied in this Supabase project yet. Tables public.sf_site_admins, sf_events and sf_enquiries are missing.',
      };
    }
    if (error.code === '42501' || /permission denied|row-level security/i.test(error.message)) {
      return { isAdmin: false, error: null };
    }
    return { isAdmin: false, error: error.message };
  }

  return { isAdmin: Boolean(data), error: null };
}

export async function currentAdminSession() {
  const { data } = await supabase.auth.getSession();
  const session: Session | null = data.session ?? null;
  const user = session?.user ?? null;
  const membership = await loadSfAdminMembership(user);
  return { session, user, ...membership };
}

export async function countSfEvents(
  eventName: string,
  range: DateRange,
  includeSynthetic: boolean,
) {
  const { fromIso, toIso } = rangeBounds(range);
  let query = supabase
    .from('sf_events')
    .select('id', { count: 'exact', head: true })
    .eq('event_name', eventName)
    .eq('site_id', SF_SITE_ID)
    .gte('created_at', fromIso)
    .lte('created_at', toIso);
  if (!includeSynthetic) query = query.eq('is_synthetic', false);
  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

export async function listSfEvents(range: DateRange, includeSynthetic: boolean, limit = 400) {
  const { fromIso, toIso } = rangeBounds(range);
  let query = supabase
    .from('sf_events')
    .select('id,created_at,site_id,event_name,path,page_id,resource_key,utm_source,utm_medium,utm_campaign,is_synthetic')
    .eq('site_id', SF_SITE_ID)
    .gte('created_at', fromIso)
    .lte('created_at', toIso)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (!includeSynthetic) query = query.eq('is_synthetic', false);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as SfEventRow[];
}

export async function listSfEnquiries(range: DateRange, includeSynthetic: boolean, limit = 200) {
  const { fromIso, toIso } = rangeBounds(range);
  let query = supabase
    .from('sf_enquiries')
    .select('*')
    .eq('site_id', SF_SITE_ID)
    .gte('created_at', fromIso)
    .lte('created_at', toIso)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (!includeSynthetic) query = query.eq('is_synthetic', false);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as SfEnquiryRow[];
}

export async function updateSfEnquiry(
  id: string,
  patch: {
    status: string;
    owner: string;
    next_action: string;
    follow_up_date: string | null;
  },
) {
  const { error } = await supabase
    .from('sf_enquiries')
    .update({
      status: patch.status,
      owner: patch.owner.trim() || null,
      next_action: patch.next_action.trim() || null,
      follow_up_date: patch.follow_up_date || null,
    })
    .eq('id', id)
    .eq('site_id', SF_SITE_ID);
  return error;
}

export function utmBreakdown(events: SfEventRow[]) {
  const counts = new Map<string, number>();
  for (const event of events) {
    const source = event.utm_source || '(none)';
    const medium = event.utm_medium || '(none)';
    const campaign = event.utm_campaign || '(none)';
    const key = `${source} / ${medium} / ${campaign}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);
}

export function savedEnquiryRate(starts: number, saved: number) {
  if (starts <= 0) return null;
  return saved / starts;
}
