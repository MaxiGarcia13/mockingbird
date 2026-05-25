import type { HTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useTabsContext } from './context';

export type TabsContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export function TabsContent({ value, className, hidden, ...props }: TabsContentProps) {
  const { value: activeValue, baseId } = useTabsContext('TabsContent');
  const isActive = activeValue === value;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-content-${value}`}
      aria-labelledby={`${baseId}-trigger-${value}`}
      hidden={hidden ?? !isActive}
      tabIndex={0}
      className={cn('outline-none focus-visible:ring-2 focus-visible:ring-accent', className)}
      {...props}
    />
  );
}
