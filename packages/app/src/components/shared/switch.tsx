import type { ChangeEvent, InputHTMLAttributes } from 'react';
import type { TooltipPlacement } from './tooltip';
import { cn } from '@maxigarcia/js-utils';
import { useId } from 'react';
import { onPressEnter } from '@/utils/event';
import { Tooltip } from './tooltip';

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  onChange?: (checked: ChangeEvent<HTMLInputElement>['target']['checked']) => void;
  tooltip?: string;
  tooltipPlacement?: TooltipPlacement;
};

export function Switch({ tooltip, tooltipPlacement, ...props }: SwitchProps) {
  if (tooltip) {
    return (
      <Tooltip content={tooltip} placement={tooltipPlacement}>
        <BaseSwitch {...props} />
      </Tooltip>
    );
  }
  return <BaseSwitch {...props} />;
}

function BaseSwitch({ className, id, disabled, onChange, onClick, ...props }: SwitchProps) {
  const uniqueId = useId();
  const inputId = id ?? uniqueId;
  return (
    <label
      htmlFor={inputId}
      className={cn(
        'relative inline-block h-5 w-9 shrink-0',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      )}
    >
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        disabled={disabled}
        className="peer sr-only"
        onChange={(event) => {
          event.preventDefault();
          onChange?.(event.target.checked);
          event.stopPropagation();
        }}
        onClick={(event) => {
          event.preventDefault();
          onClick?.(event);
          event.stopPropagation();
        }}
        onKeyDown={onPressEnter(() => {
          onChange?.(!props.checked);
        })}
        {...props}
      />
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 rounded-md border border-surface-border bg-surface transition-colors',
          'peer-checked:border-accent peer-checked:bg-accent',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-accent',
        )}
      />
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-0.5 left-0.5 size-4 rounded-md bg-foreground/60 transition-transform',
          'peer-checked:translate-x-4 peer-checked:bg-accent-foreground',
        )}
      />
    </label>
  );
}
