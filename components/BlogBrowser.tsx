"use client";

import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/mdx";
import { PostCard } from "@/components/PostCard";
import { Tag } from "@/components/Tag";

export function BlogBrowser({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const tags = useMemo(() => {
    const s = new Set<string>();
    posts.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesQuery = !q
        || p.title.toLowerCase().includes(q)
        || (p.excerpt?.toLowerCase().includes(q) ?? false)
        || (p.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchesTag = !activeTag || (p.tags || []).includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [posts, query, activeTag]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  function setTag(tag: string | null) {
    setActiveTag(tag);
    setPage(1);
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <input
          type="search"
          placeholder="Search posts…"
          aria-label="Search posts"
          data-blog-search
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          className="w-full sm:max-w-sm rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTag(null)}
            className={`text-xs rounded-full px-3 py-1 border ${activeTag === null ? 'bg-primary text-primary-foreground border-transparent' : 'bg-muted/50 border-border text-foreground/80'}`}
            aria-pressed={activeTag === null}
          >All</button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t === activeTag ? null : t)}
              className={`text-xs rounded-full px-3 py-1 border ${activeTag === t ? 'bg-primary text-primary-foreground border-transparent' : 'bg-muted/50 border-border text-foreground/80'}`}
              aria-pressed={activeTag === t}
            >{t}</button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6">
        {visible.length === 0 ? (
          <p className="text-foreground/70">No posts found.</p>
        ) : (
          visible.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>

      {pageCount > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground hover:border-foreground/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            aria-label="Previous page"
          >
            ← Prev
          </button>
          <div className="text-sm text-foreground/70">Page {current} of {pageCount}</div>
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground hover:border-foreground/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={current === pageCount}
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

