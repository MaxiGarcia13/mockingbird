import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../shared/tabs';

type OverrideTab = 'headers' | 'response';

export interface OverridesData {
  headers: string;
  response: string;
}

export interface OverridesPanelProps {
  initialOverrides?: OverridesData;
  onChange?: (overrides: OverridesData) => void;
}

const DEFAULT_OVERRIDES: OverridesData = { headers: '', response: '' };

const RESPONSE_TAB = 'response';
const HEADERS_TAB = 'headers';

export function OverridesPanel({
  initialOverrides = DEFAULT_OVERRIDES,
  onChange,
}: OverridesPanelProps) {
  const [tab, setTab] = useState<OverrideTab>(RESPONSE_TAB);
  const [overrides, setOverrides] = useState<OverridesData>(initialOverrides);

  const update = (patch: Partial<OverridesData>) => {
    const next = { ...overrides, ...patch };
    setOverrides(next);
    onChange?.(next);
  };

  return (
    <section className="flex flex-col gap-2">
      <Tabs value={tab} onChange={(value) => setTab(value)}>
        <TabsList>
          <TabsTrigger value={RESPONSE_TAB}>Response</TabsTrigger>
          <TabsTrigger value={HEADERS_TAB}>Headers</TabsTrigger>
        </TabsList>

        <TabsContent value={HEADERS_TAB}>
          <textarea
            value={overrides.headers}
            onChange={(event) => update({ headers: event.target.value })}
            placeholder={'Content-Type: application/json\nAuthorization: Bearer ...'}
            aria-label="Override headers"
            className="min-h-40 w-full rounded-md border border-surface-border p-3 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </TabsContent>

        <TabsContent value={RESPONSE_TAB}>
          <textarea
            value={overrides.response}
            onChange={(event) => update({ response: event.target.value })}
            placeholder={'{\n  "message": "Hello from Mockingbird"\n}'}
            aria-label="Override response body"
            className="min-h-40 w-full rounded-md border border-surface-border p-3 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
