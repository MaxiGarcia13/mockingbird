import type { StoredRequestData } from '@root/types';
import type { LiHTMLAttributes, MouseEvent } from 'react';
import { cn, getUrlDomain } from '@maxigarcia/js-utils';
import { useFetch } from '@/hooks/use-fetch';
import { deleteRequest, updateRequest } from '@/services/request';
import { useRequestFormStore } from '@/store/request-form';
import { useSavedRequestsStore } from '@/store/saved-requests';
import { RequestMethodBadge } from '../request-method-badge';
import { Button } from '../shared/button';
import { BinIcon } from '../shared/icons/bin';
import { Switch } from '../shared/switch';

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
  const { id, method, url, updatedAt, enabled, statusCode, headers, body } = request;
  const domain = getUrlDomain(url) ?? url;

  const fetchRequests = useSavedRequestsStore((state) => state.fetchRequests);
  const setRequest = useRequestFormStore((state) => state.setRequest);
  const { isLoading, dispatch } = useFetch();

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    dispatch(() => deleteRequest(id))
      .then(() => fetchRequests());
  };

  const handleToggleEnabled = (nextEnabled: boolean) => {
    dispatch(() => updateRequest(id, { enabled: nextEnabled }))
      .then(() => fetchRequests());
  };

  const handleClick = () => {
    setRequest({
      method,
      url,
      statusCode,
      headers,
      body,
      id,
    });
  };

  return (
    <li
      className={cn(
        'flex items-center gap-2 rounded-md border border-surface-border bg-surface px-3 py-2 cursor-pointer',
        !enabled && 'text-muted-foreground opacity-60',
        className,
        'outline-none focus-visible:ring-2 focus-visible:ring-accent',
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleClick();
        }
      }}
      onClick={handleClick}
      {...props}
    >
      <RequestMethodBadge method={method} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{domain}</p>
        <p className="text-xs text-muted-foreground">{formatUpdatedAt(updatedAt)}</p>
      </div>
      <Switch
        aria-label={enabled ? 'Disable request' : 'Enable request'}
        checked={enabled}
        disabled={isLoading}
        onChange={handleToggleEnabled}
        onClick={(event) => event.stopPropagation()}
      />
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
