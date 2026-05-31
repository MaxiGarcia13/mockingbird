import type { ComponentProps } from 'react';
import type { ColorScheme } from '../utils/color-scheme';
import { cn } from '@maxigarcia/js-utils';
import { onCircularRevealAnimation } from '@maxigarcia/view-transitions';
import { useSyncExternalStore } from 'react';
import {

  getColorScheme,
  subscribeToColorScheme,
  toggleColorScheme,
} from '../utils/color-scheme';
import { Button } from './button';
import { MoonIcon } from './icons/moon';
import { SunIcon } from './icons/sun';

type ThemeToggleButtonProps = Omit<ComponentProps<typeof Button>, 'children' | 'onClick'> & {
  onClick?: ComponentProps<typeof Button>['onClick'];
};

function getServerColorScheme(): ColorScheme {
  return 'light';
}

export function ThemeToggleButton({
  className,
  onClick,
  tooltip,
  ...props
}: ThemeToggleButtonProps) {
  const scheme = useSyncExternalStore(
    subscribeToColorScheme,
    getColorScheme,
    getServerColorScheme,
  );
  const isDark = scheme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <Button
      type="button"
      aria-label={label}
      tooltip={tooltip ?? label}
      className={cn('border-0', className)}
      onClick={(event) => {
        onCircularRevealAnimation(() => {
          toggleColorScheme();
          onClick?.(event);
        }, event);
      }}
      {...props}
    >
      {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </Button>
  );
}
