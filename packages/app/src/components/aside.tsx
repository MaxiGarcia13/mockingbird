import { Brand } from '@maxigarcia/mockingbird-shared/components/brand';
import { GithubLink } from '@maxigarcia/mockingbird-shared/components/github-link';
import { version } from '../../package.json';
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
      <div className="mx-auto mt-auto px-4 pb-2">
        <GithubLink version={version} />
      </div>
    </aside>
  );
}
