import type { StoredRequestData } from '@root/types';
import type { LiHTMLAttributes, MouseEvent } from 'react';
import { cn, getUrlDomain } from '@maxigarcia/js-utils';
import { useFetch } from '@/hooks/use-fetch';
import { deleteRequest } from '@/services/request';
import { useSavedRequestsStore } from '@/store/saved-requests';
import { RequestMethodBadge } from '../request-method-badge';
import { Button } from '../shared/button';
import { BinIcon } from '../shared/icons/bin';

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
  const { id, method, url, updatedAt, enabled } = request;
  const domain = getUrlDomain(url) ?? url;
  const fetchRequests = useSavedRequestsStore((state) => state.fetchRequests);
  const { isLoading, dispatch } = useFetch();

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    dispatch(() => deleteRequest(id))
      .then(() => fetchRequests());
  };

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
      <Button
        aria-label="Remove request"
        onClick={handleRemove}
        loading={isLoading}
        className="border-0"
      >
        <BinIcon className="size-4" />
      </Button>
    </li>
  );
}
