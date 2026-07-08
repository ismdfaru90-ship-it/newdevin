# Aetherform — Product Architecture

Aetherform is an AI-native website design and development platform: users describe a
website in natural language (or via screenshot, URL, Figma file, sketch, or voice) and
autonomous AI agents design, code, optimize, and publish it.

## System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                          Clients                                 │
│   Web Studio (Next.js)  ·  Mobile  ·  Spatial (future)           │
└───────────────┬──────────────────────────────────────────────────┘
                │ HTTPS / WebSocket (multiplayer, agent streams)
┌───────────────▼──────────────────────────────────────────────────┐
│                     Edge Layer (Cloudflare)                      │
│   CDN · WAF · Edge functions · A/B routing · Published sites     │
└───────────────┬──────────────────────────────────────────────────┘
                │
┌───────────────▼──────────────────────────────────────────────────┐
│                        API Gateway                               │
│         Auth (JWT/SSO) · Rate limiting · Routing                 │
└──┬─────────────┬─────────────┬─────────────┬────────────────────┘
   │             │             │             │
┌──▼───────┐ ┌───▼────────┐ ┌──▼─────────┐ ┌─▼──────────────┐
│ Core API │ │ AI Agent   │ │ Realtime   │ │ Publishing     │
│ Node.js  │ │ Orchestr.  │ │ Service    │ │ Pipeline       │
│ (NestJS) │ │ FastAPI    │ │ (CRDT/WS)  │ │ (build+deploy) │
└──┬───────┘ └───┬────────┘ └──┬─────────┘ └─┬──────────────┘
   │             │             │             │
┌──▼─────────────▼─────────────▼─────────────▼──────────────────┐
│  PostgreSQL · Redis (cache/pubsub/queues) · pgvector (RAG)    │
│  S3-compatible object storage (assets, builds, exports)       │
└───────────────────────────────────────────────────────────────┘
```

## Services

| Service | Stack | Responsibility |
|---|---|---|
| Core API | Node.js (NestJS), PostgreSQL | Users, teams, projects, pages, CMS, marketplace, billing |
| AI Agent Orchestrator | Python FastAPI, LangGraph-style framework | Agent swarm scheduling, tool calls, model routing, RAG |
| Realtime Service | Node.js, Yjs CRDT over WebSocket | Multiplayer editing, presence, comments, cursors |
| Codegen Engine | Python + Node workers | Design graph → React/Next/Vue/Svelte + Tailwind output |
| Publishing Pipeline | Kubernetes jobs | Build, SSR/SSG render, edge deploy, custom domains, SSL |
| Media Service | FastAPI + diffusion/video models | AI images, video, icons, logos, 3D assets |
| Intelligence Service | Python workers | UX/perf/SEO/a11y/conversion audits, auto-fix proposals |
| Billing Service | Node.js + Stripe | Plans, seats, metered AI usage, marketplace payouts |

## Design Graph (core data model)

Every website is a **design graph**: a tree of nodes (frames, stacks, text, media,
components) with design tokens, constraints, breakpoints, and interactions. The graph
is the single source of truth consumed by:

- the visual editor (rendered on an infinite canvas),
- the codegen engine (deterministic graph → code compilation),
- AI agents (read/write via a structured tool API — never raw code edits),
- the publishing pipeline (graph → optimized static/SSR build).

Multiplayer edits are CRDT operations on the graph, persisted as an event log for
version history and branching.

## AI Layer

- **Model router**: GPT-5-class / Claude-class / Gemini-class / open-source LLMs, chosen
  per task (design reasoning vs. codegen vs. copywriting) with fallback and cost caps.
- **Agent framework**: each agent (see `docs/AI_AGENTS.md`) is a planner-executor loop
  with a scoped toolset over the design graph.
- **RAG**: pgvector stores embeddings of design systems, brand guidelines, component
  libraries, and past sessions for grounded generation.
- **Enterprise**: private model deployments and per-tenant vector isolation.

## Infrastructure

- Kubernetes (multi-region) for services and build workers; KEDA autoscaling on queues.
- Cloudflare for CDN, DNS, SSL, edge functions, and published-site hosting.
- Serverless workers for burst AI generation traffic.
- Observability: OpenTelemetry traces, per-agent cost/latency metrics.

## Security & Compliance

- SSO/SAML + SCIM for Enterprise; RBAC roles (owner/admin/editor/viewer/commenter).
- SOC 2 Type II controls; encrypted at rest (AES-256) and in transit (TLS 1.3).
- Tenant-scoped AI: prompts and outputs never cross tenants; opt-out of training.
