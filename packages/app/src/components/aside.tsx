import { Brand } from './brand';
import { NewRequestButton } from './new-request-button';
import { SavedRequestsList } from './saved-requests';

export function Aside() {
  return (
    <aside className="flex h-full flex-col gap-4 overflow-y-auto bg-surface py-2">
      <Brand />
      <div className="flex flex-wrap items-center justify-between gap-2 px-4">
        <h2 className="text-sm font-medium">Saved requests</h2>
        <NewRequestButton />
      </div>
      <SavedRequestsList />
    </aside>
  );
}
