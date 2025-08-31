import { Skeleton } from "@/components/Skeleton";

export default function LoadingRoot() {
  return (
    <section className="py-16 sm:py-24">
      <Skeleton className="h-8 w-56" />
      <div className="mt-6 space-y-3 max-w-prose">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="mt-10 grid gap-6">
        <div className="card p-5">
          <Skeleton className="h-5 w-2/3" />
          <div className="mt-2 space-y-2">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
        <div className="card p-5">
          <Skeleton className="h-5 w-2/3" />
          <div className="mt-2 space-y-2">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      </div>
    </section>
  );
}

