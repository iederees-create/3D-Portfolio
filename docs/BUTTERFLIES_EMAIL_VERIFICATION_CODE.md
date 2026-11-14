# Butterflies Educare — email verification codes

The parent portal supports email code entry for new-account confirmation, re-sending the signup email, and returning to code entry later from the sign-in form. The Supabase **hosted** "Confirm sign up" email template must also send the actual code, otherwise Supabase will keep emailing its existing confirmation link.

## Hosted project configuration (required)

Project: `sijvvbozaufzpjirijhb` (portfolio)

1. Sign in to [Supabase Dashboard](https://supabase.com/dashboard/project/sijvvbozaufzpjirijhb).
2. Go to **Authentication → Email Templates → Confirm sign up**.
3. Set the subject to: **Your Butterflies Educare verification code**.
4. Replace the template body with the following HTML, then save:

```html
<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;padding:30px 22px;color:#234b3e">
  <h2 style="margin:0 0 12px;font-size:28px">Welcome to Butterflies Educare</h2>
  <p>Thank you for creating your parent account.</p>
  <p>Enter this verification code on the Butterflies Educare website to confirm your email address:</p>
  <p style="font-size:36px;letter-spacing:8px;font-weight:bold;background:#edf6ec;border-radius:12px;padding:18px;text-align:center">{{ .Token }}</p>
  <p>Return to the website and select <strong>Verify my email</strong>.</p>
  <p>If you didn't create an account, you can safely ignore this email. Never share the code with anyone.</p>
  <p style="font-size:12px;color:#718578;margin-top:24px">Butterflies Educare · Play, Learn, Grow, Together</p>
</div>
```

The exact Go-template expression `{{ .Token }}` is mandatory. Do not use plain text like "123456" in the actual template. Do not modify invitation, password-reset, or email-change templates.

5. Confirm `Authentication → Providers → Email` has confirmation enabled. Do **not** disable email confirmation.
6. In `Authentication → URL Configuration`, ensure the Butterflies Educare parent page is in the redirect allow list and the site URL does not point to an unrelated application.
7. Test with a **new fictional/test parent** email that you own: create account → receive code → enter code on parent page → confirm account → sign in → check parent profile. Test a wrong code and resend flow. Test from a private/incognito browser to ensure no pre-existing session is masking failures.
8. Monitor Supabase email delivery and signup rate limits. For high public usage, configure a properly verified SMTP sender, preferably on a school-controlled domain.

## Implementation status

- Code entry UI, resend and `supabase.auth.verifyOtp({ email, token, type: 'signup' })`: implemented in `public/butterflies-educare/network.js`.
- Entry point from login screen: `public/butterflies-educare/parent.html`.
- Supabase Auth mail template update: **manual hosted-dashboard action required**. The connected Supabase tools can inspect project data and schema but cannot edit hosted authentication email templates.
- Full email-delivery acceptance test: **pending** until template change and use of a test inbox.

Supabase reference: https://supabase.com/docs/guides/auth/auth-email-templates

**Note:** This Supabase project also serves other features; changing a project-wide email confirmation template can affect any other app using the same Supabase Auth project. Verify those apps can handle an email-code confirmation before replacing links universally. If not, use a branded template containing both `{{ .Token }}` and a `{{ .ConfirmationURL }}` fallback during the transition, or isolate school Auth in a dedicated project.
