# Aetherform — AI Agent Architecture

Every project is served by a swarm of six specialized agents coordinated by an
**Orchestrator**. Agents never edit code or markup directly — they operate on the
design graph through a structured, permissioned tool API, so every change is
reviewable, revertible, and multiplayer-safe.

## Orchestrator

- Decomposes user intent (prompt, screenshot, URL, Figma, sketch, voice) into tasks.
- Routes each task to the best model (GPT-5-class for reasoning, code-tuned models for
  Vector, multimodal models for screenshot/sketch input) with cost caps and fallbacks.
- Runs agents concurrently where the graph allows (copy + SEO in parallel with layout),
  serializes conflicting mutations via the CRDT op log.
- Streams progress events over WebSocket to the studio UI.

## Agents

| Agent | Codename | Tools | Output |
|---|---|---|---|
| UI Designer | **Lumen** | `create_frame`, `apply_tokens`, `set_layout`, `score_aesthetics` | Layouts, typography/color systems, UX proposals |
| Frontend Engineer | **Vector** | `compile_graph`, `create_component`, `profile_bundle` | React/Next.js components, perf optimizations |
| UX Research | **Pulse** | `query_analytics`, `heatmap`, `funnel_report` | Behaviour insights, improvement tickets |
| SEO | **Beacon** | `write_meta`, `emit_schema_org`, `audit_ranking` | Metadata, schema markup, content structure fixes |
| Marketing | **Flux** | `write_copy`, `create_variant`, `run_ab_test` | Landing pages, CRO experiments |
| Accessibility | **Aria** | `audit_wcag`, `fix_contrast`, `annotate_aria` | WCAG 2.2 compliance, screen-reader optimization |

## Execution model

```
user intent ──► Orchestrator ──► task DAG
                                  │
              ┌───────────┬───────┴────┬──────────┐
              ▼           ▼            ▼          ▼
            Lumen       Vector       Flux      Beacon      (parallel)
              │           │            │          │
              └───────────┴─────┬──────┴──────────┘
                                ▼
                       graph mutations (ops)
                                ▼
                    validation gate (Aria + lint)
                                ▼
                  CRDT op log ──► revision history
```

- **Planner–executor loop**: each agent plans with the current graph + RAG context
  (brand guidelines, design system, past sessions from pgvector), executes tool calls,
  then self-evaluates against rubrics (aesthetic score, Core Web Vitals budget, WCAG).
- **Validation gate**: every mutation batch must pass Aria's accessibility audit and
  graph linting before commit; failures loop back to the producing agent (max 3 retries).
- **Human-in-the-loop**: agents can mark proposals `awaiting_review`; users approve in
  the studio, or enable full-auto mode per agent.
- **Continuous mode**: Pulse, Beacon, and Aria run on schedules against live traffic
  and published builds, filing auto-fix proposals recorded in `audits.findings`.

## Safety & limits

- Per-tenant isolation: agent context never crosses teams; Enterprise can pin private models.
- Budget guards: token/cost ceilings per generation and per billing period (metered in `usage_records`).
- Full audit trail: every agent op is attributed (`revisions.actor_type = 'agent'`) and revertible.
