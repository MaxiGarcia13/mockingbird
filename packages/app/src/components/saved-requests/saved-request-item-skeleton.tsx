import { Skeleton } from '@maxigarcia/mockingbird-shared/components/skeleton';

export function SavedRequestItemSkeleton() {
  return (
    <li
      aria-hidden
      className="flex items-center gap-2 rounded-md border border-surface-border bg-surface px-3 py-2"
    >
      <Skeleton className="h-3 w-10" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-2 w-1/3" />
      </div>
    </li>
  );
}
