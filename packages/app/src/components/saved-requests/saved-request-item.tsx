import type { StoredRequestData } from '@root/types';
import type { LiHTMLAttributes } from 'react';
import { cn, getUrlDomain } from '@maxigarcia/js-utils';
import { RequestMethodBadge } from '../request-method-badge';

type SavedRequestItemProps = LiHTMLAttributes<HTMLLIElement> & {
  request: StoredRequestData;
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

function formatUpdatedAt(updatedAt: Date | string): string {
  const date = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
  return dateFormatter.format(date);
}

export function SavedRequestItem({ request, className, ...props }: SavedRequestItemProps) {
  const { method, url, updatedAt, enabled } = request;
  const domain = getUrlDomain(url) ?? url;

  return (
    <li
      className={cn(
        'flex items-center gap-2 rounded-md border border-surface-border bg-surface px-3 py-2',
        !enabled && 'text-muted-foreground opacity-60',
        className,
      )}
      {...props}
    >
      <RequestMethodBadge method={method} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{domain}</p>
        <p className="text-xs text-muted-foreground">{formatUpdatedAt(updatedAt)}</p>
      </div>
    </li>
  );
}
