# PRDF - lamonarchaintl (Production Readiness & Design Findings)

Inspected: 2026-09-28. Method: real code, real build - README ignored per owner order. Benchmark: Collins protocol + gauntlet skills.

## VERDICT: TIER 1.5 - STRONG PRODUCT, ONE TRUTH-IN-CONTENT BLOCKER
Deploy PAUSED (402 - Vercel account-level billing hold, not code; flag: affects 4 repos). Vite + React + shadcn + Supabase. LA MONARCA INTL is a bilingual digital magazine: articles/categories, Primera Edicion, Suscribirse (membership tiers: Creador/Empresario, annual -20%, Directorio Kupuri perk), Trabaja Con Nosotros (story pitches), Music Blogs, Translator, auth + admin, Postiz social service (env-based, clean).

## EVIDENCE (verified this inspection)
- `tsc --noEmit` CLEAN (exit 0). `npm run build` PASSES (6.45s) - needs --legacy-peer-deps like its sibling vallarta-voyage-explorer.
- Real content voice in static copy (Trabaja Con Nosotros pitch categories, Primera Edicion artist features).
- Monetization is signup-gated (plans route to /auth?plan=...); NO payment processor in code - honest, no broken checkout.
- Postiz integration reads env keys only (VITE_POSTIZ_*), no secrets in tree.

## VIOLATIONS / GAPS (severity + standard broken)
1. HIGH - MOCK CONTENT SERVED AS REAL: src/utils/mockArticles.ts (48 mock articles) is imported and rendered by Index.tsx and CategoriaPage.tsx - the homepage and category pages show fabricated articles as if published. Breaks Collins 2.6 proof-before-claims and basic truth-in-content. Fix: gate mocks behind a dev flag; render only Supabase-published articles in prod; if none exist, show an honest empty state or hold launch.
2. MED - npm ci clean install FAILS (ERESOLVE, same as sibling) - reproducible-install gate broken. Fix: resolve peer conflict.
3. MED - Zero tests (no test script/files).
4. LOW - Translator page + PapelPrivado page purposes unclear from code (undocumented surfaces); wire or cut per Collins no-orphan-pages.
5. LOW - 402 paused deploy: account-level Vercel billing hold - owner decision, affects lamonarchaintl + lapina + landscaping1 + la-silueta.
6. INFO - shadcn default look risk (template recognizability); no design-token doc; a11y audit not run.

## FIX LIST TO PRODUCTION-READY (ordered)
1 (2-3h) dev-flag the mocks + honest empty state; 2 (1-2h) ERESOLVE fix; 3 (2h) vitest smoke (language context, article service, plan routing); 4 (30m) wire-or-cut decision on Translator/PapelPrivado; 5 (owner) Vercel billing. Estimated: one day + owner action.

## PORTFOLIO ROLE
Signature brand piece (monarch = her identity) with real editorial ambition and a subscription model - keep in top five, but the mock-articles blocker must be fixed before it represents her publicly.
