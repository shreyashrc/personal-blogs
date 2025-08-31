export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-foreground/80">
      {children}
    </span>
  );
}

