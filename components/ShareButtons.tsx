"use client";

import { useState } from "react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return (
    <div className="mt-6 flex items-center gap-3 text-sm">
      <a
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 hover:border-foreground/30"
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank" rel="noopener noreferrer" aria-label="Share on X"
      >
        X
      </a>
      <a
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 hover:border-foreground/30"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>
      <button
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 hover:border-foreground/30"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {}
        }}
        aria-label="Copy link"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
