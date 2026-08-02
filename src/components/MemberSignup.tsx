import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface MemberSignupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (memberId: string, email: string, name: string) => void;
}

export default function MemberSignup({ isOpen, onClose, onSuccess }: MemberSignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    setError('');

    try {
      const { data, error: insertError } = await supabase
        .from('members')
        .insert([{ name, email, role }])
        .select()
        .single();

      if (insertError) {
        if (insertError.code === '23505') {
          // Unique violation (email exists)
          // For a simple gamified profiling setup, we can just fetch the existing member id
          const { data: existingData } = await supabase
            .from('members')
            .select('id')
            .eq('email', email)
            .single();
          
          if (existingData) {
            onSuccess(existingData.id, email, name);
            return;
          }
        }
        throw insertError;
      }

      if (data) {
        onSuccess(data.id, email, name);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-cyan-900/20"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400">
                  <Sparkles size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Cognitive Assessment</h2>
                <p className="text-sm text-slate-400">
                  Take the interactive test to uncover your innate cognitive profile. Results will be emailed to you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-xs font-medium text-slate-400 mb-1">Primary Role</label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all appearance-none"
                  >
                    <option value="" disabled className="bg-slate-900 text-white">Select your role...</option>
                    <option value="founder" className="bg-slate-900 text-white">Founder / CEO</option>
                    <option value="developer" className="bg-slate-900 text-white">Developer</option>
                    <option value="designer" className="bg-slate-900 text-white">Designer</option>
                    <option value="marketer" className="bg-slate-900 text-white">Marketer</option>
                    <option value="other" className="bg-slate-900 text-white">Other</option>
                  </select>
                </div>

                {error && <p className="text-xs text-red-400 text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 rounded-xl bg-cyan-500 py-3 text-sm font-bold text-slate-900 hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Starting...' : 'Start Assessment'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
