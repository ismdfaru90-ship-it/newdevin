"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MousePointer2,
  Square,
  Type,
  Image as ImageIcon,
  Frame,
  Sparkles,
  Play,
  Share2,
  ChevronDown,
  Eye,
  Monitor,
  Tablet,
  Smartphone,
  Layers as LayersIcon,
  Component,
  ZoomIn,
  ZoomOut,
  Trash2,
} from "lucide-react";
import clsx from "clsx";
import Logo from "@/components/Logo";

type Element = {
  id: string;
  name: string;
  type: "frame" | "text" | "button" | "image";
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  radius: number;
  text?: string;
};

const initialElements: Element[] = [
  { id: "hero", name: "Hero Section", type: "frame", x: 60, y: 50, w: 560, h: 240, fill: "rgba(124,58,237,0.18)", radius: 20 },
  { id: "headline", name: "Headline", type: "text", x: 110, y: 100, w: 460, h: 48, fill: "transparent", radius: 0, text: "Banking at the speed of light" },
  { id: "sub", name: "Subheadline", type: "text", x: 150, y: 160, w: 380, h: 24, fill: "transparent", radius: 0, text: "AI-powered finance for modern teams" },
  { id: "cta", name: "CTA Button", type: "button", x: 250, y: 210, w: 180, h: 44, fill: "linear-gradient(90deg,#22d3ee,#8b5cf6)", radius: 12, text: "Start free trial" },
  { id: "card1", name: "Feature Card 1", type: "frame", x: 60, y: 320, w: 172, h: 130, fill: "rgba(255,255,255,0.06)", radius: 16 },
  { id: "card2", name: "Feature Card 2", type: "frame", x: 254, y: 320, w: 172, h: 130, fill: "rgba(255,255,255,0.06)", radius: 16 },
  { id: "card3", name: "Feature Card 3", type: "frame", x: 448, y: 320, w: 172, h: 130, fill: "rgba(255,255,255,0.06)", radius: 16 },
];

const tools = [
  { icon: MousePointer2, label: "Select" },
  { icon: Frame, label: "Frame" },
  { icon: Square, label: "Shape" },
  { icon: Type, label: "Text" },
  { icon: ImageIcon, label: "Image" },
  { icon: Component, label: "Component" },
];

const typeIcons = { frame: Frame, text: Type, button: Square, image: ImageIcon };

export default function EditorPage() {
  const [elements, setElements] = useState(initialElements);
  const [selectedId, setSelectedId] = useState<string | null>("cta");
  const [tool, setTool] = useState("Select");
  const [device, setDevice] = useState("desktop");
  const [zoom, setZoom] = useState(1);
  const dragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const resizeRef = useRef<{ id: string; startX: number; startY: number; origW: number; origH: number } | null>(null);
  const insertCount = useRef(0);

  const selected = elements.find((e) => e.id === selectedId) ?? null;

  const onPointerDown = (e: React.PointerEvent, el: Element) => {
    e.stopPropagation();
    setSelectedId(el.id);
    dragRef.current = { id: el.id, startX: e.clientX, startY: e.clientY, origX: el.x, origY: el.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const r = resizeRef.current;
    if (r) {
      const dw = (e.clientX - r.startX) / zoom;
      const dh = (e.clientY - r.startY) / zoom;
      setElements((els) =>
        els.map((el) =>
          el.id === r.id
            ? { ...el, w: Math.max(20, Math.round(r.origW + dw)), h: Math.max(16, Math.round(r.origH + dh)) }
            : el
        )
      );
      return;
    }
    const d = dragRef.current;
    if (!d) return;
    const dx = (e.clientX - d.startX) / zoom;
    const dy = (e.clientY - d.startY) / zoom;
    setElements((els) =>
      els.map((el) => (el.id === d.id ? { ...el, x: d.origX + dx, y: d.origY + dy } : el))
    );
  };

  const onPointerUp = () => {
    dragRef.current = null;
    resizeRef.current = null;
  };

  const onResizeDown = (e: React.PointerEvent, el: Element) => {
    e.stopPropagation();
    resizeRef.current = { id: el.id, startX: e.clientX, startY: e.clientY, origW: el.w, origH: el.h };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const insertElement = (frameX: number, frameY: number) => {
    if (tool === "Select") return false;
    insertCount.current += 1;
    const n = insertCount.current;
    const base = { x: Math.round(frameX), y: Math.round(frameY), radius: 8 };
    const el: Element =
      tool === "Text"
        ? { id: `text-${n}`, name: `Text ${n}`, type: "text", w: 200, h: 28, fill: "transparent", text: "New text", ...base }
        : tool === "Image"
        ? { id: `image-${n}`, name: `Image ${n}`, type: "image", w: 160, h: 120, fill: "rgba(34,211,238,0.25)", ...base }
        : { id: `${tool.toLowerCase()}-${n}`, name: `${tool} ${n}`, type: "frame", w: 160, h: 100, fill: "rgba(139,92,246,0.25)", ...base };
    setElements((els) => [...els, el]);
    setSelectedId(el.id);
    setTool("Select");
    return true;
  };

  const deleteSelected = useCallback(() => {
    if (!selectedId) return;
    setElements((els) => els.filter((el) => el.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (e.key === "Delete" || e.key === "Backspace") deleteSelected();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deleteSelected]);

  const updateSelected = (patch: Partial<Element>) => {
    if (!selectedId) return;
    setElements((els) => els.map((el) => (el.id === selectedId ? { ...el, ...patch } : el)));
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex h-13 items-center justify-between border-b border-line/60 bg-surface/70 px-4 py-2.5">
        <div className="flex items-center gap-4">
          <Logo compact />
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-muted">Quantum Ledger</span>
            <span className="text-muted/40">/</span>
            <span>Home</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted" />
          </div>
        </div>
        <div className="glass flex items-center gap-1 rounded-xl p-1">
          {[
            { id: "desktop", icon: Monitor },
            { id: "tablet", icon: Tablet },
            { id: "mobile", icon: Smartphone },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDevice(d.id)}
              className={clsx(
                "rounded-lg p-1.5 transition-colors",
                device === d.id ? "bg-white/10 text-white" : "text-muted hover:text-white"
              )}
            >
              <d.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="mr-2 flex -space-x-2">
            {["bg-fuchsia-500", "bg-cyan-500", "bg-emerald-500"].map((c, i) => (
              <span key={i} className={`h-7 w-7 rounded-full border-2 border-bg ${c} flex items-center justify-center text-[10px] font-medium text-white`}>
                {["MK", "JT", "AI"][i]}
              </span>
            ))}
          </div>
          <button className="glass flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm hover:bg-white/10">
            <Eye className="h-4 w-4" /> Preview
          </button>
          <button className="glass flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm hover:bg-white/10">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <Link href="/dashboard" className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent-2 via-accent to-accent-3 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105">
            <Play className="h-4 w-4" /> Publish
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: tools + layers */}
        <aside className="flex w-64 shrink-0 flex-col border-r border-line/60 bg-surface/50">
          <div className="flex gap-1 border-b border-line/60 p-2">
            {tools.map((t) => (
              <button
                key={t.label}
                onClick={() => setTool(t.label)}
                title={t.label}
                className={clsx(
                  "rounded-lg p-2 transition-colors",
                  tool === t.label ? "bg-accent/30 text-white" : "text-muted hover:bg-white/5 hover:text-white"
                )}
              >
                <t.icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 px-4 pb-2 pt-4 text-xs font-medium uppercase tracking-wide text-muted">
            <LayersIcon className="h-3.5 w-3.5" /> Layers
          </div>
          <div className="flex-1 overflow-y-auto px-2">
            {elements.map((el) => {
              const Icon = typeIcons[el.type];
              return (
                <button
                  key={el.id}
                  onClick={() => setSelectedId(el.id)}
                  className={clsx(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    selectedId === el.id ? "bg-accent/25 text-white" : "text-muted hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{el.name}</span>
                </button>
              );
            })}
          </div>
          <div className="border-t border-line/60 p-3">
            <button className="glass flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm text-accent-2 hover:bg-white/10">
              <Sparkles className="h-4 w-4" /> Ask AI to redesign
            </button>
          </div>
        </aside>

        {/* Canvas */}
        <main
          className="grid-bg relative flex-1 overflow-auto"
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerDown={() => setSelectedId(null)}
        >
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 rounded-xl border border-line/60 bg-surface/90 p-1">
            <button aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(0.25, Math.round((z - 0.25) * 100) / 100))} className="rounded-lg p-1.5 text-muted hover:bg-white/5 hover:text-white">
              <ZoomOut className="h-4 w-4" />
            </button>
            <button onClick={() => setZoom(1)} className="min-w-12 rounded-lg px-1 py-1 text-xs text-muted hover:text-white">
              {Math.round(zoom * 100)}%
            </button>
            <button aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(2, Math.round((z + 0.25) * 100) / 100))} className="rounded-lg p-1.5 text-muted hover:bg-white/5 hover:text-white">
              <ZoomIn className="h-4 w-4" />
            </button>
            <button aria-label="Delete element" onClick={deleteSelected} disabled={!selectedId} className="rounded-lg p-1.5 text-muted hover:bg-white/5 hover:text-white disabled:opacity-30">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="flex min-h-full items-center justify-center p-10">
            <div
              className={clsx(
                "relative shrink-0 rounded-2xl border border-line bg-bg shadow-2xl transition-all",
                device === "desktop" && "h-[500px] w-[680px]",
                device === "tablet" && "h-[500px] w-[480px]",
                device === "mobile" && "h-[500px] w-[300px]"
              )}
              style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
              onPointerDown={(e) => {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                if (insertElement((e.clientX - rect.left) / zoom, (e.clientY - rect.top) / zoom)) {
                  e.stopPropagation();
                }
              }}
            >
              <span className="absolute -top-6 left-0 text-xs text-muted">Home · {device}</span>
              {elements.map((el) => (
                <div
                  key={el.id}
                  onPointerDown={(e) => onPointerDown(e, el)}
                  className={clsx(
                    "absolute cursor-move select-none touch-none",
                    selectedId === el.id && "ring-2 ring-accent-2"
                  )}
                  style={{
                    left: el.x,
                    top: el.y,
                    width: el.w,
                    height: el.h,
                    background: el.fill,
                    borderRadius: el.radius,
                  }}
                >
                  {el.type === "text" && (
                    <span className={clsx("flex h-full items-center justify-center text-center", el.id === "headline" ? "text-3xl font-semibold tracking-tight" : "text-sm text-muted")}>
                      {el.text}
                    </span>
                  )}
                  {el.type === "button" && (
                    <span className="flex h-full items-center justify-center text-sm font-medium text-white">
                      {el.text}
                    </span>
                  )}
                  {selectedId === el.id && (
                    <>
                      {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1"].map((pos) => (
                        <span key={pos} className={`absolute ${pos} h-2 w-2 rounded-sm border border-accent-2 bg-bg`} />
                      ))}
                      <span
                        onPointerDown={(e) => onResizeDown(e, el)}
                        className="absolute -bottom-1 -right-1 h-2.5 w-2.5 cursor-se-resize touch-none rounded-sm border border-accent-2 bg-accent-2"
                      />
                      <span className="absolute -top-6 left-0 rounded bg-accent-2 px-1.5 py-0.5 text-[10px] font-medium text-black">
                        {el.w} × {el.h}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right: properties */}
        <aside className="w-72 shrink-0 overflow-y-auto border-l border-line/60 bg-surface/50 p-4">
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted">Properties</h3>
          {selected ? (
            <div className="mt-4 space-y-5">
              <div>
                <label className="text-xs text-muted">Name</label>
                <input
                  value={selected.name}
                  onChange={(e) => updateSelected({ name: e.target.value })}
                  className="glass mt-1.5 w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(["x", "y", "w", "h"] as const).map((k) => (
                  <div key={k}>
                    <label className="text-xs uppercase text-muted">{k}</label>
                    <input
                      type="number"
                      value={Math.round(selected[k])}
                      onChange={(e) => updateSelected({ [k]: Number(e.target.value) })}
                      className="glass mt-1.5 w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-2"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs text-muted">Corner radius — {selected.radius}px</label>
                <input
                  type="range"
                  min={0}
                  max={40}
                  value={selected.radius}
                  onChange={(e) => updateSelected({ radius: Number(e.target.value) })}
                  className="mt-2 w-full accent-[hsl(258,90%,66%)]"
                />
              </div>
              {selected.text !== undefined && (
                <div>
                  <label className="text-xs text-muted">Text</label>
                  <input
                    value={selected.text}
                    onChange={(e) => updateSelected({ text: e.target.value })}
                    className="glass mt-1.5 w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-2"
                  />
                </div>
              )}
              <div>
                <label className="text-xs text-muted">Design tokens</label>
                <div className="mt-2 flex gap-2">
                  {["#22d3ee", "#8b5cf6", "#ec4899", "#34d399", "#f59e0b"].map((c) => (
                    <button
                      key={c}
                      onClick={() => updateSelected({ fill: c })}
                      className="h-7 w-7 rounded-lg border border-white/10 transition-transform hover:scale-110"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="flex items-center gap-2 text-xs font-medium text-accent-2">
                  <Sparkles className="h-3.5 w-3.5" /> AI suggestion
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Increasing the CTA contrast and moving it 12px higher is predicted to lift conversions by ~8%.
                </p>
                <button className="mt-3 w-full rounded-lg bg-accent/30 px-3 py-1.5 text-xs font-medium text-white hover:bg-accent/40">
                  Apply automatically
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">Select an element on the canvas to edit its properties.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
