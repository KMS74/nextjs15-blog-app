import Link from "next/link";
import Layout from "../components/layout";
import { Button } from "../components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-muted/80 flex items-center justify-center text-primary border border-border">
          <FileQuestion className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            404 - Page Not Found
          </h1>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            Sorry, the article or page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Button asChild size="default" className="rounded-xl">
          <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>
        </Button>
      </div>
    </Layout>
  );
}
