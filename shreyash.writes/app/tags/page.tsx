import Link from "next/link";
import type { Metadata } from "next";
import { getAllTags } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Tags | shreyash.writes",
  description: "Browse posts by tag on shreyash.writes",
  alternates: { canonical: "/tags" },
};

export default function TagsIndex() {
  const tags = getAllTags();
  return (
    <section className="py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Tags</h1>
      {tags.length === 0 ? (
        <p className="mt-8 text-foreground/70">No tags yet.</p>
      ) : (
        <ul className="mt-6 flex flex-wrap gap-3">
          {tags.map((t) => (
            <li key={t}>
              <Link href={`/tags/${encodeURIComponent(t)}`} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs hover:border-foreground/30">
                {t}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

