# HallOS — Windows Local Test (V5)

**This V5 ZIP includes the HallOS React source plus an isolated browser-local simulated backend.** It does not require your Base44 account to explore the app. The simulation is for a hackathon walkthrough and user-interface testing only; it is not a security audit or a substitute for a live Base44 integration test.

## Start on your Windows laptop

1. Unzip the **entire archive** to a normal folder, e.g. `Documents\\HallOS_Local_Test`. Don't run the `.bat` while the files are still inside the ZIP.
2. Install Node.js **22 LTS** from https://nodejs.org/ if needed (npm is included).
3. Double-click **`START_HALLOS_LOCAL.bat`**. On first run, it runs `npm install` (internet required), then starts Vite.
4. Open **http://localhost:5173/** if the browser doesn't open automatically.
5. Use the **amber LOCAL TEST bar** above the HallOS interface to switch among:
   - **Resident (Alex)**: floor 2 of fictional Beacon House
   - **Neighbor (Jordan)**: floor 1 of Beacon House
   - **RA (Sam)**: staff desk + hall announcements
   - **Admin**: staff approvals and setup
   - **Other hall (Taylor)**: separate simulated hall for isolation checks
   - **Pending (Casey)**: a resident who hasn't been approved yet
6. Your fictional reports and inbox changes persist in your own browser's `localStorage`; click **Reset demo data** to start again.
7. Test source-level functions with `RUN_TESTS.bat`; test packaging with `BUILD_LOCAL.bat`.

**This mode NEVER sends emails or phone push notifications, NEVER creates official university work orders, and doesn't contact Base44.** Everything—including staff access—is a simulation. Never enter real student information.

## 7-step practical test

1. **Resident Alex:** Hall Radar > click Floor 2 Shared Bathroom. Report a different issue. Verify it appears under HallFix and Radar.
2. **Neighbor Jordan:** In HallFix, find the open report, press **Me too**. Confirm the count increases (and you can't confirm twice).
3. **RA Sam:** Staff desk > see the report > acknowledge or mark in progress. Publish a new HallCast announcement to **all floors**.
4. **Resident Alex:** HallCast/Inbox > see that notice, then acknowledge it.
5. **RA Sam:** Publish a **floor 2 only** notice. Switch to Jordan (floor 1) to make sure it does not appear; switch to Alex (floor 2) and confirm it does.
6. **RA Sam:** Visitation > Edit or Add hours (use fictional hours only) > mark confirmed. Test visitation countdown. Use **Broadcast to this hall** to create an in-app notice.
7. **Pending Casey:** Check that private hall records and Staff desk cannot be accessed until admin approves the membership.

**For phone UI testing:** Vite's default local server runs on 127.0.0.1 and is visible only on your laptop. You can use your browser's Responsive Design Mode (F12 then Ctrl+Shift+M in Chrome/Edge). To use a real phone on the same Wi-Fi, see instructions below. QR codes generated from `localhost` URLs won't work on another device.

## Optional: test the React app on your actual phone

Run manually from the project directory (instead of using the batch launcher):

```powershell
$env:VITE_HALLOS_LOCAL_DEMO="true"
npm run dev -- --host 0.0.0.0
```

Find your Windows machine's private LAN IP with `ipconfig`; open `http://<YOUR-LAN-IP>:5173` from a phone on the **same trusted Wi-Fi**. Windows Firewall might ask permission. Avoid sharing the server to public Wi-Fi or to the internet. Each browser/device has independent fictional data because local mode uses browser-local storage—not a shared backend.

## Real Base44 integration testing (separate process)

The `base44/` directory, schema, and server functions are included for future Base44 CLI or GitHub integration. They are **not** run by the local demo backend. Live tests require the correct Base44 app ID, Base44 login, deployed functions/entities, and an authenticated testing account. **Never deploy with `VITE_HALLOS_LOCAL_DEMO=true`.** Keep original app backed up, and review changes before syncing.

At the time of packaging, npm registry access was blocked in the assistant environment, so a full installed/dependency-built React run **could not be verified here**. The package includes built-in static checks and mock-flow tests, but **npm install, npm run build and visual browser test must happen on your laptop**. If the first install or build fails, paste the exact terminal error into ChatGPT and we'll fix it.
