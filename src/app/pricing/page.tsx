"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import clsx from "clsx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pricingTiers } from "@/lib/data";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen noise">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-40">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Simple pricing for the <span className="gradient-text">future of web.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Start free. Scale with unlimited AI, collaboration, and enterprise-grade security.
          </p>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={clsx(
                "glass relative flex flex-col rounded-2xl p-7",
                tier.featured && "glow border-accent/50"
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-2 to-accent px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              )}
              <h2 className="font-medium">{tier.name}</h2>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                <span className="text-sm text-muted">{tier.period}</span>
              </div>
              <p className="mt-3 text-sm text-muted">{tier.description}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={clsx(
                  "mt-8 rounded-xl px-4 py-2.5 text-sm font-medium transition-transform hover:scale-105",
                  tier.featured
                    ? "bg-gradient-to-r from-accent-2 via-accent to-accent-3 text-white"
                    : "glass hover:bg-white/10"
                )}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
