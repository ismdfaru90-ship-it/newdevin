"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Logo from "./Logo";

const links = [
  { href: "/generate", label: "AI Generator" },
  { href: "/editor", label: "Editor" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3">
        <Logo />
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "rounded-lg px-3.5 py-2 text-sm transition-colors",
                pathname === l.href
                  ? "bg-white/10 text-white"
                  : "text-muted hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl bg-gradient-to-r from-accent-2 via-accent to-accent-3 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            Open Studio
          </Link>
        </div>
      </nav>
    </header>
  );
}
