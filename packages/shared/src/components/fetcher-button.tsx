import type { StoredRequestData } from '@maxigarcia/mockingbird-types';
import type { ComponentProps, ImgHTMLAttributes } from 'react';
import { cn, encodeText, tryParseJson } from '@maxigarcia/js-utils';
import FetcherWhiteImage from '@root/assets/fetcher-white.png' with { type: 'image/png' };
import FetcherImage from '@root/assets/fetcher.png' with { type: 'image/png' };
import { Button } from './button';

interface FetcherButtonProps extends
  Omit<ComponentProps<typeof Button>, 'children' | 'onClick'> {
  request: StoredRequestData;
  fetcherBaseUrl?: string;
}

export function FetcherButton({
  request,
  fetcherBaseUrl = 'https://fetcher-steel.vercel.app',
  ...props
}: FetcherButtonProps) {
  const imgProps: ImgHTMLAttributes<HTMLImageElement> = {
    alt: 'Fetcher',
    width: 12,
    height: 12,
    className: 'size-3',
    loading: 'lazy',
  } as const;

  const { body, headers, url, method } = request;

  const parsedBody = tryParseJson(body ?? '{}');
  const parsedHeaders = tryParseJson(headers ?? '{}');

  const hasBody = parsedBody && Object.keys(parsedBody).length > 0;
  const hasHeaders = parsedHeaders && Object.keys(parsedHeaders).length > 0;

  const encodedBody = !hasBody
    ? undefined
    : encodeURIComponent(
        encodeText(
          JSON.stringify(parsedBody, null, 2),
        ),
      );

  const encodedHeaders = !hasHeaders
    ? undefined
    : encodeURIComponent(
        encodeText(
          JSON.stringify(
            Object.entries(parsedHeaders).map(([key, value]) => ({
              id: key,
              key,
              value,
              hidden: false,
              masked: false,
            })),
          ),
        ),
      );

  const params = new URLSearchParams({
    url: encodeURIComponent(encodeText(url)),
    method: encodeURIComponent(encodeText(method)),
    ...(encodedBody ? { body: encodedBody } : {}),
    ...(encodedHeaders ? { headers: encodedHeaders } : {}),
  });

  const fetcherUrl = `${fetcherBaseUrl}?${params.toString()}`;

  const handleClick = () => {
    window.open(fetcherUrl, '_blank');
  };

  return (
    <Button {...props} onClick={handleClick}>
      <img
        src={FetcherImage}
        {...imgProps}
        className={cn(imgProps.className, 'block dark:hidden')}

      />
      <img
        src={FetcherWhiteImage}
        {...imgProps}
        className={cn(imgProps.className, 'hidden dark:block')}
      />
    </Button>
  );
}
