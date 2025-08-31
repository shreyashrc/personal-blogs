import type { Metadata } from "next";
import { filterPostsByTag, getAllTags } from "@/lib/mdx";
import { PostCard } from "@/components/PostCard";

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `#${tag} | shreyash.writes`,
    description: `Posts tagged with ${tag}`,
    alternates: { canonical: `/tags/${encodeURIComponent(tag)}` },
  };
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = filterPostsByTag(tag);
  return (
    <section className="py-12">
      <h1 className="text-2xl font-semibold tracking-tight">#{tag}</h1>
      <div className="mt-8 grid gap-6">
        {posts.length === 0 ? (
          <p className="text-foreground/70">No posts found for this tag.</p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </section>
  );
}

