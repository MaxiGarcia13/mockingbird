import { Brand } from './brand';
import { SavedRequestsList } from './saved-requests-list';

export function Aside() {
  return (
    <aside className="flex h-full flex-col gap-4 overflow-y-auto bg-surface py-2">
      <Brand />

      <h2 className="px-4 text-sm font-medium">Saved requests</h2>
      <SavedRequestsList />
    </aside>
  );
}
