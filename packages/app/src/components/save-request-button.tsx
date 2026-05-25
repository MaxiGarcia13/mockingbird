import type { RequestData } from '@root/types';
import type { ButtonHTMLAttributes } from 'react';
import { useRequestStore } from '@/store';
import { Button } from './shared/button';

type SaveRequestButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  onSave?: (request: RequestData) => void;
};

export function SaveRequestButton({ onSave, disabled, ...props }: SaveRequestButtonProps) {
  const method = useRequestStore((state) => state.method);
  const url = useRequestStore((state) => state.url);
  const statusCode = useRequestStore((state) => state.statusCode);
  const headers = useRequestStore((state) => state.headers);
  const body = useRequestStore((state) => state.body);

  const isDisabled = disabled || !url.trim();

  return (
    <Button
      disabled={isDisabled}
      onClick={() => onSave?.({ method, url, statusCode, headers, body })}
      {...props}
    >
      Save
    </Button>
  );
}
