# HallOS V6 — FixLoop (Clean Competition Edition)

## What changed

V6 introduces **FixLoop**, a compact resident feedback step that closes the loop on shared-space issue reporting. It is **not a new navigation tab**; it is inside Report > Check recent fixes, shared-space QR pages, and the existing Staff Desk.

- Residents can mark reports that staff have marked fixed as **Looks fixed** or **Still broken**.
- A resident has **one vote per report resolution cycle**, and can change it. A later repair attempt uses a new cycle, so old votes are not carried forward.
- Staff see an **actionable Needs recheck** box when anyone says a report is still broken, with a Reopen button.
- Feedback remains **anonymous in the resident-facing report list**: users see counts and only their own vote; they do not get voter identities or internal staff notes.
- Access checks are enforced by a **new backend function** and private FixFeedback entity in Base44 source. The local simulation mirrors these rules, but cannot prove cloud security.

## Run on Windows (fictional local demo)

1. Extract the ZIP fully.
2. Install Node.js 22+ (if needed).
3. Double-click `START_HALLOS_LOCAL.bat` inside the extracted project folder. First launch needs internet and access to npm.
4. Open `http://localhost:5173`.
5. At top use the **LOCAL TEST** bar to select **Resident**, **RA**, or **Other Hall**. This switches *fictional demo identities only*; it is not live university authentication.

If you already tested V5, V6 uses the same local demo browser storage. Existing demo data should remain; use the local reset control if you want the fresh fictional resolved sample (`Floor 1 Shared Bathroom`).

Run tests (Node.js, without npm install): `node --test tests/*.test.mjs`.

## One-minute judge demo

1. **Resident:** Open Report. Show a shared-space complaint and how to tap **Me too** rather than filing a duplicate.
2. **RA:** Switch the LOCAL TEST bar to RA. Open Staff Desk, and mark an open report **Mark fixed**.
3. **Resident:** Switch back, open Report > **FixLoop · Check recent fixes**, select **Still broken**. See the vote saved.
4. **RA:** Switch back. The **FixLoop · Residents still reporting problems** card appears in Staff Desk. Tap **Reopen**.
5. Say: "GroupMe tells us something's broken. HallOS closes the loop and lets residents verify whether it was actually addressed."

Use the main HallOS app for demo; don't show the local test bar on a public live deployment. Do not present these fictional records as real incidents, RA statements or official maintenance work orders.

## Critical limits / next steps

- `npm` installation, full Vite build, and authenticated cloud runtime were **not** available in this sandbox. The Node tests and source parsing do not prove that the app compiles or runs in a browser.
- The backend `FixFeedback` schema, `submitFixFeedback` function, modified `listHallReports`, and modified `updateReportStatus` must be deployed together to the **same Base44 app**. A ZIP upload does not necessarily sync these automatically.
- Live notification delivery, real phone push, SMS, and university maintenance portal integration are **not** implemented by this feature.
- The demo uses localStorage and does not sync between devices. Two phones can be used only after a tested real backend deployment.
- For production, add database-level uniqueness/idempotency for feedback under simultaneous submissions and review performance for high-traffic halls.
- Confirm Morgan hall policies, contact details and RA authorization with staff before using live university data.

**Do not overwrite or delete the original Base44 project until you compare and back up its latest version.**
