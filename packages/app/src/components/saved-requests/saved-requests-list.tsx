import { useEffect } from 'react';
import { useSavedRequestsStore } from '@/store/saved-requests';
import { SavedRequestItem } from './saved-request-item';
import { SavedRequestItemSkeleton } from './saved-request-item-skeleton';

const SKELETON_COUNT = 3;

export function SavedRequestsList() {
  const requests = useSavedRequestsStore((state) => state.requests);
  const isLoading = useSavedRequestsStore((state) => state.isLoading);
  const error = useSavedRequestsStore((state) => state.error);
  const fetchRequests = useSavedRequestsStore((state) => state.fetchRequests);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  if (isLoading && !requests.length) {
    return (
      <ul aria-busy className="space-y-2 px-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <SavedRequestItemSkeleton key={index} />
        ))}
      </ul>
    );
  }

  if (error) {
    return <p className="px-4 text-sm text-muted-foreground">Failed to load requests.</p>;
  }

  if (!requests.length) {
    return <p className="px-4 text-sm text-muted-foreground">No saved requests yet.</p>;
  }

  return (
    <ul className="space-y-2 overflow-y-auto px-4 py-2">
      {requests.map((request) => (
        <SavedRequestItem key={request.id} request={request} />
      ))}
    </ul>
  );
}
