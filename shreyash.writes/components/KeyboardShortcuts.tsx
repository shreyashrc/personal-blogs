"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function KeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    let buffer = "";
    let timer: any;
    function onKey(e: KeyboardEvent) {
      // Focus blog search with '/'
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const el = document.querySelector<HTMLInputElement>("[data-blog-search]");
        if (el) {
          e.preventDefault();
          el.focus();
          return;
        }
      }
      // Simple 'g' followed by 'b' or 'h' navigation like GitHub
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => { buffer = ""; }, 600);
      buffer += e.key.toLowerCase();
      if (buffer === "gb") {
        router.push("/blog");
        buffer = "";
      } else if (buffer === "gh") {
        router.push("/");
        buffer = "";
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return null;
}
