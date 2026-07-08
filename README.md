# Aetherform

**The AI-native website creation platform.** Describe your idea — autonomous AI agents
design, build, and ship a production-ready website with modern UI/UX, animations,
responsive layouts, SEO, and accessibility built in.

## What's in this repo

A Next.js 14 + TypeScript + Tailwind + Framer Motion implementation of the Aetherform
product experience:

| Route | Description |
|---|---|
| `/` | Futuristic landing page — hero, AI demo, agents, features, marketplace preview, CTA |
| `/generate` | AI Website Generator — prompt → agent pipeline → generated site preview + audit scores |
| `/editor` | Figma-style visual editor — canvas with draggable elements, layers panel, properties panel, device preview, design tokens, AI suggestions |
| `/dashboard` | Studio dashboard — projects, website intelligence scores, agent activity feed, AI copilot sidebar |
| `/marketplace` | Community marketplace — templates, components, animations, plugins, AI agents |
| `/pricing` | Free / Pro / Team / Enterprise plans |

Docs:

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — full product & platform architecture
- [`docs/DATABASE_SCHEMA.sql`](docs/DATABASE_SCHEMA.sql) — PostgreSQL + pgvector schema (design graph, CMS, AI, marketplace, billing)
- [`docs/AI_AGENTS.md`](docs/AI_AGENTS.md) — agent swarm architecture (Lumen, Vector, Pulse, Beacon, Flux, Aria)

> AI generation in this build is simulated client-side; the agent pipeline, model
> routing, and backend services are specified in the docs for implementation.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```
