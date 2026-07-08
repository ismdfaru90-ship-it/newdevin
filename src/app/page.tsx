"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Zap,
  Plus,
  Mic,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Globe,
  Search,
} from "lucide-react";
import clsx from "clsx";
import { templates } from "@/lib/data";

const ticker = ["Apps, Websites, Dashboards, Stores", "Build Real Products", "Create. Control. Publish"];

const goalChips = [
  "Designer Portfolio",
  "Landing Page",
  "Healthcare Startup",
  "Ecommerce Store",
  "Fintech Dashboard",
];

const goalPrompts: Record<string, string> = {
  "Designer Portfolio": "A minimalist portfolio for a 3D motion designer",
  "Landing Page": "A fintech landing page with a futuristic dashboard preview",
  "Healthcare Startup": "A premium AI healthcare startup site with glassmorphism and dark mode",
  "Ecommerce Store": "An ecommerce store for sustainable sneakers",
  "Fintech Dashboard": "A fintech landing page with a futuristic dashboard preview",
};

const templateTabs = ["All", "Websites", "Applications", "Games"];

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");

  const visibleTemplates = useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter(
      (t) =>
        (tab === "All" || tab === "Websites") &&
        (!q || t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
    );
  }, [tab, query]);

  const startBuild = (text: string) => {
    const p = text.trim();
    router.push(p ? `/generate?prompt=${encodeURIComponent(p)}` : "/generate");
  };

  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#191919]">
      {/* Marquee ticker */}
      <div className="overflow-hidden bg-[#e8ff47] py-1.5">
        <div className="marquee flex w-max items-center gap-6 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-black">
          {Array.from({ length: 6 }).flatMap((_, r) =>
            ticker.map((t, i) => (
              <span key={`${r}-${i}`} className="flex items-center gap-6">
                {t} <Zap className="h-3 w-3 fill-black" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-black/5 bg-[#f4f2ec]/90 px-6 py-3 backdrop-blur md:px-10">
        <Link href="/" className="text-lg font-bold tracking-tight">
          aetherform<span className="text-[#7c3aed]">.</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-black/70 md:flex">
          <Link href="/marketplace" className="hover:text-black">Templates</Link>
          <Link href="/generate" className="hover:text-black">AI Generator</Link>
          <Link href="/editor" className="hover:text-black">Editor</Link>
          <Link href="/pricing" className="hover:text-black">Pricing</Link>
          <span className="flex cursor-pointer items-center gap-1 hover:text-black">
            Resources <ChevronDown className="h-3.5 w-3.5" />
          </span>
        </nav>
        <Link
          href="/dashboard"
          className="rounded-lg bg-[#191919] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black"
        >
          Sign in
        </Link>
      </header>

      {/* Hero */}
      <section className="relative border-b border-black/5 px-6 pb-20 pt-16 text-center hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-3xl"
        >
          <Link
            href="/marketplace"
            className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs text-black/70 shadow-sm"
          >
            <span className="rounded bg-[#e8ff47] px-1.5 py-0.5 text-[10px] font-bold uppercase">New</span>
            Connect Aetherform to your favorite tools
            <span className="font-medium text-black underline">Read more</span>
            <ArrowRight className="h-3 w-3" />
          </Link>

          <h1 className="text-5xl font-medium leading-[1.08] tracking-tight md:text-6xl">
            Turn your ideas into real,
            <br />
            working websites
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-black/60">
            Create and publish websites, apps, dashboards, and any digital
            experience on a platform built for creators who value control.
          </p>

          {/* Prompt box */}
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-black/10 bg-white p-4 text-left shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  startBuild(prompt);
                }
              }}
              placeholder="Describe the project you want to create..."
              rows={3}
              className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-black/35"
            />
            <div className="mt-2 flex items-center justify-between">
              <button aria-label="Add to prompt" className="rounded-lg border border-black/10 p-1.5 text-black/50 hover:bg-black/5">
                <Plus className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-black/60 hover:bg-black/5">
                  Build <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <button aria-label="Voice input" className="rounded-lg p-1.5 text-black/50 hover:bg-black/5">
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  aria-label="Submit"
                  onClick={() => startBuild(prompt)}
                  disabled={!prompt.trim()}
                  className="rounded-lg bg-[#191919] p-1.5 text-white transition-opacity disabled:opacity-30"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-black/50">Start by defining the site goal</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {goalChips.map((g) => (
              <button
                key={g}
                onClick={() => startBuild(goalPrompts[g])}
                className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/70 shadow-sm transition-colors hover:border-black/30"
              >
                {g} <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Templates */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-medium tracking-tight">Start from a template</h2>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-black/10 bg-white p-1">
              {templateTabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={clsx(
                    "rounded-md px-3 py-1 text-sm transition-colors",
                    tab === t ? "bg-[#191919] text-white" : "text-black/60 hover:text-black"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-black/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-24 bg-transparent text-sm outline-none placeholder:text-black/35"
              />
            </div>
          </div>
        </div>

        {visibleTemplates.length === 0 ? (
          <p className="mt-12 text-center text-sm text-black/50">No templates match.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTemplates.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.06 }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className={`flex aspect-[16/10] items-center justify-center bg-gradient-to-br ${t.gradient}`}>
                  <Globe className="h-8 w-8 text-white/50 transition-transform group-hover:scale-110" />
                </div>
                <div className="flex items-start justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="mt-0.5 text-xs text-black/50">{t.category} · by {t.author}</p>
                  </div>
                  <span className="text-xs text-black/50">
                    {t.installs} uses · ★ {t.rating}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-5 py-2.5 text-sm font-medium shadow-sm hover:border-black/30"
          >
            Browse the marketplace <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-[#efede6] px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="text-lg font-bold tracking-tight">
              aetherform<span className="text-[#7c3aed]">.</span>
            </p>
            <p className="mt-3 text-sm font-medium">AI web builder built for professionals</p>
            <p className="mt-2 max-w-xs text-sm text-black/55">
              A web creation platform that takes you from conversation to
              production-ready, built to scale with real users from day one.
            </p>
          </div>
          {[
            { h: "Product", links: [["AI Generator", "/generate"], ["Editor", "/editor"], ["Templates", "/marketplace"], ["Pricing", "/pricing"]] },
            { h: "Resources", links: [["Dashboard", "/dashboard"], ["Marketplace", "/marketplace"], ["Docs", "/"], ["Community", "/"]] },
            { h: "Company", links: [["Privacy", "/"], ["Terms", "/"], ["Accessibility", "/"], ["Contact", "/"]] },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-xs font-semibold uppercase tracking-wide text-black/40">{col.h}</p>
              <ul className="mt-3 space-y-2 text-sm text-black/65">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-black">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-6xl text-xs text-black/40">
          © 2026 Aetherform Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
