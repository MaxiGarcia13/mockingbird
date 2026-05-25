import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, type = 'button', disabled, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium',
        'bg-accent text-accent-foreground',
        'outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        !disabled && 'cursor-pointer hover:opacity-90',
        className,
      )}
      {...props}
    />
  );
}
