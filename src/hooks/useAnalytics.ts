import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Generate a random session ID that persists for this browser tab
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('nextgen_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('nextgen_session_id', sessionId);
  }
  return sessionId;
};

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    const sessionId = getSessionId();

    // Log the page view immediately
    const logPageView = async () => {
      try {
        await supabase.from('page_views').insert([{
          session_id: sessionId,
          path: location.pathname,
          user_agent: navigator.userAgent,
          time_spent_seconds: 0 // Will be updated if we wanted to on unmount, but for simple tracking, this is okay
        }]);
      } catch (err) {
        console.error('Analytics error:', err);
      }
    };

    logPageView();

    return () => {
      // In a full implementation, we could update the time_spent_seconds on unmount using a beacon or supabase update
      // Optional: update the record with time spent
    };
  }, [location.pathname]);
}
