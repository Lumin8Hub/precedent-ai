## Plan: Build Precedent AI website

The uploaded `App.jsx` is a React Router single-file scaffold. This project uses **TanStack Start** (not React Router / Vite-SPA), so I'll port the design, content, and components to TanStack's file-based routing. All copy, palette, fonts, and section structure from the scaffold will be preserved verbatim.

### Skipped from instructions (not applicable to this stack)
- React Router / HashRouter / BrowserRouter setup → use TanStack Router `<Link>` and file routes
- GitHub Pages workflow + `vite.config base` → not relevant to Lovable preview/publish
- `react-helmet-async` → use TanStack Start `head()` per route
- Tally/HubSpot live integration → keep placeholder constants in a `config.ts` (CUSTOMIZE markers preserved)

### Steps

1. **Fonts & global styles** (`index.html`, `src/styles.css`)
   - Add Cormorant Garamond + DM Sans Google Fonts links
   - Add brand color tokens (navy, parchment, gold, charcoal, smoke, muted, cream) as oklch CSS vars in `:root`
   - Set body font to DM Sans, background parchment

2. **Constants** (`src/constants/`)
   - `config.ts` — HUBSPOT_MEETINGS_URL, CONTACT_EMAIL, Tally URLs (CUSTOMIZE markers)
   - `palette.ts` — color tokens
   - `services.ts`, `trustStack.ts`, `useCases.ts`, `problems.ts`, `whyNow.ts`, `resources.ts` — content arrays copied verbatim from `App.jsx`

3. **Shared components** (`src/components/`)
   - `layout/Header.tsx` (with mobile menu, scroll state, TanStack `Link` + `useLocation`)
   - `layout/Footer.tsx` (with required disclaimer)
   - `layout/Wordmark.tsx`
   - `shared/PrimaryCTA.tsx`, `SecondaryCTA.tsx`, `SectionEyebrow.tsx`
   - `shared/motionVariants.ts` (fadeUp, stagger)
   - Section components: `Hero`, `ProblemSection`, `WhyNowSection`, `WhyUsSection`, `ServicesOverviewSection`, `TrustStackSection` (accordion), `UseCasesSection`, `LeadMagnetSection`, `FinalCTASection`

4. **Root layout** (`src/routes/__root.tsx`)
   - Add Header + Footer around `<Outlet />`
   - Keep existing 404/error components

5. **Routes** (each with own `head()` meta per Step 12 of instructions)
   - `src/routes/index.tsx` — Home (replace placeholder)
   - `src/routes/about.tsx`
   - `src/routes/services.tsx`
   - `src/routes/services.$slug.tsx` — dynamic service detail (5 slugs)
   - `src/routes/resources.tsx`
   - `src/routes/contact.tsx`

6. **Dependencies**
   - Install `framer-motion` via `bun add`

7. **Verification**
   - Confirm all 5 service slugs resolve
   - Mobile menu, Trust Stack accordion, scroll-aware header all work
   - No placeholder content remains on `/`

### Deferred (surfaced to user post-build)
Founder photos, real bios, real HubSpot/Tally URLs, OG image, favicon, downloadable checklist PDF — left as `CUSTOMIZE` markers in `config.ts` and as styled placeholders in the relevant components.
