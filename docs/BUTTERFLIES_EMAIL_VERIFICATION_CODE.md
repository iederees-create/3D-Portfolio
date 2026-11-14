# Butterflies Educare — current email confirmation method

> **Update, 14 November 2026:** The earlier email-code proposal was not activated. Butterflies Educare uses standard Supabase email confirmation links. This document supersedes the earlier code instructions despite its historical filename.

## Parent signup journey

1. Open https://iederees-create.github.io/3D-Portfolio/butterflies-educare/parent.html and choose **Create account**.
2. Enter name, email address, a password and the required account consent, then select **Create account**.
3. The parent sees a **Check your email** screen with their email address and three instructions.
4. Open the confirmation email and select the **Confirm email** link.
5. Return to the parent portal and sign in using the same email and password.
6. If no email arrives, check Spam/Junk and select **Resend confirmation email**. If the address was mistyped, return to the account form and use the correct address.

No verification-code entry is presented or required.

## Technical implementation

- Supabase Auth signup uses `client.auth.signUp({ email, password, options: { emailRedirectTo, data } })`.
- On signup without an active session, the app shows the email-link confirmation screen.
- The `client.auth.resend({ type: 'signup', email, options: { emailRedirectTo } })` button requests a fresh link.
- If a user tries to sign in before confirming their email, the confirmation screen is shown again.
- Keep Supabase email confirmation **enabled**.
- **Do not** change the shared Supabase project's confirmation email template to send a code; the same Auth project serves other applications.
- Check the Supabase Authentication URL Configuration redirect allow list for the parent URL:
  `https://iederees-create.github.io/3D-Portfolio/butterflies-educare/parent.html`.
- Test with a new test mailbox that is controlled by the school or developer. Verify account creation, receipt of the link, confirmation, sign-in, link resend, and the invalid/wrong-email paths. Do not enter real children's details into test applications.

**Project:** `sijvvbozaufzpjirijhb`.

Supabase reference: https://supabase.com/docs/guides/auth/auth-email-templates
