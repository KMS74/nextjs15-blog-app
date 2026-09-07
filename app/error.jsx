"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  React.useEffect(() => {
    console.error("App Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center border border-destructive/20">
        <AlertTriangle className="h-8 w-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Something went wrong
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          An unexpected error occurred while rendering this page.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          onClick={() => reset()}
          variant="default"
          className="rounded-xl inline-flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/" className="inline-flex items-center gap-2">
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
