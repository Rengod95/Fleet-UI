'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { ChevronDown, Menu, Moon, Search, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { components } from '@/lib/generated/components';
import { getNav } from '@/lib/nav';
import { isLocale, type Locale, swapLocale, withLocale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

type SearchItem = {
  title: string;
  href: string;
  group: 'Pages' | 'Components';
};

export function DocsHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [openSearch, setOpenSearch] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const params = useParams<{ locale?: string }>();
  const lang: Locale = isLocale(params?.locale) ? params.locale : 'en';

  const items = useMemo(() => {
    const nav = getNav(lang);
    const pageItems: SearchItem[] = nav.flatMap((section) =>
      section.items.map((it) => ({
        title: it.title,
        href: withLocale(it.href, lang),
        group: 'Pages' as const,
      })),
    );

    const componentItems: SearchItem[] = components.map((c) => ({
      title: c.name,
      href: withLocale(`/components/${c.slug}`, lang),
      group: 'Components' as const,
    }));

    return [...pageItems, ...componentItems];
  }, [lang]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      const isCmdK = (e.metaKey || e.ctrlKey) && key === 'k';
      if (isCmdK) {
        e.preventDefault();
        setOpenSearch(true);
      }
      if (!e.metaKey && !e.ctrlKey && key === '/') {
        e.preventDefault();
        setOpenSearch(true);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function persistLang(next: Locale) {
    // middleware에서 cookie를 우선으로 사용하므로 client에서도 sync
    document.cookie = `docs-lang=${next}; Path=/; SameSite=Lax`;
    window.localStorage.setItem('docs-lang', next);
    document.documentElement.lang = next;
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 border-b border-sidebar-border backdrop-blur h-[56px]">
      <div className="mx-auto flex h-14 items-center gap-3 px-4 lg:px-6">
        <SidebarTrigger
          className="lg:hidden"
          aria-label="Open navigation"
          onClick={() => setOpenSearch(false)}
        >
          <Menu className="size-5" />
        </SidebarTrigger>

        <nav className="hidden items-center gap-1 md:flex">
          <Button
            asChild
            variant="ghost"
            className={cn(pathname === withLocale('/', lang) && 'bg-muted text-foreground')}
          >
            <Link href={withLocale('/', lang)}>Home</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={cn(
              (pathname.startsWith(withLocale('/introduce', lang)) ||
                pathname.startsWith(withLocale('/getting-started', lang)) ||
                pathname.startsWith(withLocale('/components', lang)) ||
                pathname.startsWith(withLocale('/fundamental', lang)) ||
                pathname.startsWith(withLocale('/others', lang))) &&
                'bg-muted text-foreground',
            )}
          >
            <Link href={withLocale('/introduce', lang)}>Docs</Link>
          </Button>
        </nav>

        <div className="flex-1" />

        <Button
          variant="secondary"
          className="hidden w-[260px] justify-start gap-2 text-fleet-body3 text-muted-foreground md:flex"
          onClick={() => setOpenSearch(true)}
        >
          <Search className="size-4" />
          Search...
          <span className="ml-auto text-xs text-muted-foreground">⌘K</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpenSearch(true)}
          aria-label="Search"
        >
          <Search className="size-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden gap-2 md:flex">
              {lang === 'ko' ? 'KR' : 'EN'}
              <ChevronDown className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              value={lang}
              onValueChange={(v) => {
                const next = v === 'ko' ? 'ko' : 'en';
                persistLang(next);
                router.push(swapLocale(pathname, next));
              }}
            >
              <DropdownMenuRadioItem value="ko">한국어</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => {
            const next = resolvedTheme === 'dark' ? 'light' : 'dark';
            setTheme(next);
          }}
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="size-5" />
          ) : (
            <Moon className="size-5" />
          )}
        </Button>

        {/* <div className="hidden h-2 w-24 rounded-full bg-(--fleet-gradient-primary) opacity-80 lg:block" /> */}
      </div>

      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <CommandInput placeholder="Search docs..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {items
              .filter((it) => it.group === 'Pages')
              .map((it) => (
                <CommandItem
                  key={it.href}
                  value={`${it.title} ${it.href}`}
                  onSelect={() => {
                    setOpenSearch(false);
                    router.push(it.href);
                  }}
                >
                  <span
                    className={cn(
                      'mr-2 inline-block size-1.5 rounded-full bg-muted-foreground/50',
                      pathname === it.href && 'bg-primary',
                    )}
                  />
                  {it.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <Separator />
          <CommandGroup heading="Components">
            {items
              .filter((it) => it.group === 'Components')
              .map((it) => (
                <CommandItem
                  key={it.href}
                  value={`${it.title} ${it.href}`}
                  onSelect={() => {
                    setOpenSearch(false);
                    router.push(it.href);
                  }}
                >
                  {it.title}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {it.href.replace('/components/', '')}
                  </span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}

