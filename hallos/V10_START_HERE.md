# HallOS V10 — Real Morgan Residences + Quality-of-Life Edition
**November 5, 2026 — independent student project, not an official Morgan State product.**

## Run on Windows
1. Install Node.js 22 or later if you haven't.
2. Extract the full ZIP, open `HallOS_V10_Morgan_Residences`.
3. Double-click `START_HALLOS_LOCAL.bat`. The first run requires internet for `npm install`.
4. Open `http://localhost:5173`. The demo uses **fictional data in your browser**, not Morgan student records.
5. Run `RUN_FULL_PIPELINE_TEST.bat` to re-run the local automated checks.
6. Run `BUILD_LOCAL.bat` to test the production Vite build with installed packages.

## What changed from V9
- Removed fictional **Beacon House** from the new local demo and replaced it with **actual Morgan residence names**.
- Added 12 listed **university-managed** on- and off-campus residential options. Other privately managed properties such as Morgan View are intentionally excluded from this supported housing catalog because Morgan describes them as a separate housing application.
- Correct residence-specific **maintenance handoff**: MorganReady for traditional on-campus halls, separate resident portals where Morgan provides them, Morgan facilities guidance when a provider-specific link needs confirmation.
- Published off-campus **RA on-call numbers** and official **BEARtransit** schedule link where applicable.
- Clean `More > Your Morgan residence` card: maintenance, calls, housing resources, transport. Four-tab navigation unchanged.
- Staff can add only **confirmed shared spaces** and generate QR signs from Hall Radar. Unknown residence floor counts are left unset rather than guessed.
- Residence membership remains approval-based; an email or building selection does not create RA authorization.
- Existing QR sign, MorganReady handoff, Floor updates, and FixLoop workflow preserved.

## Try both sides in local demo
**On campus (Rawlings)**:
- Switch to **Resident**, report a sample issue (Floor 2 bathroom), then open the prepared official handoff. In demo it must refuse to submit to the real university.
- Switch to **RA**, acknowledge the report, mark fixed, publish a Floor 2 update, and generate a QR sign.
- Switch to **Resident 2**, verify that Floor 2-only updates are not shown to a Floor 1 account.

**Off campus (HH Midtown)**:
- Switch to **Other hall** persona; open **More** and verify the HH Midtown maintenance guidance, published RA on-call number, and BEARtransit shuttle schedule.
- As **Admin**, assign RA status to `other@demo.invalid` for HH Midtown (if testing staff controls). Switch back to **Other hall**, then create a demo shared space with **no invented floor**.
- Confirm Rawlings records are not visible from the HH Midtown account.

## Real Base44 return path
1. Back up the **existing** Base44 app and source before syncing anything from V10.
2. Connect the source through the supported project GitHub sync or Base44 CLI workflow for **that exact existing app**. A ZIP upload alone is not a verified import strategy.
3. Sign in as **platform admin**, open Staff Desk, and run **Load / refresh Morgan residences** once.
4. Verify the 12 real locations and the newly listed links. Existing historical Beacon House records are deactivated rather than destroyed.
5. Have residence staff **approve memberships**, confirm floor counts, configure shared spaces, and verify local contact numbers.
6. Test permissions with separate real accounts before live use or printing QR signs.

**Do not place signs in residence halls without permission.** HallOS report saved ≠ official university work order submitted.

## Sources
See `V10_OFFICIAL_MORGAN_SOURCES.md` for the exact Morgan pages and maintenance routing decisions.
