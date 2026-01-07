import { Sidebar } from '../../../components/Sidebar';
import { SidebarInset, SidebarProvider } from '../../../components/ui/sidebar';
import { OnThisPage } from '../../../components/OnThisPage';
import { Header } from '@/components/Header';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh overflow-hidden bg-background text-foreground">
      <SidebarProvider>
        <div className="flex h-dvh w-full">
          <Sidebar />
          <SidebarInset className="flex h-dvh min-h-0 flex-col overflow-hidden">
            <Header />
            <div className="flex flex-1 min-h-0 overflow-hidden">
              <div id="docs-scroll" className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain">
                <div className="mx-auto px-4 lg:px-8">
                  <div className="flex gap-8 py-8">
                    <main className="min-w-0 flex-1">
                      <article id="docs-content" className="docs-prose">
                        {children}
                      </article>
                    </main>
                  </div>
                </div>
              </div>

              <aside className="hidden min-h-0 min-w-64 max-w-96 shrink-0 xl:block">
                <div className="h-full min-h-0 overflow-y-auto py-6 pl-4 pr-12">
                  <OnThisPage />
                </div>
              </aside>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

