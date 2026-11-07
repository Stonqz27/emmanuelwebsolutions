# HallOS V7 — Premium QR Signage Pass

This folder is the latest local-test build of HallOS.

## What's new in V7

- Added **premium QR placards** for shared spaces.
- Added **two sign styles**: Classic and Signature.
- Added **PNG download**, **PDF download**, and **print view** for QR signs.
- Kept the resident UI clean — the QR sign tools live behind staff flows in Hall Radar and each shared-space page.
- Preserved V6 FixLoop and the four-tab resident navigation.

## How to test the new QR feature

1. Run `START_HALLOS_LOCAL.bat`.
2. Open `http://localhost:5173`.
3. Switch to an approved staff persona in Local Demo mode.
4. Go to **Report > Shared-space map**.
5. Click the QR icon on a shared space, or open a space and choose **Premium QR sign**.
6. Switch between **Classic** and **Signature**.
7. Test **Copy link**, **Download PNG**, **Download PDF**, and **Print sign**.

## Why this matters

This is a small but memorable upgrade that helps HallOS stand out for:
- Best Design
- Most Innovative
- People's Choice

The sign makes the Scan-to-Solve flow feel like a real residence-hall product, not just a prototype screen.

## Notes

- HallOS local demo mode uses fictional data.
- Browser printing and downloads require a full browser run on your laptop.
- We verified the code with local tests, but this still needs a live browser test on your machine and a separate live Base44 test before publishing.

## Snapshot

- Files in project: 189
- Local tests passing: 50 / 50
