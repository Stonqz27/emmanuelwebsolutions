# HallOS V9 — Morgan-Inspired Showcase Edition

**Purpose:** The November 6, 2026 hackathon demo. This is still a **student-built prototype**, not an official university product or a live MorganReady work-order integration.

## Get started on Windows

1. Extract the complete ZIP into a normal local folder, e.g. `C:\HallOS_V9_Showcase_Ready`. Do **not** run scripts inside the compressed ZIP.
2. Install **Node.js 22 or newer** from https://nodejs.org if needed. Open Command Prompt and verify `node -v` and `npm -v`.
3. Double-click `START_HALLOS_LOCAL.bat`. On the first run, let npm install the dependencies (internet required). Keep the terminal open.
4. Open **http://localhost:5173** on the laptop.
5. Click **Test walkthrough** in the orange **LOCAL TEST** toolbar. Follow all 12 checks. This toolbar and guide exist only in the local-demo mode.
6. Run **`RUN_FULL_PIPELINE_TEST.bat`** at any time. It uses Node's built-in test runner; it needs no npm installation.
7. Run **`BUILD_LOCAL.bat`** for an actual production frontend build on your machine after packages install.

### Phone test / physical QR

- For a phone **on the same private Wi-Fi**, run `START_HALLOS_PHONE_TEST.bat` instead of the regular launcher. It prints an LAN URL like `http://192.168.1.50:5173`.
- Open that LAN URL on the **laptop** before generating the QR. The QR encodes the origin currently being used.
- Try scanning a downloaded sign with iPhone Camera and Android Camera if available. Check it opens the correct shared-space route.
- **Important:** The local demo saves fictional data separately in each browser's localStorage. A phone browser will not see the laptop browser's newly submitted reports. For a cross-device live-sync demonstration, deploy and test against Base44 with two approved, authenticated test accounts.
- Do not use a public Wi-Fi network for local demo server exposure. Windows may ask to permit Node on private networks.
- **Never print or post localhost/LAN QR codes as production signage.** Regenerate them once you have a published, stable HTTPS HallOS URL and building permission.

## What's changed in V9

- Morgan-inspired palette: official Morgan Blue `#1B4383`, Morgan Orange `#F47937`, gold `#FEBF50` as inspiration; HallOS still has its own independent brand and no official logos.
- Refreshed home hero, more intentional typography, calm background, compact action cards, navigation polish, and responsive page headings.
- A **local-only guided showcase checklist** covering the resident → RA → FixLoop story.
- A **new integrated automated regression** that simulates Scan-to-Solve → report → MorganReady handoff → second-resident confirmation → RA work → resident vote → reopen → targeted announcement → permission checks.
- Improved error feedback for issue confirmation, announcement acknowledgment, and staff status changes.
- Fixed the report dialog's duplicate suggestions to prioritize the **selected space**, not unrelated same-category reports across the hall.
- Converted Tailwind configuration to `.cjs` for compatibility with the project's ESM package setting.
- Staff QR signage now says **“Scan ready”**, not “Judge demo”.

## What local tests do and don't prove

**Verified in source/simulation:** the Node test suite and code parsing. This includes simulated authorization checks and a simulated multi-role pipeline.

**Not verified in this environment:** `npm install`, production browser build, live Base44 authentication/permissions, Base44 cloud sync, phone camera scanning, PNG/PDF download, actual MorganReady ticket creation. The npm registry was unreachable from the build environment, so these are tasks for your Windows laptop and live Base44 instance.

**Always true:** HallOS reports are **not official university work orders**. The MorganReady workflow is a **user-initiated handoff** with a category hint and copy-ready description, not an API integration. Do not send fictional demo reports to the real university portal. Urgent leaks and safety issues require direct contact with hall staff.

## After local testing

1. Back up the live Base44 project first.
2. Use a supported Base44 CLI or GitHub sync path that is actually connected to the original app; do not expect ZIP upload to automatically patch the live app.
3. Deploy to a **staging/preview copy** before production if your workflow allows it.
4. Test **two real accounts** (resident and approved RA), hall isolation, and phone-responsive screens with actual backend data.
5. Replace LAN QR destinations with the published HTTPS URL.
6. Only after live tests pass, publish HallOS.

## Important files

- `SHOWCASE_WALKTHROUGH.md` — scripted human demo, step by step.
- `V9_TEST_REPORT.md` — exact verification and limitations.
- `RUN_FULL_PIPELINE_TEST.bat` — automated Node tests.
- `START_HALLOS_LOCAL.bat` — laptop demo launcher.
- `START_HALLOS_PHONE_TEST.bat` — same-Wi-Fi QR link testing.
- `BUILD_LOCAL.bat` — production frontend build check.
