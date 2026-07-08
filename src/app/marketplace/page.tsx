"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, Download, Globe } from "lucide-react";
import clsx from "clsx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { templates, marketplaceCategories } from "@/lib/data";

export default function MarketplacePage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = templates.filter(
    (t) =>
      (category === "All" || t.category === category || category === "Templates") &&
      t.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative min-h-screen noise">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-40">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            The <span className="gradient-text">marketplace.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Templates, components, animations, plugins, design systems, and AI
            agents — built by the community, powered by Aetherform.
          </p>
        </div>

        <div className="glass mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-2xl px-4 py-3">
          <Search className="h-4 w-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates, components, agents…"
            className="flex-1 bg-transparent text-sm placeholder:text-muted/60 focus:outline-none"
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {marketplaceCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={clsx(
                "rounded-full px-4 py-1.5 text-sm transition-colors",
                category === c ? "bg-white/10 text-white" : "glass text-muted hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${t.gradient} transition-transform group-hover:scale-[1.03] flex items-center justify-center`}>
                <Globe className="h-8 w-8 text-white/40" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="glass rounded-xl px-4 py-2 text-sm">Use template</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{t.name}</p>
                  <span className="text-sm text-accent-2">{t.price}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted">
                  <span>{t.category} · by {t.author}</span>
                  <span className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {t.rating}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Download className="h-3 w-3" /> {t.installs}
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted">No results — try a different search.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
