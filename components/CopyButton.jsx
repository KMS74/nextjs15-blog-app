"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";

export function CopyButton({ text, label = "Copy", className }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={`h-8 px-2.5 text-xs gap-1.5 transition-all ${className || ""}`}
      title={label}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-emerald-500 font-medium">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
}
