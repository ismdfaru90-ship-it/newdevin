export type Agent = {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  capabilities: string[];
};

export const agents: Agent[] = [
  {
    id: "ui-designer",
    name: "Lumen",
    role: "UI Designer Agent",
    description:
      "Creates layouts, refines aesthetics, and proposes UX improvements in real time.",
    color: "from-violet-500 to-fuchsia-500",
    capabilities: ["Layout generation", "Aesthetic scoring", "UX suggestions"],
  },
  {
    id: "frontend-engineer",
    name: "Vector",
    role: "Frontend Engineer Agent",
    description:
      "Generates clean React/Next.js code, optimizes performance, and builds components.",
    color: "from-cyan-500 to-blue-500",
    capabilities: ["React/Next.js codegen", "Performance tuning", "Component builds"],
  },
  {
    id: "ux-research",
    name: "Pulse",
    role: "UX Research Agent",
    description:
      "Analyses user behaviour across sessions and suggests data-driven improvements.",
    color: "from-emerald-500 to-teal-500",
    capabilities: ["Behaviour analysis", "Heatmap insights", "Funnel diagnostics"],
  },
  {
    id: "seo",
    name: "Beacon",
    role: "SEO Agent",
    description:
      "Improves ranking with metadata, schema markup, and content structure fixes.",
    color: "from-amber-500 to-orange-500",
    capabilities: ["Metadata generation", "Schema markup", "Ranking audits"],
  },
  {
    id: "marketing",
    name: "Flux",
    role: "Marketing Agent",
    description:
      "Creates landing pages and continuously optimizes for conversion.",
    color: "from-pink-500 to-rose-500",
    capabilities: ["Landing pages", "A/B experiments", "CRO playbooks"],
  },
  {
    id: "accessibility",
    name: "Aria",
    role: "Accessibility Agent",
    description:
      "Guarantees WCAG compliance and optimizes for screen readers automatically.",
    color: "from-indigo-500 to-violet-500",
    capabilities: ["WCAG 2.2 audits", "Screen reader optimization", "Contrast fixes"],
  },
];

export type Template = {
  id: string;
  name: string;
  category: string;
  author: string;
  price: string;
  gradient: string;
  installs: string;
  rating: number;
};

export const templates: Template[] = [
  { id: "t1", name: "Nebula SaaS", category: "SaaS", author: "Aetherform Labs", price: "Free", gradient: "from-violet-600/60 to-indigo-900/60", installs: "48.2k", rating: 4.9 },
  { id: "t2", name: "Pulse Health", category: "Healthcare", author: "Nova Studio", price: "$49", gradient: "from-cyan-600/60 to-blue-900/60", installs: "31.7k", rating: 4.8 },
  { id: "t3", name: "Vertex Commerce", category: "Ecommerce", author: "Gridline", price: "$79", gradient: "from-emerald-600/60 to-teal-900/60", installs: "26.4k", rating: 4.9 },
  { id: "t4", name: "Orbit Portfolio", category: "Portfolio", author: "K. Tanaka", price: "Free", gradient: "from-fuchsia-600/60 to-purple-900/60", installs: "58.9k", rating: 4.7 },
  { id: "t5", name: "Ion Fintech", category: "Fintech", author: "Meridian", price: "$99", gradient: "from-amber-600/60 to-orange-900/60", installs: "19.3k", rating: 4.8 },
  { id: "t6", name: "Echo Agency", category: "Agency", author: "Aetherform Labs", price: "$59", gradient: "from-rose-600/60 to-pink-900/60", installs: "22.1k", rating: 4.9 },
  { id: "t7", name: "Drift Docs", category: "Documentation", author: "Papertrail", price: "Free", gradient: "from-sky-600/60 to-cyan-900/60", installs: "41.5k", rating: 4.6 },
  { id: "t8", name: "Halo Restaurant", category: "Hospitality", author: "Studio Mesa", price: "$39", gradient: "from-lime-600/60 to-emerald-900/60", installs: "12.8k", rating: 4.7 },
];

export type Project = {
  id: string;
  name: string;
  domain: string;
  status: "published" | "draft" | "generating";
  updated: string;
  gradient: string;
  scores: { ux: number; performance: number; seo: number; a11y: number; conversion: number };
};

export const projects: Project[] = [
  {
    id: "p1",
    name: "Helix Biotech",
    domain: "helixbio.com",
    status: "published",
    updated: "2 hours ago",
    gradient: "from-violet-600/50 to-indigo-900/50",
    scores: { ux: 94, performance: 98, seo: 91, a11y: 100, conversion: 87 },
  },
  {
    id: "p2",
    name: "Quantum Ledger",
    domain: "quantumledger.io",
    status: "published",
    updated: "yesterday",
    gradient: "from-cyan-600/50 to-blue-900/50",
    scores: { ux: 91, performance: 95, seo: 88, a11y: 97, conversion: 82 },
  },
  {
    id: "p3",
    name: "Studio Kairos",
    domain: "kairos.design",
    status: "draft",
    updated: "3 days ago",
    gradient: "from-fuchsia-600/50 to-purple-900/50",
    scores: { ux: 89, performance: 92, seo: 76, a11y: 94, conversion: 71 },
  },
  {
    id: "p4",
    name: "Nimbus Store",
    domain: "nimbus.shop",
    status: "generating",
    updated: "just now",
    gradient: "from-emerald-600/50 to-teal-900/50",
    scores: { ux: 0, performance: 0, seo: 0, a11y: 0, conversion: 0 },
  },
];

export const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For exploring the future of web design.",
    features: ["3 websites", "50 AI generations / mo", "Aetherform subdomain", "Community templates", "1 GB asset storage"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$24",
    period: "per month",
    description: "For designers and founders shipping fast.",
    features: ["Unlimited websites", "Unlimited AI generations", "Custom domains + SSL", "Advanced animation engine", "Code export + GitHub sync", "All 6 AI agents"],
    cta: "Go Pro",
    featured: true,
  },
  {
    name: "Team",
    price: "$56",
    period: "per seat / month",
    description: "For teams designing together in real time.",
    features: ["Everything in Pro", "Real-time multiplayer editing", "Comments & mentions", "Shared design systems", "Role-based permissions", "Team analytics"],
    cta: "Start Team trial",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual",
    description: "For organizations with advanced requirements.",
    features: ["Everything in Team", "Private AI models", "SSO / SAML", "SOC 2 & HIPAA compliance", "Dedicated infrastructure", "99.99% uptime SLA"],
    cta: "Contact sales",
    featured: false,
  },
];

export const marketplaceCategories = [
  "All",
  "Templates",
  "Components",
  "Animations",
  "Plugins",
  "Design Systems",
  "AI Agents",
  "Themes",
];
