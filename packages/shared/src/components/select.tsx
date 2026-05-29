import type { ChangeEvent, RefObject, SelectHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useRef } from 'react';
import { onPressEnter } from '../utils/event';
import { ChevronDownIcon } from './icons/chevron-down';

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
    <div className={cn('relative w-full', className)}>
      <select
        ref={selectRef}
        className={cn(
          'flex h-9 w-full appearance-none rounded-md border border-surface-border py-1 pl-3 pr-8 text-sm',
          'outline-none focus-visible:ring-2 focus-visible:ring-accent',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
        onChange={(event) => onChange?.(event.target.value as T)}
        onKeyDown={onPressEnter(() => {
          selectRef.current?.showPicker();
        })}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2"
      />
    </div>
  );
}
