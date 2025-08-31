import { Skeleton } from "@/components/Skeleton";

export default function LoadingBlogPost() {
  return (
    <article className="py-12">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-3 h-9 w-4/5" />
      <div className="mt-8 space-y-3 max-w-prose">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </article>
  );
}

