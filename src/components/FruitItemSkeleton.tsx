export function FruitItemSkeleton() {
  return (
    <div className="flex w-full items-start gap-3">
      <div className="min-w-0 flex-1">
        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200 sm:w-2/3" />
      </div>

      <div className="flex shrink-0 gap-1.5">
        <div className="h-8 w-20 animate-pulse rounded bg-slate-200" />
        <div className="h-8 w-24 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}
