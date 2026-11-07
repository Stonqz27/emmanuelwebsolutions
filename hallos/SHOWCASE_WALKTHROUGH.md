# HallOS Showcase — Self-Test + Judges' 75-Second Story

Use only fictional data during the demonstration.

## Before the judges arrive

- Run `START_HALLOS_LOCAL.bat` and verify the home screen.
- Open **Test walkthrough** in the local-test banner and use Reset demo data if you want a clean starting state.
- Check both Resident and RA personas, and resize the browser to 390 px and 375 px using Chrome DevTools (`F12`, then toggle device toolbar).
- Pre-open HallOS in one browser tab; keep the Staff desk available after switching to RA.
- Show a printed **Signature** QR placard, ideally generated from the **published HTTPS site**. Do not rely on a `localhost` QR code when demonstrating with a phone.
- Make sure there is a backup screen recording / screenshots if Wi-Fi is unreliable.
- Turn off notifications and avoid showing private messages during the presentation.

## Self-test: the actual pipeline

**1. Resident:** Local Test selector → Resident. Home should be beautiful and uncluttered. Confirm that visitation says unconfirmed unless staff set it.

**2. QR:** Switch to RA → Report → Shared-space map → QR icon on a bathroom. Preview **Signature** and **Classic**. Test PNG, PDF and Print. Don't put real student data on the sign.

**3. Report:** Switch to Resident → Report → Report new issue. Choose an actual seeded fictional shared space. Enter a unique demo problem, e.g. `DEMO: Shower fixture drips after use`. Save. Observe the confirmation message and the **Make it official** handoff.

**4. MorganReady:** In the handoff, verify category suggestion, copy the shared-space details, and confirm it says a separate official submission is required. The demo deliberately disables real submission.

**5. Neighbor confirmation:** Switch to Second resident → Report. Find your unique issue. Click **Me too**. Confirm count increments once and repeated clicks cannot inflate it.

**6. RA action:** Switch to RA → More → Staff desk. Locate the same report. Click **Acknowledge**, then **In progress**, and optionally enter `DEMO-101` as a fictional staff-entered reference. Click **Mark fixed**.

**7. FixLoop:** Switch to Resident → Report → recent fixes. Vote **Still broken**. Switch to RA → Staff desk, confirm a follow-up warning appears. Click **Reopen**, then **Mark fixed**. The new verification round must be clean.

**8. Announcement:** As RA → Updates → New post. Choose **Floor 2 only**, write a fictional maintenance message, and publish. Switch to Resident (Floor 2) → Inbox: it must be visible. Switch to Second resident (Floor 1): it must not be visible. Switch to Other hall: that announcement must not be present.

**9. Security:** Switch to Pending resident. Private reports must not be accessible. Ordinary residents must not see staff publishing/approving controls.

**10. Off-campus comparison:** Switch to Other hall (HH Midtown). In More, check the university-managed off-campus label, property-specific maintenance destination, published after-hours RA number, and BEARtransit schedule link. Confirm you cannot read Rawlings-only alerts.

**11. Mobile:** At 375px and 390px verify no horizontal overflow, the bottom nav has four tabs, cards/QR modal are scrollable, and no button is unreachable.

**12. Browser build:** Run `BUILD_LOCAL.bat` and make sure Vite reports success. If it fails, capture the full error text and repair it before publishing.

**13. Cross-device truth:** Local demo data is per-browser, not synchronized across phones. Only claim true multi-device synchronization after checking the actual Base44 deployment with two authenticated accounts.

## The 75-second presentation

**0–10 sec:** “GroupMe can tell you a shower is broken. But who's actually tracking the problem?” Show HallOS Home.

**10–24 sec:** Show the gorgeous physical QR placard. Scan it to the correct shared-space page.

**24–38 sec:** Show a report and another resident confirming it. Explain how duplicate complaints become an actionable signal.

**38–52 sec:** Show the MorganReady handoff. Say: “HallOS guides students into Morgan's **separate** official maintenance process — we don't impersonate it.”

**52–65 sec:** Switch to RA and mark the report fixed. Show a resident selecting **Still broken** and the RA seeing **Needs recheck**.

**65–75 sec:** “HallOS doesn't just collect complaints. It closes the loop. And the four-tab interface keeps important updates easy to find.”

## If anything fails live

- If the QR can't scan, click the shared-space URL directly and continue.
- If a phone cannot open the LAN URL, use the laptop browser and role switching. Do **not** claim the local demo is synchronized between devices.
- If the MorganReady website is slow, use the copy-ready summary already visible in HallOS.
- If the wifi is down, use a prepared screen recording of this exact fictional scenario, labeled as a demo.
- If a visiting judge asks whether this is official: clearly say it is a student prototype.

## Don't say

- “HallOS automatically files MorganReady work orders.” It doesn't.
- “We have push notifications on every phone.” We have in-app alerts while open and inbox delivery; native push isn't verified.
- “Every Rawlings resident is authenticated and onboarded.” No university membership integration is approved.
- “These are real campus incidents.” Local data is fictional.
