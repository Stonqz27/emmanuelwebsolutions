# HallOS V10 — Real Morgan Residences

An independent, student-built residence hall coordination prototype inspired by Morgan State University's housing system. It is **not** an official Morgan product and cannot directly submit university work orders.

**Start here:** [V10_START_HERE.md](V10_START_HERE.md) · [V10_TEST_REPORT.md](V10_TEST_REPORT.md) · [V10_OFFICIAL_MORGAN_SOURCES.md](V10_OFFICIAL_MORGAN_SOURCES.md) · [V10_JUDGE_DEMO.md](V10_JUDGE_DEMO.md)

## What it includes

- Morgan-managed on-campus and off-campus residence chooser (12 properties).
- Correct residence-specific official maintenance resources and published RA on-call contacts.
- Off-campus BEARtransit resource links.
- Clean four-tab UI: Home, Updates, Report, More.
- HallFix, HallCast, Scan-to-Solve branded QR signs, FixLoop verification, and staff tools.
- Approved-membership / approved-RA roles; staff-created QR spaces so floor plans are not fabricated.
- Browser-local demo mode with fictional data and guided self-test walkthrough.

## Windows local demo

Double-click `START_HALLOS_LOCAL.bat` after extracting the ZIP. First launch uses npm and requires internet. Open `http://localhost:5173`. Run `RUN_FULL_PIPELINE_TEST.bat` for local tests and `BUILD_LOCAL.bat` for frontend build validation.

The source under `base44/` targets Base44's app backend. To update the original hosted project, first back it up, then use a supported CLI or connected GitHub sync with that exact Base44 project. **Do not assume the ZIP imports directly or that code-level tests prove cloud security.**

## Sources

Official Morgan references: [Housing Options](https://www.morgan.edu/residence-life-and-housing/our-housing-options), [Residential Facilities](https://www.morgan.edu/orlhfacilities), [BEARtransit](https://www.morgan.edu/business-and-auxiliary-services/beartransit/off-campus-residential-schedules).
