import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  onChange?: (checked: ChangeEvent<HTMLInputElement>['target']['checked']) => void;
};

export function Switch({ className, disabled, onChange, ...props }: SwitchProps) {
  return (
    <label
      className={cn(
        'relative inline-block h-5 w-9 shrink-0',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      )}
    >
      <input
        type="checkbox"
        role="switch"
        disabled={disabled}
        className="peer sr-only"
        onChange={(event) => onChange?.(event.target.checked)}
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
