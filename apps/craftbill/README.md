# CraftBill public beta — Angular 22
GitHub Pages URL: https://iederees-create.github.io/3D-Portfolio/craftbill/

This is a real Angular 22 single-page app: standalone components, Signals, computed state, RxJS debounced filtering, editable invoices and quotes, customers, status tracking, printing and CSV export.

**Public beta limitations:** The visitor demo uses browser localStorage. No accounts or cloud backup are active until a **separate dedicated** Supabase project is created and configured. Billing is intentionally disabled in demo mode. Do not claim NOWPayments production checkout has been tested.

For production, configure only the public Supabase project URL and publishable key in src/settings.ts, apply the full CraftBill schema in the private project's SQL editor, and deploy the private create-checkout and NOWPayments webhook Edge Functions from the original complete CraftBill starter package. Use a sandbox merchant account before production payment collection. Never commit service role, merchant API or IPN secrets.

This app is built by GitHub Actions from apps/craftbill and copied into the GitHub Pages dist/craftbill folder. Node 24 is required by Angular 22. The root portfolio site is not converted to Angular.

For development: npm install && npm run build.

GitHub Pages hosts only the educational portfolio demonstration. The production commercial SaaS must be deployed to Render or another host permitted for business use. GitHub Pages is not for operating commercial SaaS. Browser-side Supabase access is intentionally disabled when served on github.io.
