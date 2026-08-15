import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { RefreshCw, Users, Mail, Activity, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'deriv' | 'members' | 'analytics'>('deriv');
  const [derivLeads, setDerivLeads] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [pageViews, setPageViews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch Deriv Subscribers
      const { data: derivData, error: derivError } = await supabase
        .from('deriv_subscribers')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (derivError) throw new Error(`Deriv Error: ${derivError.message}`);
      setDerivLeads(derivData || []);

      // Fetch NextGenWebs VIP Members
      const { data: membersData, error: membersError } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (membersError) throw new Error(`Members Error: ${membersError.message}`);
      setMembers(membersData || []);

      // Fetch Page Views
      const { data: viewsData, error: viewsError } = await supabase
        .from('page_views')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (viewsError) throw new Error(`Analytics Error: ${viewsError.message}`);
      setPageViews(viewsData || []);

    } catch (err: any) {
      setError(err.message || 'Failed to fetch data. Check your RLS policies in Supabase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Data Command Center</h1>
            <p className="text-slate-400">Manage all your Supabase data across projects in one place.</p>
          </div>
          <button 
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors w-fit"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh Data
          </button>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Error loading data</p>
              <p className="text-sm">{error}</p>
              <p className="text-sm mt-2">Note: You may need to enable SELECT permissions (Row Level Security) for these tables in Supabase so the dashboard can read them.</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => setActiveTab('deriv')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'deriv' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-surface-elevated text-slate-400 hover:text-white'}`}
          >
            <Mail size={16} />
            Deriv Affiliate Leads ({derivLeads.length})
          </button>
          <button 
            onClick={() => setActiveTab('members')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'members' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-surface-elevated text-slate-400 hover:text-white'}`}
          >
            <Users size={16} />
            Portfolio VIP Members ({members.length})
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors ${activeTab === 'analytics' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-surface-elevated text-slate-400 hover:text-white'}`}
          >
            <Activity size={16} />
            Recent Analytics ({pageViews.length})
          </button>
        </div>

        {/* Data Tables */}
        <div className="bg-surface-elevated border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/40 border-b border-white/5 text-slate-400">
                <tr>
                  {activeTab === 'deriv' && (
                    <>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold">Joined At</th>
                      <th className="px-6 py-4 font-semibold text-right">Source Project</th>
                    </>
                  )}
                  {activeTab === 'members' && (
                    <>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold">Joined At</th>
                      <th className="px-6 py-4 font-semibold">Assessment Score</th>
                      <th className="px-6 py-4 font-semibold text-right">Source Project</th>
                    </>
                  )}
                  {activeTab === 'analytics' && (
                    <>
                      <th className="px-6 py-4 font-semibold">Path</th>
                      <th className="px-6 py-4 font-semibold">Timestamp</th>
                      <th className="px-6 py-4 font-semibold">Session ID</th>
                      <th className="px-6 py-4 font-semibold text-right">Source Project</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      <RefreshCw size={24} className="animate-spin mx-auto mb-3" />
                      Loading your data...
                    </td>
                  </tr>
                ) : (
                  <>
                    {/* Deriv Leads Table */}
                    {activeTab === 'deriv' && derivLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{lead.email}</td>
                        <td className="px-6 py-4 text-slate-400">{new Date(lead.created_at).toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400">
                            Deriv Affiliate Site
                          </span>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'deriv' && derivLeads.length === 0 && (
                      <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">No leads found yet.</td></tr>
                    )}

                    {/* Members Table */}
                    {activeTab === 'members' && members.map((member) => (
                      <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{member.email}</td>
                        <td className="px-6 py-4 text-slate-400">{new Date(member.created_at).toLocaleString()}</td>
                        <td className="px-6 py-4 text-slate-300">{member.score ? `${member.score}%` : 'N/A'}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                            3D Portfolio
                          </span>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'members' && members.length === 0 && (
                      <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No VIP members found yet.</td></tr>
                    )}

                    {/* Analytics Table */}
                    {activeTab === 'analytics' && pageViews.map((view) => (
                      <tr key={view.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{view.path}</td>
                        <td className="px-6 py-4 text-slate-400">{new Date(view.created_at).toLocaleString()}</td>
                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">{view.session_id}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400">
                            3D Portfolio
                          </span>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'analytics' && pageViews.length === 0 && (
                      <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500">No analytics data found yet.</td></tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
