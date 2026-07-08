"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  Layers,
  Bot,
  Store,
  Code2,
  Gauge,
  Users,
  Rocket,
  ArrowRight,
  MousePointer2,
  Palette,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { agents, templates } from "@/lib/data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const features = [
  {
    icon: Wand2,
    title: "AI Website Generator",
    desc: "Describe your idea in natural language — get a production-ready site with layouts, copy, SEO, and animations in seconds.",
  },
  {
    icon: Layers,
    title: "Infinite Canvas Editor",
    desc: "A Figma-quality visual editor with auto-layout, design tokens, components, and version history.",
  },
  {
    icon: Bot,
    title: "Autonomous AI Agents",
    desc: "Six specialized agents handle design, code, UX research, SEO, marketing, and accessibility — around the clock.",
  },
  {
    icon: Code2,
    title: "Production Code Engine",
    desc: "Export clean React, Next.js, Vue, or Svelte with Tailwind. Sync to GitHub. Deploy to the edge in one click.",
  },
  {
    icon: Gauge,
    title: "Website Intelligence",
    desc: "Continuous AI audits for UX, performance, SEO, accessibility, and conversion — with automatic fixes.",
  },
  {
    icon: Users,
    title: "Real-Time Multiplayer",
    desc: "Design together like Figma. Comments, mentions, permissions, and enterprise workspaces built in.",
  },
  {
    icon: Store,
    title: "Component Marketplace",
    desc: "Buy and sell templates, components, animations, plugins, design systems, and even AI agents.",
  },
  {
    icon: Rocket,
    title: "One-Click Publishing",
    desc: "Custom domains, SSL, global CDN, edge deployment, analytics, A/B testing, CMS, and auth — built in.",
  },
];

const sources = [
  "Text prompt",
  "Screenshot",
  "URL reference",
  "Figma design",
  "Hand sketch",
  "Voice command",
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip noise">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center grid-bg">
        <div className="aurora absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-accent/40" />
        <div className="aurora absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-accent-2/30" style={{ animationDelay: "-5s" }} />
        <div className="aurora absolute bottom-1/4 left-1/2 h-64 w-64 rounded-full bg-accent-3/30" style={{ animationDelay: "-9s" }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl"
        >
          <div className="glass mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted">
            <Sparkles className="h-3.5 w-3.5 text-accent-2" />
            Introducing Aetherform — the AI-native web studio
          </div>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Design at the speed
            <br />
            of <span className="gradient-text">thought.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted md:text-xl">
            Describe your idea. Watch autonomous AI agents design, build, and
            ship a production-ready website — with Apple-level polish,
            responsive layouts, SEO, and accessibility built in.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/generate"
              className="glow flex items-center gap-2 rounded-2xl bg-gradient-to-r from-accent-2 via-accent to-accent-3 px-7 py-3.5 font-medium text-white transition-transform hover:scale-105"
            >
              <Wand2 className="h-4 w-4" /> Generate a website
            </Link>
            <Link
              href="/editor"
              className="glass flex items-center gap-2 rounded-2xl px-7 py-3.5 font-medium transition-colors hover:bg-white/10"
            >
              <MousePointer2 className="h-4 w-4" /> Open the editor
            </Link>
          </div>

          {/* Prompt demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="glass-strong mx-auto mt-16 max-w-2xl rounded-2xl p-4 text-left"
          >
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              AI Generator — live
            </div>
            <p className="mt-3 font-mono text-sm text-white/90">
              &quot;Create a premium AI healthcare startup website with
              Apple-level design, glassmorphism, smooth animations, dark mode,
              and a futuristic dashboard.&quot;
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Structure ✓", "Components ✓", "Copy ✓", "SEO ✓", "Animations ✓", "Deployed ✓"].map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.25 }}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs text-accent-2"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Generate-from sources */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <motion.div {...fadeUp} className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Generate from <span className="gradient-text">anything.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Text, screenshots, URLs, Figma files, hand sketches, or your voice —
            Aetherform turns any input into a complete website.
          </p>
        </motion.div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-6">
          {sources.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-colors hover:bg-white/10"
            >
              <Palette className="h-5 w-5 text-accent-2" />
              <span className="text-sm">{s}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <motion.div {...fadeUp} className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Everything a web team does.
            <br />
            <span className="gradient-text">Done by AI.</span>
          </h2>
        </motion.div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
              className="glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <f.icon className="h-6 w-6 text-accent-2 transition-transform group-hover:scale-110" />
              <h3 className="mt-4 font-medium">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Agents */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <motion.div {...fadeUp} className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Meet your <span className="gradient-text">AI design team.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Six autonomous agents collaborate on every project — designing,
            coding, researching, and optimizing while you sleep.
          </p>
        </motion.div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${a.color}`}>
                <Bot className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-4 font-medium">
                {a.name} <span className="text-sm text-muted">· {a.role}</span>
              </h3>
              <p className="mt-2 text-sm text-muted">{a.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {a.capabilities.map((c) => (
                  <span key={c} className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-muted">
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Templates showcase */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <motion.div {...fadeUp} className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Start from the <span className="gradient-text">marketplace.</span>
            </h2>
            <p className="mt-3 max-w-md text-muted">
              Thousands of templates, components, and AI agents from the community.
            </p>
          </div>
          <Link href="/marketplace" className="hidden items-center gap-1 text-sm text-accent-2 hover:underline md:flex">
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {templates.slice(0, 4).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${t.gradient} border border-white/10 transition-transform group-hover:scale-[1.03] flex items-center justify-center`}>
                <Globe className="h-8 w-8 text-white/40" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted">{t.category}</p>
                </div>
                <span className="text-sm text-accent-2">{t.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-4xl px-6 py-32 text-center">
        <motion.div {...fadeUp} className="glass-strong glow relative overflow-hidden rounded-3xl p-14">
          <div className="aurora absolute -left-10 -top-10 h-48 w-48 rounded-full bg-accent/40" />
          <h2 className="relative text-3xl font-semibold tracking-tight md:text-5xl">
            The future of web design
            <br />
            <span className="gradient-text">starts with a sentence.</span>
          </h2>
          <Link
            href="/generate"
            className="relative mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-accent-2 via-accent to-accent-3 px-8 py-4 font-medium text-white transition-transform hover:scale-105"
          >
            <Sparkles className="h-4 w-4" /> Start creating — it&apos;s free
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
