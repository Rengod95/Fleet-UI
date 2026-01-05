'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';

function playgroundBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_PLAYGROUND_BASE_URL ??
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:8081'
      : 'https://playground.example.com')
  );
}

export function PlaygroundFrame({
  path,
  title = 'Demo',
  height = 640,
}: {
  path: string;
  title?: string;
  height?: number;
}) {
  const [reloadNonce, setReloadNonce] = useState(0);

  const src = useMemo(() => {
    const base = playgroundBaseUrl();
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const url = new URL(normalizedPath, base);
    url.searchParams.set('embed', '1');
    url.searchParams.set('r', String(reloadNonce));
    return url.toString();
  }, [path, reloadNonce]);

  return (
    <div className="rounded-xl bg-card shadow-sm">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="text-fleet-caption1 text-muted-foreground">{title}</div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setReloadNonce((n) => n + 1)}
          >
            Reload
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href={src} target="_blank" rel="noreferrer">
              Open in new tab
            </Link>
          </Button>
        </div>
      </div>
      <iframe title={`playground-${path}`} src={src} className="w-full" style={{ height }} />
    </div>
  );
}


