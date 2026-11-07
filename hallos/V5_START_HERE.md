# HallOS V5 — Clean Competition Edition

**Built from the user's V4 local-test ZIP on November 2, 2026.** This is a source-code update, not a published university app. The local demo contains entirely fictional accounts and issues.

## The product rule

**Do fewer things extremely well.** Four primary navigation tabs: **Home, Updates, Report, More**. Visitation, shared-space QR links, Inbox, resident profile, hall contacts, and RA tools are still present, but accessible from their relevant parent area rather than becoming six-plus tabs.

## Run on Windows

1. Extract the entire ZIP to a normal folder (not inside the ZIP viewer).
2. Install Node.js 22+ and ensure `node` / `npm` work in Command Prompt.
3. Double-click **START_HALLOS_LOCAL.bat** inside the project directory.
4. First start needs internet to install `npm` packages. Then open **http://localhost:5173**.
5. Switch between fictional Resident, RA, Admin, Pending and other-hall accounts using the yellow **LOCAL TEST** bar at the top.
6. When finished, stop the local server with **Ctrl+C** in its terminal.

Command-line alternatives:

```powershell
$env:VITE_HALLOS_LOCAL_DEMO="true"
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Local unit tests: `npm run test:smoke` (Node-only tests can run without dependency install).
Production build: `npm run build` (requires successful `npm install`).

## What V5 changed

- Four primary mobile and desktop sections; removed five-tab overload and moved detailed tools into the appropriate section.
- Home dashboard now has **two primary actions**, one visitation card, the latest verified announcement, and a short open-issues preview.
- Added **More** to organize visitation, spaces, inbox, membership, contacts, official work-order guidance, and approved staff tools.
- **Updates** provides a lightweight route to visitation changes.
- **Report** leads directly to Scan-to-Solve spaces and official maintenance guidance.
- Shared-space view focuses on filters, QR signage for staff, and issue counts—no duplicated announcements or visitation panels.
- Urgent help is always visible in Report, with detailed guidance collapsed unless needed.
- Removed the extra floating unread-count pill, preserving the Inbox bell and new-announcement toast while app is open.
- Improved focus visibility, reduced-motion support, and current section highlighting on nested routes.
- Navigation tests added; existing 27 local tests kept.

## Important limitations

- Local mode uses `localStorage` only: devices do NOT synchronize, and simulated staff roles are NOT live authentication or production security.
- No background iOS/Android push notifications, SMS, or automatically delivered reminders. Only in-app behavior already implemented in the project.
- The user must verify all official visitation times, hall contact details, and staff identities with actual housing staff before publishing live information.
- Existing `base44/` functions and entity schemas are retained unchanged in this round. This package does not automatically sync into the user's Base44 account.
- The test environment could not access the npm registry, so **a browser run and production bundle have NOT been verified here**. Syntax checks, import resolution, and Node-based simulation tests are separate and do not prove the full app works on a browser.

## What to test visually

1. On a 375px-wide viewport, bottom navigation shows exactly **Home / Updates / Report / More**, with no overflowing labels.
2. Home has two large actions, today's visitation, one staff update, and up to two shared-space issues.
3. Updates shows staff announcements; visitation link opens the full schedule; Inbox bell opens notifications.
4. Report shows urgent-contact guidance, official maintenance guidance, and opens a working report modal.
5. Report > Scan or find a space opens the shared-space directory. Filter floors; select a space; report or confirm an issue.
6. Switch to RA in LOCAL TEST. QR signs, staff desk, and publishing must be accessible. Resident cannot see staff controls.
7. More reveals essentials and contacts. On an approved RA account, it reveals Staff desk too.
8. Check a 320px viewport, keyboard Tab navigation, and the browser's reduced-motion preference.

**Keep your original Base44 project backed up.** Treat this package as an improved local branch until you verify the web build and live Base44 permissions.
