import type { HTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';

export function TabsList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 mb-2',
        className,
      )}
      {...props}
    />
  );
}
