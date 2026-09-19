import { useEffect, useMemo, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Activity, AlertCircle, Clock, Database, RefreshCw, Shield, Users, ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { currentAdminSession } from '../lib/shafeeqahAdmin';
import ShafeeqahPortfolioPanel from './admin/ShafeeqahPortfolioPanel';

const TABLES = [
  'page_views',
  'deriv_subscribers',
  'members',
  'admin_lead_overview',
  'campaign_leads',
  'campaigns',
  'customer_cases',
  'email_events',
  'inbound_leads',
  'installations',
  'lead_activities',
  'lead_requirements',
  'leads',
  'onboarding_items',
  'pipeline_summary',
  'profiles',
  'quote_workflows',
  'quotes',
  'sales_tasks',
  'scraped_leads',
  'submission_rate_limits',
  'support_requests',
  'web_events',
];

const SF_PANEL_VIEW = 'shafeeqah';

export default function AdminDashboard() {
  const [activeTable, setActiveTable] = useState<string>(SF_PANEL_VIEW);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tableCounts, setTableCounts] = useState<Record<string, number>>({});
  const [lastViewed, setLastViewed] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem('adminDashboardLastViewed');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [user, setUser] = useState<User | null>(null);
  const [isSfAdmin, setIsSfAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [membershipError, setMembershipError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const hydrate = async () => {
      setAuthLoading(true);
      const result = await currentAdminSession();
      if (cancelled) return;
      setUser(result.user);
      setIsSfAdmin(result.isAdmin);
      setMembershipError(result.error);
      setAuthLoading(false);
    };
    hydrate();
    const { data } = supabase.auth.onAuthStateChange(() => {
      hydrate();
    });
    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchAllCounts = async () => {
      const newCounts: Record<string, number> = {};
      await Promise.all(
        TABLES.map(async (table) => {
          try {
            const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
            newCounts[table] = count || 0;
          } catch {
            newCounts[table] = 0;
          }
        }),
      );
      setTableCounts(newCounts);
    };
    fetchAllCounts();
  }, []);

  useEffect(() => {
    if (activeTable === SF_PANEL_VIEW) return;
    if (tableCounts[activeTable] !== undefined) {
      setLastViewed((prev) => {
        const next = { ...prev, [activeTable]: tableCounts[activeTable] };
        localStorage.setItem('adminDashboardLastViewed', JSON.stringify(next));
        return next;
      });
    }
  }, [activeTable, tableCounts]);

  const fetchData = async (tableName: string) => {
    setLoading(true);
    setError(null);
    try {
      let { data, error: fetchError } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false, nullsFirst: false })
        .limit(100);

      if (fetchError && fetchError.code === '42703') {
        const fallbackRes = await supabase.from(tableName).select('*').limit(100);
        data = fallbackRes.data;
        fetchError = fallbackRes.error;
      }

      if (fetchError) throw fetchError;
      setTableData(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data.');
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTable === SF_PANEL_VIEW) {
      setTableData([]);
      setError(null);
      setLoading(false);
      return;
    }
    fetchData(activeTable);
  }, [activeTable]);

  const columns = useMemo(() => {
    if (tableData.length === 0) return [];
    return Object.keys(tableData[0]);
  }, [tableData]);

  const analyticsMetrics = useMemo(() => {
    if (activeTable !== 'page_views' || tableData.length === 0) return null;

    const totalViews = tableData.length;
    const viewsWithTime = tableData.filter((v) => v.time_spent_seconds && v.time_spent_seconds > 0);
    const avgTime = viewsWithTime.length
      ? Math.round(viewsWithTime.reduce((acc, curr) => acc + curr.time_spent_seconds, 0) / viewsWithTime.length)
      : 0;

    const referrers: Record<string, number> = {};
    tableData.forEach((v) => {
      if (v.referrer) {
        let domain = v.referrer;
        try {
          domain = new URL(v.referrer).hostname;
        } catch {}
        referrers[domain] = (referrers[domain] || 0) + 1;
      }
    });

    let topReferrer = 'Direct / None';
    let topRefC = 0;
    Object.entries(referrers).forEach(([ref, count]) => {
      if (count > topRefC) {
        topReferrer = ref;
        topRefC = count;
      }
    });

    return { totalViews, avgTime, topReferrer };
  }, [activeTable, tableData]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 pt-24 pb-12 flex flex-col md:flex-row">
      <div className="w-full md:w-64 shrink-0 bg-black/40 border-r border-white/5 p-4 md:min-h-[calc(100vh-6rem)] overflow-y-auto">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Shafeeqah</h2>
        <button
          type="button"
          onClick={() => setActiveTable(SF_PANEL_VIEW)}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left mb-4 ${
            activeTable === SF_PANEL_VIEW
              ? 'bg-cyan-500/20 text-cyan-400 font-medium'
              : 'text-slate-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Shield size={14} className="shrink-0" />
          Portfolio queue
        </button>

        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Your Database</h2>
        <nav className="flex flex-col gap-1">
          {TABLES.map((table) => {
            const currentCount = tableCounts[table] || 0;
            const viewedCount = lastViewed[table] || 0;
            const unseen = Math.max(0, currentCount - viewedCount);

            return (
              <button
                key={table}
                onClick={() => setActiveTable(table)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                  activeTable === table
                    ? 'bg-cyan-500/20 text-cyan-400 font-medium'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {table === 'page_views' ? <Activity size={14} className="shrink-0" /> : <Database size={14} className="shrink-0" />}
                  <span className="truncate">{table.replace(/_/g, ' ')}</span>
                </div>
                {unseen > 0 && activeTable !== table && (
                  <span className="bg-cyan-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                    {unseen > 99 ? '99+' : unseen}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {activeTable === SF_PANEL_VIEW ? (
        <ShafeeqahPortfolioPanel
          user={user}
          isAdmin={isSfAdmin}
          authLoading={authLoading}
          membershipError={membershipError}
          onSignedOut={() => {
            setUser(null);
            setIsSfAdmin(false);
          }}
        />
      ) : (
        <div className="flex-1 p-6 overflow-hidden flex flex-col max-h-[calc(100vh-6rem)]">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2 capitalize">
                {activeTable.replace(/_/g, ' ')}
              </h1>
            </div>
            <button
              onClick={() => fetchData(activeTable)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors w-fit"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </header>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 shrink-0">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Access denied</p>
                <p className="text-sm">{error}</p>
                <p className="text-sm mt-2 font-medium">
                  This table is not readable with the current session. If it holds personal data, do not grant anonymous
                  SELECT. Sign in with an authorised role, or leave the table restricted.
                </p>
              </div>
            </div>
          )}

          {activeTable === 'page_views' && !error && analyticsMetrics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 shrink-0">
              <div className="bg-surface-elevated border border-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Users size={16} /> Recent loaded views
                </div>
                <div className="text-2xl font-bold text-white">{analyticsMetrics.totalViews}</div>
                <p className="text-xs text-slate-500 mt-1">Count of loaded page_views rows, not unique visitors.</p>
              </div>
              <div className="bg-surface-elevated border border-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Clock size={16} /> Avg. Time Spent
                </div>
                <div className="text-2xl font-bold text-emerald-400">{analyticsMetrics.avgTime}s</div>
              </div>
              <div className="bg-surface-elevated border border-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <ArrowUpRight size={16} /> Top Referrer
                </div>
                <div className="text-lg font-bold text-cyan-400 truncate">{analyticsMetrics.topReferrer}</div>
              </div>
            </div>
          )}

          <div className="bg-surface-elevated border border-white/5 rounded-2xl overflow-hidden flex-1 flex flex-col min-h-0">
            <div className="overflow-auto flex-1">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-black/40 border-b border-white/5 text-slate-400 sticky top-0 z-10 backdrop-blur-md">
                  <tr>
                    {activeTable === 'page_views' ? (
                      <>
                        <th className="px-6 py-4 font-semibold">Path & Date</th>
                        <th className="px-6 py-4 font-semibold">Time Spent</th>
                        <th className="px-6 py-4 font-semibold">Referrer</th>
                        <th className="px-6 py-4 font-semibold">Device / Screen</th>
                        <th className="px-6 py-4 font-semibold">UTM Source</th>
                      </>
                    ) : (
                      columns.map((col) => (
                        <th key={col} className="px-6 py-4 font-semibold capitalize">
                          {col.replace(/_/g, ' ')}
                        </th>
                      ))
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={10} className="px-6 py-12 text-center text-slate-500">
                        <RefreshCw size={24} className="animate-spin mx-auto mb-3" />
                        Loading table data...
                      </td>
                    </tr>
                  ) : tableData.length === 0 && !error ? (
                    <tr>
                      <td colSpan={10} className="px-6 py-12 text-center text-slate-500">
                        No data found in this table.
                      </td>
                    </tr>
                  ) : activeTable === 'page_views' ? (
                    tableData.map((row) => (
                      <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-3">
                          <div className="font-medium text-white">{row.path}</div>
                          <div className="text-xs text-slate-500">{new Date(row.created_at).toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              row.time_spent_seconds > 30 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                            }`}
                          >
                            {row.time_spent_seconds || 0}s
                          </span>
                        </td>
                        <td className="px-6 py-3 text-slate-400 truncate max-w-[200px]">{row.referrer || 'Direct'}</td>
                        <td className="px-6 py-3 text-slate-400 text-xs">
                          {row.screen_resolution || 'Unknown'}
                          <br />
                          <span className="text-slate-600">{row.browser_language}</span>
                        </td>
                        <td className="px-6 py-3">
                          {row.utm_source ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-500/10 text-purple-400">
                              {row.utm_source}
                            </span>
                          ) : (
                            <span className="text-slate-600">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    tableData.map((row, i) => (
                      <tr key={row.id || i} className="hover:bg-white/[0.02] transition-colors">
                        {columns.map((col) => {
                          const val = row[col];
                          let displayVal = val;
                          if (val === null) displayVal = <span className="text-slate-600 italic">null</span>;
                          else if (typeof val === 'boolean')
                            displayVal = (
                              <span className={`px-2 py-0.5 rounded text-xs ${val ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                {val.toString()}
                              </span>
                            );
                          else if (typeof val === 'object')
                            displayVal = <span className="text-slate-500 text-xs font-mono">{JSON.stringify(val).substring(0, 30)}...</span>;
                          else if (String(val).length > 50) displayVal = String(val).substring(0, 50) + '...';

                          return (
                            <td key={col} className="px-6 py-3 text-slate-300 max-w-[300px] truncate">
                              {displayVal}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
