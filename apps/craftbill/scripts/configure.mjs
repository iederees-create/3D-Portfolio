import fs from 'node:fs';
// Render build injects ONLY publicly safe Supabase settings into Angular.
const supabaseUrl=process.env.SUPABASE_URL||'';
const supabasePublishableKey=process.env.SUPABASE_PUBLISHABLE_KEY||'';
if(supabasePublishableKey.startsWith('sb_secret_')||/service.role/i.test(supabasePublishableKey))throw new Error('Never expose a Supabase secret key to Angular.');
if(supabaseUrl&&!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(supabaseUrl))throw new Error('Invalid Supabase project URL.');
fs.writeFileSync('src/settings.ts','// Generated public browser config. NO server secrets.\nexport const settings='+JSON.stringify({supabaseUrl,supabasePublishableKey,proPriceUsd:9})+';\n');
