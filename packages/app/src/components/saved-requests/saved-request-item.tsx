import type { StoredRequestData } from '@maxigarcia/mockingbird-types';
import type { LiHTMLAttributes } from 'react';
import { cn, getUrlDomain } from '@maxigarcia/js-utils';
import { Button } from '@maxigarcia/mockingbird-shared/components/button';
import { BinIcon } from '@maxigarcia/mockingbird-shared/components/icons/bin';
import { CloneIcon } from '@maxigarcia/mockingbird-shared/components/icons/clone';
import { Switch } from '@maxigarcia/mockingbird-shared/components/switch';
import { useFetch } from '@maxigarcia/mockingbird-shared/hooks/use-fetch';
import { deleteRequest, saveRequest, updateRequest } from '@/services/request';
import { useRequestFormStore } from '@/store/request-form';
import { useSavedRequestsStore } from '@/store/saved-requests';
import { FetcherButton } from '../fetcher-button';
import { RequestMethodBadge } from '../request-method-badge';

type SavedRequestItemProps = LiHTMLAttributes<HTMLLIElement> & {
  request: StoredRequestData;
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
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
  const selectedRequestId = useRequestFormStore((state) => state.id);

  const { isLoading, dispatch } = useFetch();

  const handleClone = () => {
    dispatch(() => saveRequest({ method, url, statusCode, headers, body }))
      .then(() => fetchRequests());
  };

  const handleRemove = () => {
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
        selectedRequestId === id && 'ring-2 ring-accent',
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

      <div className="flex items-center gap-2">
        <FetcherButton
          className="border-0"
          request={request}
          tooltip="Open in Fetcher"
          tooltipPlacement="bottom"
        />
        <Button
          aria-label="Clone request"
          onClick={handleClone}
          loading={isLoading}
          className="border-0"
          tooltip="Clone request"
          tooltipPlacement="bottom"
        >
          <CloneIcon className="size-4" />
        </Button>
        <Button
          aria-label="Remove request"
          onClick={handleRemove}
          loading={isLoading}
          className="border-0"
          tooltip="Remove request"
          tooltipPlacement="bottom"
        >
          <BinIcon className="size-4" />
        </Button>
        <Switch
          aria-label={enabled ? 'Disable request' : 'Enable request'}
          checked={enabled}
          disabled={isLoading}
          onChange={handleToggleEnabled}
          tooltip={enabled ? 'Disable request' : 'Enable request'}
          tooltipPlacement="bottom"
        />
      </div>
    </li>
  );
}
