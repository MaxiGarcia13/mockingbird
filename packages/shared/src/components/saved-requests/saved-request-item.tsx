import type { StoredRequestData } from '@maxigarcia/mockingbird-types';
import type { LiHTMLAttributes } from 'react';
import type { createRequestFormStore } from '../../store/request-form';
import { cn, getUrlDomain } from '@maxigarcia/js-utils';
import { RequestMethodBadge } from '../request-method-badge';

type SavedRequestItemProps = LiHTMLAttributes<HTMLLIElement> & {
  request: StoredRequestData;
  storeFn: ReturnType<typeof createRequestFormStore>;
  children?: React.ReactNode;
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

function formatUpdatedAt(updatedAt: number | Date | string): string {
  try {
    const date = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);

    return dateFormatter.format(date);
  } catch {
    return 'N/A';
  }
}

export function SavedRequestItem({
  request,
  className,
  storeFn,
  children,
  ...props
}: SavedRequestItemProps) {
  const { id, method, url, updatedAt, enabled, statusCode, headers, body } = request;
  const domain = getUrlDomain(url) ?? url;

  const setRequest = storeFn((state) => state.setRequest);
  const selectedRequestId = storeFn((state) => state.id);

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

      <RequestMethodBadge method={method} className="mt-1 mb-auto" />

      <div className="min-w-0 flex-1 space-y-1">
        <p className="truncate text-sm font-medium">{domain}</p>
        <p className="text-xs text-muted-foreground">{formatUpdatedAt(updatedAt)}</p>
      </div>

      {children}
    </li>
  );
}
