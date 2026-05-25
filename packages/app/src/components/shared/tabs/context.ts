import { createContext, use } from 'react';

export interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  baseId: string;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext(component: string) {
  const context = use(TabsContext);
  if (!context) {
    throw new Error(`<${component}> must be rendered inside <Tabs>`);
  }
  return context;
}
