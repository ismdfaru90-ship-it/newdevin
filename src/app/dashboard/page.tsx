"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wand2,
  Bot,
  Plus,
  Globe,
  LayoutGrid,
  Store,
  Settings,
  FolderOpen,
  BarChart3,
  Send,
  Sparkles,
  PencilRuler,
  Loader2,
} from "lucide-react";
import clsx from "clsx";
import Logo from "@/components/Logo";
import { projects, agents } from "@/lib/data";

const nav = [
  { icon: LayoutGrid, label: "Projects", active: true },
  { icon: FolderOpen, label: "Assets" },
  { icon: Store, label: "Marketplace" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

const statusStyles = {
  published: "bg-emerald-400/15 text-emerald-400",
  draft: "bg-amber-400/15 text-amber-400",
  generating: "bg-accent-2/15 text-accent-2",
};

export default function DashboardPage() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    {
      role: "ai",
      text: "Hi! I'm your Aetherform copilot. I can generate pages, redesign sections, fix accessibility issues, or audit performance. What should we work on?",
    },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: `On it — I've dispatched the agent swarm to handle "${userText}". Lumen is drafting layout options and Vector will have components ready shortly. Check the activity feed for progress.`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-line/60 bg-surface/50 p-4">
        <Logo />
        <nav className="mt-8 space-y-1">
          {nav.map((n) => (
            <button
              key={n.label}
              className={clsx(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                n.active ? "bg-white/10 text-white" : "text-muted hover:bg-white/5 hover:text-white"
              )}
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <div className="glass rounded-xl p-4">
            <p className="text-xs font-medium">AI generations</p>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-accent-2 to-accent" />
            </div>
            <p className="mt-2 text-xs text-muted">312 / 500 this month</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
            <p className="mt-1 text-sm text-muted">4 websites · 2 published · 1 generating</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/generate"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-2 via-accent to-accent-3 px-4 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              <Wand2 className="h-4 w-4" /> Generate with AI
            </Link>
            <button className="glass flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm hover:bg-white/10">
              <Plus className="h-4 w-4" /> Blank project
            </button>
          </div>
        </div>

        {/* Project cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass group overflow-hidden rounded-2xl"
            >
              <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${p.gradient}`}>
                {p.status === "generating" ? (
                  <Loader2 className="h-8 w-8 animate-spin text-white/60" />
                ) : (
                  <Globe className="h-8 w-8 text-white/40" />
                )}
                <Link
                  href="/editor"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <span className="glass flex items-center gap-2 rounded-xl px-4 py-2 text-sm">
                    <PencilRuler className="h-4 w-4" /> Open editor
                  </span>
                </Link>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{p.name}</h3>
                    <p className="text-xs text-muted">{p.domain} · {p.updated}</p>
                  </div>
                  <span className={clsx("rounded-full px-2.5 py-1 text-xs capitalize", statusStyles[p.status])}>
                    {p.status}
                  </span>
                </div>
                {p.status !== "generating" && (
                  <div className="mt-4 flex gap-4">
                    {Object.entries(p.scores).map(([k, v]) => (
                      <div key={k} className="text-center">
                        <p className={clsx("text-sm font-semibold", v >= 90 ? "text-emerald-400" : "text-amber-400")}>{v}</p>
                        <p className="text-[10px] uppercase tracking-wide text-muted">{k}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Agent activity */}
        <h2 className="mt-12 text-lg font-medium">Agent activity</h2>
        <div className="mt-4 space-y-2">
          {[
            { agent: agents[3], text: "Regenerated metadata & schema markup for Helix Biotech — SEO 88 → 91." },
            { agent: agents[5], text: "Fixed 3 contrast violations on Quantum Ledger checkout — WCAG AA restored." },
            { agent: agents[0], text: "Proposed 2 hero layout variants for Studio Kairos (awaiting review)." },
            { agent: agents[1], text: "Reduced Nimbus Store bundle by 34% via code-splitting." },
          ].map((a, i) => (
            <div key={i} className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${a.agent.color}`}>
                <Bot className="h-3.5 w-3.5 text-white" />
              </span>
              <span className="font-medium">{a.agent.name}</span>
              <span className="text-muted">{a.text}</span>
            </div>
          ))}
        </div>
      </main>

      {/* AI assistant sidebar */}
      <aside className="hidden w-80 shrink-0 flex-col border-l border-line/60 bg-surface/50 lg:flex">
        <div className="flex items-center gap-2 border-b border-line/60 p-4">
          <Sparkles className="h-4 w-4 text-accent-2" />
          <span className="text-sm font-medium">AI Copilot</span>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={clsx(
                "max-w-[90%] rounded-2xl px-4 py-3 text-sm",
                m.role === "ai" ? "glass" : "ml-auto bg-accent/20"
              )}
            >
              {m.text}
            </div>
          ))}
        </div>
        <div className="border-t border-line/60 p-4">
          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask the copilot anything…"
              className="flex-1 bg-transparent text-sm placeholder:text-muted/60 focus:outline-none"
            />
            <button onClick={send} className="text-accent-2 transition-transform hover:scale-110">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
