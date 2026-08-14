# La Monarca Internacional

La Monarca Internacional is a bilingual local publication and verified cultural guide for Mexico, beginning with Puerto Vallarta.

## North star

Real interview / local story → verified place → La Guía → curated route → real-world field test → paid walking tour → repeatable neighborhood routes.

## Product model

### Publication first
Stories and interviews create trust. La Monarca is not a generic business directory and does not publish scraped listings, invented reviews, fake metrics, or unverified recommendations.

### Verified local guide
Real-world places live in structured `places` records. A place must be verified and separately approved for publication before it can appear publicly in La Guía.

### Editorial provenance
Private interview records preserve source provenance, consent state, notes, transcript/recording links, and relationships to stories or places. These records are editorial infrastructure, not public content by default.

### Walking tours
Walking tours are monetization products built from the verified place catalog. Public tour stops must reference verified, published places.

A route is not considered sellable because it exists in software. Before publication it must pass a recorded real-world field test covering actual duration, route flow, safety, accessibility, heat/rest needs, and business readiness.

## Current development gates

1. Truth-critical wiring
2. Verified local publishing engine
3. First real interviews and verified place records
4. First 3–5 stop route hypothesis
5. Physical route test and corrections
6. Pricing/booking only after the route works in the real world
7. Production deployment after product gates are complete

## Data principles

- GitHub is the source of truth for application code and migrations.
- Supabase/Postgres is the intended portable canonical data store.
- Row Level Security is required for durable production use.
- Public claims require evidence.
- Human approval is required for real-world verification and publication decisions.

## Development

```sh
npm install
npm run dev
```

Build:

```sh
npm run build
```

Vercel output directory: `dist`.
