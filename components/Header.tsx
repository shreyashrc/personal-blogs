"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="link text-sm text-foreground/80 hover:text-foreground data-[active=true]:text-foreground"
      data-active={isActive}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto max-w-3xl px-6 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Go to homepage" className="focus-outline">
          <Logo />
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="link text-sm text-foreground/80 hover:text-foreground"
            aria-label="GitHub profile"
          >
            GitHub
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground/80 hover:text-foreground hover:border-foreground/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Open menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`md:hidden ${open ? "block animate-slide-down" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto max-w-3xl px-6 pb-6">
          <div className="card p-3">
            <div className="flex flex-col items-start gap-3">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="link text-sm text-foreground/80 hover:text-foreground"
                aria-label="GitHub profile"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

