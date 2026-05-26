import type { ButtonHTMLAttributes } from 'react';
import { useFetch } from '@/hooks/use-fetch';
import { saveRequest } from '@/services/request';
import { useRequestFormStore } from '@/store/request-form';
import { useSavedRequestsStore } from '@/store/saved-requests';
import { Button } from './shared/button';

type SaveRequestButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {

};

export function SaveRequestButton({ disabled, ...props }: SaveRequestButtonProps) {
  const method = useRequestFormStore((state) => state.method);
  const url = useRequestFormStore((state) => state.url);
  const statusCode = useRequestFormStore((state) => state.statusCode);
  const isValidUrl = useRequestFormStore((state) => state.isValidUrl);
  const headers = useRequestFormStore((state) => state.headers);
  const body = useRequestFormStore((state) => state.body);
  const reset = useRequestFormStore((state) => state.reset);
  const fetchRequests = useSavedRequestsStore((state) => state.fetchRequests);

  const isDisabled = disabled || !url.trim() || !isValidUrl;

  const { isLoading, dispatch } = useFetch();

  const handleSave = () => {
    if (isDisabled)
      return;

    dispatch(
      () => saveRequest({ method, url, statusCode, headers, body }),
    )
      .then(() => {
        reset();
        fetchRequests();
      });
  };

  return (
    <Button
      disabled={isDisabled}
      onClick={handleSave}
      loading={isLoading}
      variant="primary"
      {...props}
    >
      Save
    </Button>
  );
}
