import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/lib/mdx";
import { Tag } from "@/components/Tag";

export function PostHeader({ meta }: { meta: PostMeta }) {
  return (
    <header className="mb-10">
      <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
        <time dateTime={meta.date}>{formatDate(meta.date)}</time>
        <span aria-hidden="true">•</span>
        <span>{meta.readingTime}</span>
        {meta.author && (
          <>
            <span aria-hidden="true">•</span>
            <span>By {meta.author}</span>
          </>
        )}
      </div>
      <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
        {meta.title}
      </h1>
      {meta.excerpt && (
        <p className="mt-3 max-w-prose text-foreground/80">{meta.excerpt}</p>
      )}
      {meta.featuredImage && (
        <div className="mt-6 overflow-hidden rounded-xl border border-border">
          <Image
            src={meta.featuredImage}
            alt="Featured image"
            width={1200}
            height={630}
            className="w-full h-auto"
            priority
          />
        </div>
      )}
      {meta.tags && meta.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {meta.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
    </header>
  );
}

