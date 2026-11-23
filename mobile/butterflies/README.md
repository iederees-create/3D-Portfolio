# Butterflies Educare native app — 0.2.0 test

Android uses native Kotlin widgets, not WebView or a browser shell. A Kotlin Multiplatform `shared` module contains shared validation and app configuration; its JVM target is used by Android and iOS targets are configured on macOS. There is no iPhone application binary yet.

## Build

JDK 17, Android SDK platform 35/build tools 35.0.0, Gradle 8.11.1:

```
cd mobile/butterflies
gradle :shared:jvmTest :androidApp:assembleDebug :androidApp:lintDebug
```

GitHub Actions builds and installs the APK on an emulator, runs native-screen and encrypted-storage tests, and uploads a versioned build artifact only after passing checks. GitHub prerelease publishing is attempted separately and may be unavailable when integration permissions prevent it. Tested APKs can also be published in the school website downloads directory. The app is debug-signed for testing; the private test key is retained in Actions cache, never in source or APK assets. Cache eviction can change that test certificate and require reinstalling a test build. Production release signing and store distribution are separate work.

## Shared accounts and data

Uses the existing school Supabase project and public publishable key (not a privileged/service key). Website accounts work directly via native email/password sign-in. Sessions are encrypted with an Android Keystore AES-GCM key. Passwords are not stored. Token refresh happens before API calls. School database RLS remains the access-control boundary; the app never grants staff access.

Native screens: welcome, sign-in/signup/reset request, contact profile, child profiles, published classes and child class requests, published events/attendance, announcements, private messages/replies, request/application/proposal status, detailed provider proposals, and permission-gated school counts/fundraiser preference.

**First-version boundaries:** full 2027 application entry, printable/legal documents and advanced school management still open the existing school website with an explicit label. The app has no push notifications, offline database, payments or App Store listing. Live email confirmation opens the school site; return to the app to sign in. No real-account enrolment or principal review is claimed as device-verified.

## Verification

Shared tests cover email normalisation, invalid names/addresses, count boundaries, consent and rejecting external/traversal paths. Android instrumentation verifies native home/sign-in UI (no WebView) and encrypted session storage. No live accounts or learner records are created by tests. Physical phone acceptance of login, session restore, profile changes and school workflows is still required before wider family rollout.

## Mobile presentation

Branded Android launch resources support legacy phones and the Android 12+ splash API. Newer phones animate the butterfly and fade into the app without an artificial startup delay. A fixed five-tab navigation bar stays outside the scroll area. Home uses family shortcuts; Account holds profile/settings tasks. Native controls respect system text sizing, and animation follows the device setting. Public signed-out previews are rendered by instrumentation tests without using any learner records.
