import type { ChangeEvent, RefObject, SelectHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useRef } from 'react';
import { onPressEnter } from '../utils/event';

type NativeSelect = SelectHTMLAttributes<HTMLSelectElement>;
type SelectValue = ChangeEvent<NativeSelect>['target']['value'];

type SelectProps<T extends SelectValue>
  = Omit<NativeSelect, 'onChange'>
    & {
      onChange?: (value: T) => void;
      ref?: RefObject<HTMLSelectElement>;
    };

export function Select<T extends SelectValue = SelectValue>({
  className,
  ref,
  children,
  onChange,
  ...props
}: SelectProps<T>) {
  const localRef = useRef<HTMLSelectElement>(null);
  const selectRef = ref ?? localRef;

  return (
    <select
      ref={selectRef}
      className={cn(
        'flex h-9 w-full rounded-md border border-surface-border px-3 py-1 text-sm',
        'outline-none focus-visible:ring-2 focus-visible:ring-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      onChange={(event) => onChange?.(event.target.value as T)}
      onKeyDown={onPressEnter(() => {
        selectRef.current?.showPicker();
      })}
      {...props}
    >
      {children}
    </select>
  );
}
