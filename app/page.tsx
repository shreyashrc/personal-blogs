import Link from "next/link";
import type { Metadata } from "next";

import { getSiteName, getSiteDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: getSiteName(),
  description: getSiteDescription(),
  alternates: { canonical: "/" },
};

export default function Home() {
  const siteName = getSiteName();
  return (
    <section className="py-16 sm:py-24 animate-fade-in">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Hi, I’m Shreyash.</h1>
      <p className="mt-4 text-foreground/80 max-w-prose">
        Welcome to <span className="font-semibold">{siteName}</span> — a minimal blog where I share notes on engineering,
        product, and learning in public.
      </p>
      <div className="mt-8">
        <Link
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          href="/blog"
          aria-label="Read the blog"
        >
          Read the blog
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
