import type { RequestData } from '@maxigarcia/mockingbird-types';
import type { ButtonHTMLAttributes } from 'react';
import type { createRequestFormStore } from '../store';
import { Button } from '@maxigarcia/mockingbird-shared/components/button';
import { useFetch } from '@maxigarcia/mockingbird-shared/hooks/use-fetch';

type SaveRequestFormButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  storeFn: ReturnType<typeof createRequestFormStore>;
  onSave: (request: RequestData) => Promise<void>;
  onUpdate: (id: string, request: RequestData) => Promise<void>;
};

export function SaveRequestFormButton({ disabled, storeFn, onSave, onUpdate, ...props }: SaveRequestFormButtonProps) {
  const method = storeFn((state) => state.method);
  const url = storeFn((state) => state.url);
  const statusCode = storeFn((state) => state.statusCode);
  const isValidUrl = storeFn((state) => state.isValidUrl);
  const headers = storeFn((state) => state.headers);
  const body = storeFn((state) => state.body);
  const id = storeFn((state) => state.id);
  const reset = storeFn((state) => state.reset);

  const isDisabled = disabled || !url.trim() || !isValidUrl;

  const { isLoading, dispatch } = useFetch();

  const handleSave = () => {
    if (isDisabled)
      return;

    dispatch(
      () => {
        if (typeof id === 'string') {
          return onUpdate(id, { method, url, statusCode, headers, body });
        }
        return onSave({ method, url, statusCode, headers, body });
      },
    )
      .then(() => {
        reset();
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
      {id ? 'Update' : 'Save'}
    </Button>
  );
}
