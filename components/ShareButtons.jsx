"use client";

import * as React from "react";
import { Share2, Check, Copy } from "lucide-react";
import { Button } from "./ui/button";

export function ShareButtons({ title, id }) {
  const [copied, setCopied] = React.useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `https://karimshabana.dev/posts/${id}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Check out "${title}" by @KarimShabana`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 mr-1">
        <Share2 className="h-3.5 w-3.5" /> Share:
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="h-8 px-2.5 text-xs gap-1.5"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-emerald-500 font-medium">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleShareTwitter}
        className="h-8 px-2.5 text-xs hover:text-[#1DA1F2]"
      >
        X / Twitter
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleShareLinkedIn}
        className="h-8 px-2.5 text-xs hover:text-[#0A66C2]"
      >
        LinkedIn
      </Button>
    </div>
  );
}
