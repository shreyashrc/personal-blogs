import type { Metadata } from "next";
import { getAllPostsMeta } from "@/lib/mdx";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import { getSiteName } from "@/lib/site";
export const metadata: Metadata = {
  title: `Blog | ${getSiteName()}`,
  description: `All posts from ${getSiteName()}`,
  alternates: { canonical: "/blog" },
};

const BlogBrowser = dynamic(() => import("@/components/BlogBrowser").then(m => m.BlogBrowser), { ssr: false });

export default function BlogIndex() {
  const preview = cookies().get("preview_drafts")?.value === "1" || process.env.NODE_ENV !== "production";
  const posts = getAllPostsMeta({ includeDrafts: preview, includeFuture: preview });
  return (
    <section className="py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
      {posts.length === 0 ? (
        <p className="mt-8 text-foreground/70">No posts yet. Check back soon.</p>
      ) : (
        <BlogBrowser posts={posts} />
      )}
    </section>
  );
}

