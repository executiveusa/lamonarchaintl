# La Monarca Internacional

La Monarca Internacional is a bilingual cultural newspaper and editorial platform focused on the people, creativity, stories, and ideas shaping Mexico and Latin America.

The platform publishes stories across arts, music, food, travel, design, nature, community, and innovation while supporting a modern editorial workflow for digital and print experiences.

## Product Overview

La Monarca provides:

- Bilingual editorial content (Spanish / English)
- Article discovery and category browsing
- Search and reader engagement
- Newsletter subscriptions
- Editorial team and contributor workflows
- Print edition experiences
- Private membership concepts through Papel Privado
- Social distribution workflows

## Technology

- React + TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/Radix UI components
- Supabase integration

## Local Development

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm run dev
```

Build production assets:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

## Environment

Copy `.env.example` to your local environment file and configure required services.

Never commit production secrets or API keys.

## Architecture Notes

The application is organized around:

- `src/pages` — application routes and experiences
- `src/components` — reusable UI and editorial components
- `src/services` — external data and application services
- `src/lib` — shared utilities and integrations

## Production Readiness Roadmap

Current hardening work includes:

- Verifying production data ownership
- Completing database security review
- Removing development-only content fallbacks
- Improving editorial workflows
- Maintaining documentation parity with the codebase

## Mission

To create a trusted bilingual publication celebrating the culture, creativity, and human stories of Mexico and Latin America.
