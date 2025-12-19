import Link from 'next/link';

function playgroundBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_PLAYGROUND_BASE_URL ??
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:19006'
      : 'https://playground.<domain>')
  );
}

export function DemoFrame({ slug }: { slug: string }) {
  const src = `${playgroundBaseUrl()}/components/${slug}?embed=1`;
  return (
    <div className="rounded-xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-3 py-2 text-sm">
        <div className="text-muted-foreground">Demo</div>
        <Link
          className="text-primary hover:underline"
          href={src}
          target="_blank"
          rel="noreferrer"
        >
          Open in new tab
        </Link>
      </div>
      <iframe
        title={`demo-${slug}`}
        src={src}
        className="h-[640px] w-full"
      />
    </div>
  );
}

