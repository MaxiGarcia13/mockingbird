import type { StoredRequestData } from '@maxigarcia/mockingbird-types';
import type { createSavedRequestsStore } from '../../store/saved-requests';
import { cn } from '@maxigarcia/js-utils';
import { useEffect } from 'react';
import { SavedRequestItemSkeleton } from './saved-request-item-skeleton';

const SKELETON_COUNT = 3;

interface SavedRequestsListProps {
  storeFn: ReturnType<typeof createSavedRequestsStore>;
  ItemComponent: React.ComponentType<{ request: StoredRequestData }>;
  className?: string;
}

export function SavedRequestsList({ storeFn, ItemComponent, className }: SavedRequestsListProps) {
  const requests = storeFn((state) => state.requests);
  const isLoading = storeFn((state) => state.isLoading);
  const error = storeFn((state) => state.error);

  const fetchRequests = storeFn((state) => state.fetchRequests);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  if (isLoading && !requests.length) {
    return (
      <ul aria-busy className={cn('space-y-2 px-4', className)}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => {
          const key = `skeleton-${index}`;
          return <SavedRequestItemSkeleton key={key} />;
        })}
      </ul>
    );
  }

  if (error) {
    return <p className={cn('px-4 text-sm text-muted-foreground', className)}>Failed to load requests.</p>;
  }

  if (!requests.length) {
    return <p className={cn('px-4 text-sm text-muted-foreground', className)}>No saved requests yet.</p>;
  }

  return (
    <ul className={cn('space-y-2 overflow-y-auto px-4 py-2', className)}>
      {requests.map((request) => (
        <ItemComponent key={request.id} request={request} />
      ))}
    </ul>
  );
}
