import { getSiteName, getSiteInitials } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  const name = getSiteName();
  const initials = getSiteInitials();
  return (
    <div className={["inline-flex items-center gap-2", className].join(" ")}
      aria-label={`${name} logo`}
      title={name}
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-sm font-semibold uppercase">
        {initials}
      </span>
      <span className="font-semibold tracking-tight">{name}</span>
    </div>
  );
}

