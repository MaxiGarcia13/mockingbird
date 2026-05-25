import type { SelectHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> & {
  onChange?: (value: SelectHTMLAttributes<HTMLSelectElement>['value']) => void;
};

export function Select({ className, children, onChange, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'flex h-9 w-full rounded-md border border-surface-border px-3 py-1 text-sm',
        'outline-none focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      onChange={(event) => onChange?.(event.target.value)}
      {...props}
    >
      {children}
    </select>
  );
}
