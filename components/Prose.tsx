import React from "react";

export function Prose({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={["prose prose-zinc dark:prose-invert max-w-none", className].join(" ")}>{children}</div>
  );
}

