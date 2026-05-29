import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { onPressEnter } from '../../utils/event';
import { useTabsContext } from './context';

export type TabsTriggerProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'onKeyDown'> & {
  value: string;
  disabled?: boolean;
};

export function TabsTrigger({
  value,
  className,
  disabled,
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
        'inline-flex items-center justify-center px-3 pt-2 pb-3 text-sm font-medium',
        'outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        !disabled && 'cursor-pointer',
        isActive
          ? 'border-b-2 border-accent text-accent'
          : 'text-muted-foreground hover:text-foreground',
        className,
      )}
      onClick={() => {
        onChange(value);
      }}
      onKeyDown={onPressEnter(() => {
        onChange(value);
      })}
      {...props}
    />
  );
}
