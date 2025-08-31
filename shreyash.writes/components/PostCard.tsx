import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/lib/mdx";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="card card-hover p-4 sm:p-5">
      <h3 className="text-lg font-semibold tracking-tight">
        <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-4 focus-outline">
          {post.title}
        </Link>
      </h3>
      <p className="text-sm text-foreground/70 mt-1">
        {formatDate(post.date)} • {post.readingTime}
      </p>
      {post.excerpt && (
        <p className="text-foreground/80 mt-3">
          {post.excerpt}
        </p>
      )}
      <div className="mt-4">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground/80 hover:text-foreground hover:border-foreground/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          aria-label={`Read ${post.title}`}
        >
          Read more
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

