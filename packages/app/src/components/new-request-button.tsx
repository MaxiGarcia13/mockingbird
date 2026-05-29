import type { ComponentProps } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { Button } from '@maxigarcia/mockingbird-shared/components/button';
import { PlusIcon } from '@maxigarcia/mockingbird-shared/components/icons/plus';
import { useRequestFormStore } from '@/store/request-form';

type NewRequestButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'onClick'>;

export function NewRequestButton({ className, ...props }: NewRequestButtonProps) {
  const state = useRequestFormStore();

  const handleClick = () => {
    state.reset();
  };

  return (
    <Button
      className={cn('gap-1', className)}
      variant="default"
      onClick={handleClick}
      disabled={state.isEmpty(state)}
      {...props}
    >
      <PlusIcon className="size-4" />
      New Request
    </Button>
  );
}
