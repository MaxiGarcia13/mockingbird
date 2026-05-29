import type { AnchorHTMLAttributes } from 'react';
import { cn } from '@maxigarcia/js-utils';
import { homepage } from '@root/package.json';
import { GithubIcon } from './icons/github';

interface GithubLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  version: string;
  className?: string;
}

export function GithubLink({ version, className, ...props }: GithubLinkProps) {
  return (
    <a
      href={homepage}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground',
        className,
      )}
      {...props}
    >
      <GithubIcon className="size-4" />
      <span>
        v
        {version}
      </span>
    </a>
  );
}
