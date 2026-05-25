import { cn } from '@maxigarcia/js-utils';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../shared/tabs';
import { HeadersEditor } from './headers-editor';
import { ResponseEditor } from './response-editor';

export interface OverridesData {
  headers: string;
  response: string;
}

const RESPONSE_TAB = 'response';
const HEADERS_TAB = 'headers';

export function OverridesPanel({ className }: { className?: string }) {
  const [tab, setTab] = useState<string>(RESPONSE_TAB);

  return (
    <Tabs
      value={tab}
      onChange={(value: string) => setTab(value)}
      className={cn('flex-1', className)}
    >
      <TabsList>
        <TabsTrigger value={RESPONSE_TAB}>Response</TabsTrigger>
        <TabsTrigger value={HEADERS_TAB}>Headers</TabsTrigger>
      </TabsList>

      <TabsContent value={RESPONSE_TAB}>
        <ResponseEditor />
      </TabsContent>

      <TabsContent value={HEADERS_TAB}>
        <HeadersEditor />
      </TabsContent>
    </Tabs>
  );
}
