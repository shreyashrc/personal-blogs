export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={["inline-flex items-center gap-2", className].join(" ")}
      aria-label="shreyash.writes logo"
      title="shreyash.writes"
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-sm">
        sw
      </span>
      <span className="font-semibold tracking-tight">shreyash.writes</span>
    </div>
  );
}

