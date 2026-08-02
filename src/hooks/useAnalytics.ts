import { useEffect, useRef } from 'react';
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
  const pageViewId = useRef<string | null>(null);
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const sessionId = getSessionId();
    startTime.current = Date.now();
    
    // Parse UTM parameters
    const params = new URLSearchParams(location.search);
    const utm_source = params.get('utm_source');
    const utm_medium = params.get('utm_medium');
    const utm_campaign = params.get('utm_campaign');

    // Log the page view immediately
    const logPageView = async () => {
      try {
        const { data, error } = await supabase.from('page_views').insert([{
          session_id: sessionId,
          path: location.pathname,
          user_agent: navigator.userAgent,
          time_spent_seconds: 0,
          referrer: document.referrer || null,
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
          browser_language: navigator.language,
          utm_source,
          utm_medium,
          utm_campaign
        }]).select('id').single();

        if (!error && data) {
          pageViewId.current = data.id;
        }
      } catch (err) {
        console.error('Analytics error:', err);
      }
    };

    logPageView();

    // Cleanup: update time_spent_seconds when component unmounts or path changes
    return () => {
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime.current) / 1000);
      
      if (pageViewId.current && timeSpent > 0) {
        // Use a background update to record time spent
        supabase.from('page_views')
          .update({ time_spent_seconds: timeSpent })
          .eq('id', pageViewId.current)
          .then(); // fire and forget
      }
    };
  }, [location.pathname, location.search]);
}
