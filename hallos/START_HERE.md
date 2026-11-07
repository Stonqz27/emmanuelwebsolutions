> **HallOS V6 FixLoop:** Start with [V6_START_HERE.md](V6_START_HERE.md). This folder contains the latest clean competition edition and the updated FixLoop source/tests.

# HallOS Recovery — November 2, 2026

This is a **repaired SOURCE snapshot** of the user's Base44 export. It is **not yet a verified production deployment**.

## What was repaired

- Replaced the inert, placeholder `db` client in 18 frontend files with the real `@base44/sdk` client.
- Restored the missing `getAccessToken` import and `@base44/vite-plugin` import.
- Reconstructed the two incomplete backend functions (`createIssueReport`, `acknowledgeAnnouncement`).
- Reconstructed the truncated visitation time utility and responsive image component.
- Rebuilt the missing `HallPicker`, `MembershipStatusCard`, `EmergencyContactCard`, `EditHoursDialog`, and `MembershipReviewPanel` components.
- Added a restricted membership review backend endpoint.
- Added an admin-only idempotent demo hall setup endpoint for an empty Base44 database.
- Added `markNotificationRead` backend endpoint and restricted notification updates to authorized server operations.
- Fixed Base44 SDK entity filter argument shapes (query, sort, limit) and array results.
- Fixed targeted announcement notification delivery to match the selected floor.
- Removed the corrupted JavaScript line before `<!doctype html>`.
- Added simple PWA manifest and HallOS SVG favicon (not equivalent to native push notifications).
- Added smoke tests and a `test:smoke` npm command.

## What PASSED locally

- Static parser: all JS, JSX and TS source files have no syntax diagnostics.
- Relative and `@/` import paths: none missing.
- `npm run test:smoke`: 6 passing tests (time utilities, static security checks, schemas, client recovery).

## What is NOT verified

- Full `npm install`, `npm run build`, and browser interactions: package installation timed out in this tool environment. This is an environment/network blocker; it is **not evidence the build succeeds or fails**.
- Production Base44 authentication, actual row-level permissions, and live function invocation (no authenticated Base44 session or linked app here).
- Whether the original Base44 project has the same/latest source as this damaged export.
- Whether GitHub two-way sync or CLI deployment is available on your current Base44 plan.
- Real email, SMS, background schedules, native phone push. These are not implemented.

## SAFEST path back to your existing Base44 project

1. Keep your original live app and original export unchanged.
2. From the app's editor, use the official **GitHub integration** if your account supports two-way sync. Confirm its existing repository and branch first. Do not overwrite the branch blindly.
3. Commit these changes on a new branch and compare with any newer Base44 changes before merging.
4. Alternatively follow Base44's official CLI `login`/`link`/`dev` documentation to attach this source to the **correct app ID**. Do not deploy to the hosted app until local tests pass and you have a backup.
5. Once restored, as platform admin open `/staff` and use **Initialize halls & demo**, only if the live database is empty or missing these items. It is intended to be repeat-safe.
6. Test with at least two real test accounts belonging to different halls, plus one approved RA, before sharing resident access. Run Base44's security scan.
7. Publish using Base44's supported process after testing; uploading an archive to the AI chat does **not** automatically import/merge code.

## Local commands (on a networked computer)

```bash
npm install
npm run test:smoke
npm run build
npx base44 login
npx base44 link
npx base44 dev
```

The linked app's public ID comes from its Base44 editor URL. Do NOT paste your private tokens, passwords, service role credentials, or verification codes in a chat or commit them to Git.

## Known remaining engineering work

- Backend auth and access control needs live integration testing in Base44.
- Cross-hall and cross-floor membership/report permissions need tests using actual non-admin identities.
- Counts are not a transactional counter; concurrent confirmations can race under real load.
- Base44 built-in app settings, authentication routes and user data mirroring should be tested in the actual linked environment.
- There is no automatic visitation reminder delivery; only countdown and preview.
- QR scan-to-report, AI, and push notifications remain separate feature work; prioritize a working demo before adding them.
- Confirm Rawlings contact information and visitation schedules with staff before operational use.

## Verified sources used for APIs

- https://docs.base44.com/developers/backend/overview/local-dev/local-development-overview
- https://github.com/base44/skills/blob/main/skills/base44-sdk/SKILL.md
- https://www.npmjs.com/package/@base44/vite-plugin

This student-built app is not an official Morgan State University system.
