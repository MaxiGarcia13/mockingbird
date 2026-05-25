import type { HTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useId } from 'react';
import { TabsContext } from './context';

export type TabsProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
};

export function Tabs({ value, onChange, className, ...props }: TabsProps) {
  const baseId = useId();

  return (
    <TabsContext value={{ value, onChange, baseId }}>
      <section className={cn('flex flex-col gap-2', className)} {...props} />
    </TabsContext>
  );
}
