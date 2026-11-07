# HallOS V8 — MorganReady Handoff Edition

## Start in Windows
1. Extract the ZIP file.
2. Open the `HallOS_V8_MorganReady_Local_Test` folder.
3. Run `START_HALLOS_LOCAL.bat` (Node.js 22 recommended; the first run needs npm internet access).
4. Open `http://localhost:5173`.
5. Read `V8_TEST_REPORT.md` for verification status.

## New for V8

- **Make it official**: after submitting a HallFix report, residents get a guided handoff to Morgan's official work-order process.
- **Smart tile suggestions**: showers and toilets suggest Plumbing, leaks suggest Leak, heating suggests Room Comfort, trash suggests Housekeeping, and uncertain categories tell residents to review the portal.
- **Copy-ready summary**: shared-space location, floor, category, description, urgency; no user email or student ID included as separate fields.
- **Official portal link**: for real traditional Morgan residence hall records, HallOS opens https://morganready.assetworks.cloud/ready/ in a new tab. Other hall types route to the official Residential Facilities guidance until their portal is confirmed.
- **Staff reference field**: authorized staff may manually save an official ticket/reference number on a HallOS report. This is not verified or synchronized with the university system.
- **Quiet interface**: no new resident navigation tabs. Handoff appears after submitting and as an unobtrusive link from each open report.
- **Demo safety**: fictional data stays in local demo. A demo handoff does not enable submitting fake tickets.

## Local demo flow

1. Select **Resident** in the local tester.
2. Navigate to **Report** and submit a fictional shower issue.
3. In the **Make it official** dialog, select **Copy report details**.
4. See the suggested **Plumbing** tile and the separate, required official submission step.
5. Switch to **RA**. Open **More > Staff desk**, pick a report, choose **Official reference**, and save a sample demo-only reference, like `DEMO-101`.
6. Continue with your earlier Scan-to-Solve / FixLoop showcase.

## What it does NOT do

- No API access to Morgan/AssetWorks. No automatic login, ticket submission, or fetching of ticket status.
- A HallOS report is **not** an official university work order.
- The sign and QR flows, React browser rendering, and real deployment still need on-device testing.
- The local tester is a fictional simulation, **not** an authoritative source of actual campus maintenance issues.

## Live deployment caution

Back up your existing Base44 app before connecting/importing changes. Confirm Base44 GitHub/CLI support for your plan and existing app. Check permissions with separate real test accounts. Never submit sample reports to MorganReady.

## Official information

- Morgan Facilities Management: https://www.morgan.edu/facilities-management/services
- Morgan Residential Facilities: https://www.morgan.edu/orlhfacilities
- MorganReady: https://morganready.assetworks.cloud/ready/
