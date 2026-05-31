import { AppDescription } from '@maxigarcia/mockingbird-shared/components/app-description';
import { Brand } from '@maxigarcia/mockingbird-shared/components/brand';
import { GithubLink } from '@maxigarcia/mockingbird-shared/components/github-link';
import { ThemeToggleButton } from '@maxigarcia/mockingbird-shared/components/theme-toggle-button';
import { useState } from 'react';
import { version } from '../../package.json';
import { InterceptToggle } from './intercept-toggle';
import { RequestForm } from './request-form';
import { SavedRequestsList } from './saved-requests/saved-requests-list';

export function App() {
  const [displayList, setDisplayList] = useState(true);
  return (
    <>
      <header className="shrink-0 space-y-4 p-4">
        <div className="flex items-center gap-4">
          <Brand />
          <GithubLink version={version} />
          <div className="ml-auto flex items-center justify-end gap-2">
            <ThemeToggleButton />
            <InterceptToggle />
          </div>
        </div>
        <AppDescription />
      </header>
      {displayList
        ? (
            <SavedRequestsList
              onNewRequest={() => setDisplayList(false)}
              onRequestClick={() => setDisplayList(false)}
            />
          )
        : (
            <RequestForm onBackToList={() => setDisplayList(true)} />
          )}
    </>
  );
}
