import { Skeleton } from "@/components/Skeleton";

export default function LoadingBlogIndex() {
  return (
    <section className="py-12">
      <Skeleton className="h-7 w-24" />
      <div className="mt-8 grid gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card p-5">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="mt-2 h-3 w-1/2" />
            <Skeleton className="mt-3 h-3 w-4/5" />
          </div>
        ))}
      </div>
    </section>
  );
}

