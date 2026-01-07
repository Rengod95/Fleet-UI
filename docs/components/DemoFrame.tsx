'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';

function playgroundBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_PLAYGROUND_BASE_URL ??
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:8081'
      : 'https://playground.fleet-ui.dev')
  );
}

export function DemoFrame({ slug }: { slug: string }) {
  const [reloadNonce, setReloadNonce] = useState(0);

  const src = useMemo(() => {
    const base = playgroundBaseUrl();
    const url = new URL(`${base}/components/${slug}`);
    url.searchParams.set('embed', '1');
    url.searchParams.set('r', String(reloadNonce));
    return url.toString();
  }, [reloadNonce, slug]);

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setReloadNonce((n) => n + 1)}
          className="h-8 text-xs"
        >
          Reload
        </Button>
        <Button asChild variant="outline" size="sm" className="h-8 text-xs">
          <Link href={src} target="_blank" rel="noreferrer">
            Open in new tab
          </Link>
        </Button>
      </div>

      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-14 rounded-[2.5rem] h-[880px] w-[421px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[10px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
        <div className="h-[20px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[20px] w-[3px] bg-gray-800 absolute -start-[17px] top-[160px] rounded-s-lg"></div>
        <div className="h-[30px] w-[3px] bg-gray-800 absolute -end-[17px] top-[100px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800">
          <iframe
            title={`demo-${slug}`}
            src={src}
            className="h-full w-full bg-background"
          />
        </div>
      </div>
    </div>
  );
}

