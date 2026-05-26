import type { ChangeEvent, SelectHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';

type NativeSelect = SelectHTMLAttributes<HTMLSelectElement>;
type SelectValue = ChangeEvent<NativeSelect>['target']['value'];

type SelectProps<T extends SelectValue>
  = Omit<NativeSelect, 'onChange'>
    & {
      onChange?: (value: T) => void;
    };

export function Select<T extends SelectValue = SelectValue>({ className, children, onChange, ...props }: SelectProps<T>) {
  return (
    <select
      className={cn(
        'flex h-9 w-full rounded-md border border-surface-border px-3 py-1 text-sm',
        'outline-none focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      onChange={(event) => onChange?.(event.target.value as T)}
      {...props}
    >
      {children}
    </select>
  );
}
