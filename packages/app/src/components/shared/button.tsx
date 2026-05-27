import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { onPressEnter } from '@/utils/event';
import { LoadingIcon } from './icons/loading';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: 'primary' | 'default';
};

export function Button({
  className,
  onClick,
  type = 'button',
  disabled,
  loading,
  variant = 'default',
  children,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-accent text-accent-foreground hover:bg-accent-hover',
    default: 'bg-surface text-foreground border border-surface-border hover:bg-accent/80',
  };

  const disabledClasses = {
    primary: 'bg-accent/50 text-accent-foreground/50 hover:bg-accent/50',
    default: 'bg-surface/50 text-foreground/50 border border-surface-border/50 hover:bg-background/50',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        'relative inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium',
        variantClasses[variant],
        disabled && disabledClasses[variant],
        'outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        (!disabled || loading) && 'cursor-pointer',
        className,
      )}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
        event.stopPropagation();
      }}
      onKeyDown={onPressEnter((event) => {
        onClick?.(event);
      })}
      {...props}
    >
      <span className={cn('contents', loading && 'invisible')}>{children}</span>
      {loading && (
        <LoadingIcon className="absolute size-4 animate-spin" aria-hidden />
      )}
    </button>
  );
}
