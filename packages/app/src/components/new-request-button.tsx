import type { ComponentProps } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { useRequestFormStore } from '@/store/request-form';
import { Button } from './shared/button';
import { PlusIcon } from './shared/icons/plus';

type NewRequestButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'onClick'>;

export function NewRequestButton({ className, ...props }: NewRequestButtonProps) {
  const state = useRequestFormStore();

  const handleClick = () => {
    state.reset();
  };

  return (
    <Button
      className={cn('gap-1', className)}
      variant="primary"
      onClick={handleClick}
      disabled={state.isEmpty(state)}
      {...props}
    >
      <PlusIcon className="size-4" />
      New Request
    </Button>
  );
}
