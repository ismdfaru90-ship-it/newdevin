import Link from "next/link";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent-2 via-accent to-accent-3 glow">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-white" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 L20 20 L12 15.5 L4 20 Z" />
        </svg>
      </span>
      {!compact && (
        <span className="text-lg font-semibold tracking-tight">
          Aether<span className="gradient-text">form</span>
        </span>
      )}
    </Link>
  );
}
