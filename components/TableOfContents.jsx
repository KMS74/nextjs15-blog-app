"use client";

import * as React from "react";
import { List } from "lucide-react";

export function TableOfContents({ toc }) {
  if (!toc || toc.length === 0) return null;

  return (
    <div className="rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm p-5 my-8">
      <div className="flex items-center gap-2 font-semibold text-sm text-foreground mb-3 pb-2 border-b border-border/40">
        <List className="h-4 w-4 text-primary" />
        Table of Contents
      </div>
      <nav className="space-y-1.5">
        {toc.map((item, idx) => (
          <a
            key={idx}
            href={`#${item.id}`}
            className={`block text-sm transition-colors hover:text-primary ${
              item.level === 3
                ? "pl-4 text-xs text-muted-foreground hover:text-foreground"
                : "text-muted-foreground font-medium"
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
