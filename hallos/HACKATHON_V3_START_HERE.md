# HallOS v3 — Hackathon Build Handoff

**November 2, 2026. Source-only milestone — NOT a verified Base44 deployment.**

## What is new since the repaired v2 export

1. **Scan-to-Solve:** each shared space has a scoped `/space/:spaceId` URL. Residents can view same-space active reports, confirm an existing issue, and open a preselected new report. QR signs are printable by approved hall staff, with code generation through `qrcode.react`.
2. **Hall Radar shared-space browser:** all/floor filtering, per-space active issue counts, scan links, and staff QR-generation controls.
3. **Live HallCast alerts while the web app is open:** an in-app banner and unread counter check for new private notifications every 20 seconds while visible. NOT native push, SMS, or unattended background delivery. The app should not claim phone lock-screen alerts.
4. **Manual visitation closing-time broadcast:** authorized staff can post today's confirmed closing time to their hall's HallCast and in-app inboxes. This does not automatically schedule delivery.
5. **Temporary visitation overrides:** a dated exception is stored separately from the recurring weekly schedule, and takes precedence while in effect. Better overnight handling preserves the previous day's closing window.
6. **Server-side privacy fixes:** the Announcement and IssueReport entities no longer grant direct resident reads; authenticated backend functions filter by approved hall/floor and withhold staff-only notes. The resident onboarding endpoint prevents a previously approved user from changing their own floor without review.
7. **QR login continuity:** scanned URLs are preserved through the login flow and through instant demo membership, rather than losing the space when redirected to the home page.

## Local verification performed

- `npm run test:smoke`: 19 tests pass, including 5 backend function logic simulations with mocked SDK and restricted membership.
- TypeScript syntax parser: 133 source/test files checked, zero parse errors.
- Local import check: 281 relative/`@/` imports checked, zero unresolved paths.

## Still unverified / caveats

- **No full production build:** the environment cannot access `registry.npmjs.org` (`EAI_AGAIN`). `qrcode.react@^4.2.0` is a new dependency and must be installed on a machine with npm registry access.
- **No live Base44 deployment or authentication test.** Server-side RLS syntax, service-role functions, platform configuration, and all membership workflows MUST be tested against the linked Base44 project before sharing it with residents. Mocked security tests do not prove live enforcement.
- Several legacy Base44 functions use relative imports from `base44/shared/access.ts`. Verify CLI deployment supports this for your app/project version. If not, move shared access logic to the officially supported deployment structure before publication.
- The app does not send SMS or iOS/Android background phone pushes. A foreground in-app alert only appears if HallOS is open/visible, user is authenticated, and the private inbox query succeeds.
- Residents require approved hall membership, except the clearly fictional demo hall. DO NOT invite real students until access checks pass.
- No live sync to Morgan maintenance services. A HallOS report is not a university work order. Active leaks and safety concerns require directly contacting hall staff using official guidance.
- **Print QR codes only after the site has a stable deployed HTTPS domain.** Codes generated on `localhost` won't work on residents' phones. Seek hall permission before putting up QR signs.
- HallCast broadcast can create duplicate manual notices if staff click repeatedly. Add idempotency / scheduling before treating it as a production alerting system.
- The existing resident confirmation count is nontransactional and may be inaccurate under concurrent confirmation requests. Fix before a larger rollout.

## Safe local and Base44 rollout

1. Do **not** overwrite the original Base44 app without a backup and diff against its current source.
2. On a networked system, run `npm install` in this directory, followed by `npm run test:smoke`, `npm run build`, and `npm run lint`.
3. Ensure the public app ID (`VITE_BASE44_APP_ID`) is configured in the appropriate environment. Do not share access tokens, credentials, or service keys.
4. Review official Base44 CLI docs (https://github.com/base44/cli). Authenticate using `npx base44 login`, then **link to the correct existing HallOS app** with `npx base44 link`. Confirm which backend resources the CLI is about to modify.
5. Before deploying, compare local `base44/entities` and `base44/functions` with the current live project. Note that the new read policies depend on deploying both `listHallAnnouncements` and `listHallReports` at the same time. Partial deploys can break readers.
6. Deploy only after backup and build pass. Test with a real approved RA, Rawlings-like resident, different-floor resident, different-hall resident, and pending account. Run Base44's security check.
7. Try the 60-second judge demo described in `JUDGE_DEMO.md`, on two devices.

## Manual smoke checklist

- An approved resident can view Hall Radar, select a shared space, and report an issue.
- Another resident in the same hall can confirm it; the count updates on the staff desk.
- A staff account can generate a QR sign containing the published site URL; scanning it after login opens the correct space.
- Another floor cannot read floor-specific announcements through API calls or UI.
- A resident cannot fetch internal staff notes from the reports API.
- Pending users cannot access records or become staff.
- Temporary visitation exception doesn't overwrite the recurring schedule.
- A staff member can manually send a confirmed visitation time as a HallCast announcement; appropriate residents receive in-app notifications.
- A page-open resident receives a banner on the next 20-second poll; no background delivery is claimed.
- Emergency guidance remains visible and points to official channels.

## Official project infrastructure references

- Base44 CLI: https://github.com/base44/cli
- Base44 development: https://base44.com/developers
- Base44 SDK guidance: https://github.com/base44/skills/blob/main/skills/base44-sdk/SKILL.md

**HallOS is a student-built prototype, not a Morgan State University system.**
