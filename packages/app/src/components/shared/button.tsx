import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { LoadingIcon } from './icons/loading';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: 'primary' | 'default';
};

export function Button({ className, type = 'button', disabled, loading, variant = 'default', children, ...props }: ButtonProps) {
  const variantClasses = {
    primary: 'bg-accent text-accent-foreground',
    default: 'bg-surface text-foreground border border-surface-border',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium',
        variantClasses[variant],
        'outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:cursor-not-allowed disabled:opacity-50 relative',
        (!disabled || loading) && 'cursor-pointer hover:opacity-90',
        className,
      )}
      {...props}
    >
      <span className={cn('contents', loading && 'invisible')}>{children}</span>
      {loading && (
        <LoadingIcon className="absolute size-4 animate-spin" aria-hidden />
      )}
    </button>
  );
}
