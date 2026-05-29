import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange?: (value: ChangeEvent<HTMLInputElement>['target']['value']) => void;
};

export function Input({ className, type = 'text', onChange, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-surface-border px-3 py-1 text-sm',
        'placeholder:text-muted-foreground',
        'outline-none focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      onChange={(event) => onChange?.(event.target.value)}
      {...props}
    />
  );
}
