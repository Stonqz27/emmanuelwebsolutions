Design audit — July 1, 2026

Summary:
- Added design tokens (8px rhythm), type ramp, motion, and elevation variables to `src/styles.css`.
- Updated core UI components to use tokens: `Button`, `Input`, `Card`, `Textarea`.
- Added cookie consent UI and policy pages; integrated security headers.

Findings (areas with hard-coded spacing/typography to standardize):
- Many route-level components use ad-hoc padding/spacing (e.g., `px-7 py-4`, `p-8`, `p-6`, `rounded-2xl`). See `src/routes/*` (index, about, contact, portfolio).
- Demo pages under `src/routes/demo/*` have many one-off styles (colors, paddings, emojis) that may not match final brand choices.
- Utilities and some UI components use mixed rounding (`rounded-md`, `rounded-xl`, `rounded-3xl`) — prefer `rounded-[var(--radius)]` site-wide.
- Several text elements use arbitrary tracking/line-height values (e.g., `tracking-[0.18em]`, `leading-[1.02]`). Confirm these against type ramp.

Recommendations & next steps:
1. Replace route-level buttons/inputs with shared `Button`, `Input`, and `Textarea` components where appropriate (done for `contact.tsx`).
2. Normalize rounded corners: replace `rounded-*` in pages with `rounded-[var(--radius)]` or component wrappers.
3. Replace ad-hoc paddings (`p-6`, `px-7`, `py-4`, etc.) with token-based classes (e.g., `p-[var(--space-3)]`, `px-[var(--space-2)]`).
4. Audit and normalize typographic classes to the type ramp (use `text-[var(--font-size-*)]` and `leading-*` tokens).
5. Gate analytics to cookie consent (we added the `cookie-consent` event) — integrate analytics only after consent.
6. Run manual responsive QA at breakpoints (320px, 768px, 1024px) to confirm spacing and stacking.

Automation help:
- Use this grep pattern to find hard-coded spacing: `px-\\d+|py-\\d+|p-\\d+|m-\\d+|rounded-\\w+|text-\\d+|tracking-\\[|leading-\\[`.

Files touched by this update:
- `src/styles.css` (design tokens)
- `src/components/ui/button.tsx` (tokenized)
- `src/components/ui/input.tsx` (tokenized)
- `src/components/ui/card.tsx` (tokenized)
- `src/components/ui/textarea.tsx` (new)
- `src/components/ui/cookie-consent.tsx` (new)
- `src/routes/privacy.tsx`, `src/routes/terms.tsx`, `src/routes/security.tsx` (new)
- `src/routes/contact.tsx` (forms replaced with shared components)
- `src/components/site/Footer.tsx` (policy links)
- `src/routes/__root.tsx` (cookie consent + favicon)
- `src/server.ts` (security headers)

Notes:
- This audit is intended to guide a consistent, project-wide migration to tokens. I can continue and automatically apply changes to all files (replace paddings/rounded/text) if you want — this is mechanical but touches many files.
