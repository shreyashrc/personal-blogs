import { getAllPostsMeta } from "@/lib/mdx";
import { PostCard } from "@/components/PostCard";

export function RelatedPosts({ slug }: { slug: string }) {
  const posts = getAllPostsMeta();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return null;
  const related = posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      p,
      score: (p.tags || []).filter((t) => (current.tags || []).includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => (b.score - a.score) || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, 3)
    .map((x) => x.p);

  if (related.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading" className="text-lg font-semibold tracking-tight">Related posts</h2>
      <div className="mt-6 grid gap-6">
        {related.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}

