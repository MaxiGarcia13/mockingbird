import type { KeyboardEvent, KeyboardEventHandler } from 'react';

export function onPressEnter<Element extends HTMLElement>(
  action: (event: KeyboardEvent<Element>) => void,
): KeyboardEventHandler<Element> {
  return (event: KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      action(event);
      event.stopPropagation();
    }
  };
}
