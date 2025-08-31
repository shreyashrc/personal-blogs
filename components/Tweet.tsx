"use client";

import { useEffect } from "react";

export function Tweet({ id }: { id: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      const s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const url = `https://twitter.com/x/status/${id}`;
  return (
    <blockquote className="twitter-tweet">
      <a href={url}>Tweet</a>
    </blockquote>
  );
}

