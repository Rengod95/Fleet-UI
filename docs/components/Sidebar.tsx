import Link from 'next/link';
import { nav } from '../lib/nav';

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-background lg:block">
      <div className="px-6 py-6">
        <Link href="/" className="font-semibold tracking-tight">
          Fleet UI
        </Link>
        <div className="mt-6 space-y-6">
          {nav.map((section) => (
            <div key={section.title}>
              <div className="text-xs font-medium text-muted-foreground">
                {section.title}
              </div>
              <div className="mt-2 flex flex-col gap-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-2 py-1 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

