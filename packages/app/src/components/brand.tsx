export function Brand() {
  return (
    <div className="space-y-4 px-4 py-2">
      <div className="flex items-center gap-2">
        <img src="/mockingbird.png" alt="Mockingbird" className="h-8" />
        <span className="text-2xl font-bold text-foreground">Mockingbird</span>
      </div>
      <p className="text-sm text-muted-foreground">A lightweight HTTP request interceptor and mocking tool for seamless API debugging and network manipulation.</p>
    </div>
  );
}
