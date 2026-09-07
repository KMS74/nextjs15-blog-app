export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
      <div className="relative flex h-10 w-10">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-10 w-10 bg-primary/20 border-2 border-primary border-t-transparent animate-spin"></span>
      </div>
      <p className="text-xs font-medium text-muted-foreground animate-pulse">
        Loading content...
      </p>
    </div>
  );
}
