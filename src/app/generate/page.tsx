"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Wand2,
  Bot,
  Check,
  Loader2,
  Mic,
  Image as ImageIcon,
  Link2,
  Frame,
  PenTool,
  Type,
  Rocket,
  PencilRuler,
} from "lucide-react";
import Navbar from "@/components/Navbar";

type Step = {
  agent: string;
  action: string;
  color: string;
};

const pipeline: Step[] = [
  { agent: "Lumen", action: "Designing layout system & typography", color: "text-fuchsia-400" },
  { agent: "Lumen", action: "Composing hero, features & CTA sections", color: "text-fuchsia-400" },
  { agent: "Vector", action: "Generating React components & Tailwind styles", color: "text-cyan-400" },
  { agent: "Flux", action: "Writing conversion-optimized copy", color: "text-rose-400" },
  { agent: "Beacon", action: "Generating SEO metadata & schema markup", color: "text-amber-400" },
  { agent: "Aria", action: "Auditing WCAG compliance & contrast", color: "text-indigo-400" },
  { agent: "Vector", action: "Optimizing bundle & edge deployment", color: "text-cyan-400" },
];

const inputModes = [
  { icon: Type, label: "Text" },
  { icon: ImageIcon, label: "Screenshot" },
  { icon: Link2, label: "URL" },
  { icon: Frame, label: "Figma" },
  { icon: PenTool, label: "Sketch" },
  { icon: Mic, label: "Voice" },
];

const samplePrompts = [
  "A premium AI healthcare startup site with glassmorphism and dark mode",
  "A minimalist portfolio for a 3D motion designer",
  "A fintech landing page with a futuristic dashboard preview",
  "An ecommerce store for sustainable sneakers",
];

function deriveSite(prompt: string) {
  const p = prompt.toLowerCase();
  const theme = p.includes("health")
    ? { name: "Vitalis", tag: "AI-powered care for everyone", accent: "from-cyan-500 to-blue-600", pill: "Healthcare" }
    : p.includes("fintech") || p.includes("bank")
    ? { name: "Ledgerly", tag: "Banking at the speed of light", accent: "from-amber-500 to-orange-600", pill: "Fintech" }
    : p.includes("commerce") || p.includes("store") || p.includes("shop")
    ? { name: "Meridian", tag: "Commerce, reimagined", accent: "from-emerald-500 to-teal-600", pill: "Ecommerce" }
    : p.includes("portfolio") || p.includes("designer")
    ? { name: "Kairos", tag: "Work that speaks for itself", accent: "from-fuchsia-500 to-purple-600", pill: "Portfolio" }
    : { name: "Nova", tag: "Built for what comes next", accent: "from-violet-500 to-indigo-600", pill: "Startup" };
  return theme;
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("Text");
  const [phase, setPhase] = useState<"idle" | "generating" | "done">("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const site = deriveSite(prompt || "startup");

  const generate = useCallback(() => {
    if (!prompt.trim() || phase === "generating") return;
    setPhase("generating");
    setStepIndex(0);
    timerRef.current = setInterval(() => {
      setStepIndex((i) => {
        if (i >= pipeline.length - 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeout(() => setPhase("done"), 700);
          return i + 1;
        }
        return i + 1;
      });
    }, 900);
  }, [prompt, phase]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen noise">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-36">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            What should we <span className="gradient-text">build today?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Describe your website. Our AI agents will design, write, code, and
            optimize it — in about a minute.
          </p>
        </div>

        {/* Input modes */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {inputModes.map((m) => (
            <button
              key={m.label}
              onClick={() => setMode(m.label)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-colors ${
                mode === m.label ? "bg-white/10 text-white" : "glass text-muted hover:text-white"
              }`}
            >
              <m.icon className="h-4 w-4" /> {m.label}
            </button>
          ))}
        </div>

        {/* Prompt box */}
        <div className="glass-strong mt-6 rounded-2xl p-5">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='e.g. "Create a premium AI healthcare startup website with Apple-level design, glassmorphism, smooth animations, dark mode, and a futuristic dashboard."'
            rows={3}
            className="w-full resize-none bg-transparent font-mono text-sm text-white placeholder:text-muted/60 focus:outline-none"
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted">{mode} input · GPT-5-class model · Agent swarm</span>
            <button
              onClick={generate}
              disabled={!prompt.trim() || phase === "generating"}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-2 via-accent to-accent-3 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {phase === "generating" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="h-4 w-4" />
              )}
              Generate
            </button>
          </div>
        </div>

        {/* Sample prompts */}
        {phase === "idle" && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {samplePrompts.map((s) => (
              <button
                key={s}
                onClick={() => setPrompt(s)}
                className="glass rounded-full px-4 py-1.5 text-xs text-muted transition-colors hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Pipeline */}
        <AnimatePresence>
          {phase !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass mt-10 rounded-2xl p-6"
            >
              <h2 className="mb-4 text-sm font-medium text-muted">Agent pipeline</h2>
              <div className="space-y-3">
                {pipeline.map((step, i) => {
                  const state = i < stepIndex ? "done" : i === stepIndex && phase === "generating" ? "active" : "pending";
                  return (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      {state === "done" || phase === "done" ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : state === "active" ? (
                        <Loader2 className="h-4 w-4 animate-spin text-accent-2" />
                      ) : (
                        <span className="h-4 w-4 rounded-full border border-line" />
                      )}
                      <Bot className={`h-4 w-4 ${step.color}`} />
                      <span className={state === "pending" && phase !== "done" ? "text-muted/50" : ""}>
                        <span className={`font-medium ${step.color}`}>{step.agent}</span>{" "}
                        <span className="text-muted">·</span> {step.action}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generated preview */}
        <AnimatePresence>
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mt-10"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium">
                  Generated: <span className="gradient-text">{site.name}</span>
                </h2>
                <div className="flex gap-2">
                  <Link
                    href="/editor"
                    className="glass flex items-center gap-2 rounded-xl px-4 py-2 text-sm hover:bg-white/10"
                  >
                    <PencilRuler className="h-4 w-4" /> Open in editor
                  </Link>
                  <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-2 via-accent to-accent-3 px-4 py-2 text-sm font-medium text-white hover:scale-105 transition-transform">
                    <Rocket className="h-4 w-4" /> Publish
                  </button>
                </div>
              </div>

              {/* Mock generated site */}
              <div className="glass-strong overflow-hidden rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 border-b border-line/60 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-3 rounded-md bg-white/5 px-3 py-0.5 font-mono text-xs text-muted">
                    {site.name.toLowerCase()}.aetherform.site
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <span className={`bg-gradient-to-r ${site.accent} bg-clip-text text-lg font-semibold text-transparent`}>
                      {site.name}
                    </span>
                    <div className="flex gap-4 text-xs text-muted">
                      <span>Product</span><span>Pricing</span><span>About</span>
                      <span className={`rounded-full bg-gradient-to-r ${site.accent} px-3 py-0.5 text-white`}>Get started</span>
                    </div>
                  </div>
                  <div className="mt-12 text-center">
                    <span className="glass rounded-full px-3 py-1 text-xs text-muted">{site.pill}</span>
                    <h3 className="mt-5 text-4xl font-semibold tracking-tight">{site.tag}</h3>
                    <p className="mx-auto mt-3 max-w-md text-sm text-muted">
                      Generated hero copy tuned to your brand voice, audience, and conversion goals.
                    </p>
                    <div className={`mx-auto mt-6 inline-block rounded-xl bg-gradient-to-r ${site.accent} px-6 py-2.5 text-sm font-medium text-white`}>
                      Start free trial
                    </div>
                  </div>
                  <div className="mt-12 grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="glass rounded-xl p-4">
                        <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${site.accent} opacity-80`} />
                        <div className="mt-3 h-2.5 w-2/3 rounded bg-white/15" />
                        <div className="mt-2 h-2 w-full rounded bg-white/8" />
                        <div className="mt-1.5 h-2 w-4/5 rounded bg-white/8" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Audit scores */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
                {[
                  { label: "UX", score: 96 },
                  { label: "Performance", score: 99 },
                  { label: "SEO", score: 94 },
                  { label: "Accessibility", score: 100 },
                  { label: "Conversion", score: 91 },
                ].map((s) => (
                  <div key={s.label} className="glass rounded-xl p-4 text-center">
                    <p className="text-2xl font-semibold text-emerald-400">{s.score}</p>
                    <p className="mt-1 text-xs text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
