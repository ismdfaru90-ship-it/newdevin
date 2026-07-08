-- Aetherform core database schema (PostgreSQL 16+, pgvector extension)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS vector;

-- ============ Identity & Teams ============

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    auth_provider TEXT NOT NULL DEFAULT 'email', -- email | google | github | saml
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    plan TEXT NOT NULL DEFAULT 'free', -- free | pro | team | enterprise
    sso_config JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE team_members (
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'editor', -- owner | admin | editor | viewer | commenter
    PRIMARY KEY (team_id, user_id)
);

-- ============ Projects & Design Graph ============

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft', -- draft | generating | published | archived
    design_tokens JSONB NOT NULL DEFAULT '{}', -- colors, typography, spacing, radii
    brand_profile JSONB, -- industry, audience, voice, conversion goals
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (team_id, slug)
);

CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    path TEXT NOT NULL, -- '/', '/about', '/blog/[slug]'
    title TEXT NOT NULL,
    seo JSONB NOT NULL DEFAULT '{}', -- meta, og, schema.org markup
    is_dynamic BOOLEAN NOT NULL DEFAULT false,
    collection_id UUID, -- for dynamic CMS pages
    UNIQUE (project_id, path)
);

-- Design graph nodes: frames, stacks, text, media, component instances
CREATE TABLE nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- frame | stack | text | image | video | component | 3d
    name TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    props JSONB NOT NULL DEFAULT '{}', -- layout, constraints, styles per breakpoint
    interactions JSONB NOT NULL DEFAULT '[]', -- animations, gestures, scroll triggers
    component_id UUID -- when type = 'component'
);
CREATE INDEX nodes_page_idx ON nodes(page_id);
CREATE INDEX nodes_parent_idx ON nodes(parent_id);

CREATE TABLE components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE, -- NULL = marketplace item
    name TEXT NOT NULL,
    definition JSONB NOT NULL, -- node subtree + variants + slots
    version INT NOT NULL DEFAULT 1
);

-- Event-sourced version history (CRDT op log)
CREATE TABLE revisions (
    id BIGSERIAL PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    actor_type TEXT NOT NULL, -- user | agent
    actor_id UUID NOT NULL,
    ops JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX revisions_project_idx ON revisions(project_id, created_at);

-- ============ CMS ============

CREATE TABLE collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- Blog, Products, Docs
    schema JSONB NOT NULL -- field definitions
);

CREATE TABLE collection_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    data JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft', -- draft | published
    published_at TIMESTAMPTZ,
    UNIQUE (collection_id, slug)
);

-- ============ AI ============

CREATE TABLE generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    input_type TEXT NOT NULL, -- text | screenshot | url | figma | sketch | voice
    prompt TEXT,
    input_asset_url TEXT,
    status TEXT NOT NULL DEFAULT 'queued', -- queued | running | succeeded | failed
    model TEXT,
    token_cost INT,
    result JSONB, -- generated graph refs, audit scores
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE agent_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    generation_id UUID REFERENCES generations(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    agent TEXT NOT NULL, -- ui_designer | frontend | ux_research | seo | marketing | a11y
    status TEXT NOT NULL DEFAULT 'running',
    summary TEXT,
    ops JSONB, -- graph mutations proposed/applied
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    finished_at TIMESTAMPTZ
);

CREATE TABLE embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    kind TEXT NOT NULL, -- brand | component | copy | session
    ref_id UUID,
    content TEXT NOT NULL,
    embedding vector(1536) NOT NULL
);
CREATE INDEX embeddings_ann_idx ON embeddings
    USING hnsw (embedding vector_cosine_ops);

CREATE TABLE audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    ux_score INT, performance_score INT, seo_score INT,
    a11y_score INT, conversion_score INT,
    findings JSONB NOT NULL DEFAULT '[]', -- issues + suggested auto-fixes
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============ Publishing ============

CREATE TABLE deployments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    revision_id BIGINT REFERENCES revisions(id),
    target TEXT NOT NULL DEFAULT 'edge', -- edge | export | github
    status TEXT NOT NULL DEFAULT 'building', -- building | live | failed | rolled_back
    url TEXT,
    build_log_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    hostname TEXT UNIQUE NOT NULL,
    ssl_status TEXT NOT NULL DEFAULT 'pending', -- pending | active | error
    verified_at TIMESTAMPTZ
);

-- ============ Marketplace ============

CREATE TABLE marketplace_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_team_id UUID NOT NULL REFERENCES teams(id),
    kind TEXT NOT NULL, -- template | component | animation | plugin | design_system | agent | theme
    name TEXT NOT NULL,
    description TEXT,
    price_cents INT NOT NULL DEFAULT 0,
    payload_ref UUID, -- component/project snapshot id
    rating NUMERIC(2,1),
    installs INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending_review',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES marketplace_items(id),
    buyer_team_id UUID NOT NULL REFERENCES teams(id),
    amount_cents INT NOT NULL,
    stripe_payment_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (item_id, buyer_team_id)
);

-- ============ Billing ============

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID UNIQUE NOT NULL REFERENCES teams(id),
    stripe_customer_id TEXT NOT NULL,
    stripe_subscription_id TEXT,
    plan TEXT NOT NULL,
    seats INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active', -- active | past_due | canceled
    current_period_end TIMESTAMPTZ
);

CREATE TABLE usage_records (
    id BIGSERIAL PRIMARY KEY,
    team_id UUID NOT NULL REFERENCES teams(id),
    metric TEXT NOT NULL, -- ai_generations | bandwidth_gb | build_minutes
    quantity NUMERIC NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX usage_team_metric_idx ON usage_records(team_id, metric, recorded_at);
