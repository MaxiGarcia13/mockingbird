import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useTabsContext } from './context';

export type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  disabled?: boolean;
};

export function TabsTrigger({
  value,
  className,
  disabled,
  onClick,
  onKeyDown,
  ...props
}: TabsTriggerProps) {
  const { value: activeValue, onChange, baseId } = useTabsContext('TabsTrigger');
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-trigger-${value}`}
      aria-controls={`${baseId}-content-${value}`}
      aria-selected={isActive}
      disabled={disabled}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium',
        'outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        isActive
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:text-foreground',
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented)
          onChange(value);
      }}
      {...props}
    />
  );
}
