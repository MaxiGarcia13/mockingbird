import type { RequestData, StoredRequestData } from '@maxigarcia/mockingbird-types';
import type { LiHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useFetch } from '../../hooks/use-fetch';
import { Button } from '../button';
import { FetcherButton } from '../fetcher-button';
import { BinIcon } from '../icons/bin';
import { CloneIcon } from '../icons/clone';
import { Switch } from '../switch';

type SavedRequestItemActionProps = LiHTMLAttributes<HTMLLIElement> & {
  request: StoredRequestData;
  fetchRequests: () => Promise<void>;
  deleteRequest: (id: string) => Promise<void>;
  saveRequest: (request: RequestData) => Promise<void>;
  updateRequest: (id: string, request: Partial<StoredRequestData>) => Promise<void>;
  children?: React.ReactNode;
};

export function SavedRequestItemAction({
  request,
  className,
  fetchRequests,
  children,
  deleteRequest,
  saveRequest,
  updateRequest,
}: SavedRequestItemActionProps) {
  const { id, method, url, enabled, statusCode, headers, body } = request;

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

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <FetcherButton
        className="border-0"
        request={request}
        tooltip="Open in Fetcher"
        tooltipPlacement="bottom"
        fetcherBaseUrl={import.meta.env.VITE_FETCHER_URL}
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
      {children}
      <Switch
        aria-label={enabled ? 'Disable request' : 'Enable request'}
        checked={enabled}
        disabled={isLoading}
        onChange={handleToggleEnabled}
        tooltip={enabled ? 'Disable request' : 'Enable request'}
        tooltipPlacement="bottom"
      />
    </div>
  );
}
