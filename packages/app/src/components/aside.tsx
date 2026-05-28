import { homepage } from '../../../../package.json';
import { version } from '../../package.json';
import { Brand } from './brand';
import { NewRequestButton } from './new-request-button';
import { SavedRequestsList } from './saved-requests';
import { GithubIcon } from './shared/icons/github';

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
        <a
          href={homepage}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <GithubIcon className="size-4" />
          <span>
            v
            {version}
          </span>
        </a>
      </div>
    </aside>
  );
}
