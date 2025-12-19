import { Sidebar } from '../../components/Sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Fleet UI Documentation
          </div>
          <div className="h-6 w-48 rounded-full bg-[var(--fleet-gradient-primary)] opacity-90" />
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <article className="prose prose-zinc max-w-none dark:prose-invert">
            {children}
          </article>
        </main>
      </div>
    </div>
  );
}

