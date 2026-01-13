'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { ChevronDown, Github, Menu, Moon, Search, Sun } from 'lucide-react';
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
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

type SearchItem = {
  title: string;
  href: string;
  group: 'Pages' | 'Components';
};

// SidebarTrigger를 안전하게 렌더링하는 래퍼 (SidebarProvider 없으면 null 반환)
function SidebarTriggerSafe() {
  try {
    // SidebarProvider가 있는지 확인
    const sidebarContext = useSidebar();
    if (!sidebarContext) return null;
    
    return (
      <SidebarTrigger
        className="lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </SidebarTrigger>
    );
  } catch {
    // SidebarProvider가 없으면 null 반환
    return null;
  }
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [openSearch, setOpenSearch] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const params = useParams<{ locale?: string }>();
  const lang: Locale = isLocale(params?.locale) ? params.locale : 'en';
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 랜딩 페이지 여부 확인
  const isLandingPage = pathname === '/' || pathname === '/en' || pathname === '/ko';
  
  // 문서 페이지 여부 확인 (사이드바가 필요한 페이지)
  const isDocsPage = !isLandingPage;

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  function persistLang(next: Locale) {
    document.cookie = `docs-lang=${next}; Path=/; SameSite=Lax`;
    window.localStorage.setItem('docs-lang', next);
    document.documentElement.lang = next;
  }

  return (
    <>
      <header
        className={cn(
          'z-50 w-full transition-all duration-300',
          isLandingPage
            ? cn(
                'fixed top-0',
                scrolled
                  ? 'bg-background/80 backdrop-blur-md border-b border-border'
                  : 'bg-transparent border-transparent'
              )
            : 'sticky top-0 bg-background/80 border-b border-sidebar-border backdrop-blur h-[56px]'
        )}
      >
        <div
          className={cn(
            'mx-auto flex items-center gap-3',
            isLandingPage ? 'h-16 max-w-7xl px-2' : 'h-14 px-4 lg:px-6'
          )}
        >
          {/* Sidebar Trigger (문서 페이지에서만) */}
          {isDocsPage && <SidebarTriggerSafe />}

          {/* Logo (랜딩 페이지에서만) */}
          {isLandingPage && (
            <Link
              href={withLocale('/', lang)}
              className="flex items-center gap-2 text-xl font-bold text-foreground"
            >
              <Image
                src="/assets/light-scheme-logo.svg"
                alt="Fleet UI"
                width={32}
                height={32}
                className="h-7 w-auto dark:hidden"
                priority
              />
              <Image
                src="/assets/dark-scheme-logo.svg"
                alt="Fleet UI"
                width={32}
                height={32}
                className="hidden h-7 w-auto dark:block"
                priority
              />
              Fleet UI
            </Link>
          )}

          {/* Navigation */}
          <nav className={cn('hidden items-center gap-1 md:flex', isLandingPage && 'ml-8')}>
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
                  'bg-muted text-foreground'
              )}
            >
              <Link href={withLocale('/introduce', lang)}>Docs</Link>
            </Button>
          </nav>

          <div className="flex-1" />

          {/* Search (문서 페이지에서만 큰 버전) */}
          {isDocsPage && (
            <Button
              variant="secondary"
              className="hidden w-[260px] justify-start gap-2 text-fleet-body3 text-muted-foreground md:flex"
              onClick={() => setOpenSearch(true)}
            >
              <Search className="size-4" />
              Search...
              <span className="ml-auto text-xs text-muted-foreground">⌘K</span>
            </Button>
          )}

          {/* Search Icon (모바일 또는 랜딩) */}
          {(isLandingPage || isDocsPage) && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                isDocsPage ? 'md:hidden' : '',
                isLandingPage && 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
              )}
              onClick={() => setOpenSearch(true)}
              aria-label="Search"
            >
              <Search className="size-5" />
            </Button>
          )}

          {/* GitHub (랜딩 페이지에서만) */}
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            >
              <a
                href="https://github.com/Rengod95/Fleet-UI"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'hidden gap-2 md:flex',
                  isLandingPage && 'border-border bg-background/50'
                )}
              >
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

          {/* Theme Toggle */}
          <Button
            variant={isDocsPage ? 'outline' : 'ghost'}
            size="icon"
            aria-label="Toggle theme"
            className={cn(
              isLandingPage && 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            )}
            onClick={() => {
              const next = resolvedTheme === 'dark' ? 'light' : 'dark';
              setTheme(next);
            }}
          >
            {mounted && resolvedTheme === 'dark' ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>

          {/* Get Started Button (랜딩 페이지에서만) */}
          {isLandingPage && (
            <Button
              asChild
              size="sm"
              className="hidden rounded-full bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90 sm:flex"
            >
              <Link href={withLocale('/introduce', lang)}>Get Started</Link>
            </Button>
          )}
        </div>
      </header>

      {/* Search Dialog */}
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
                      pathname === it.href && 'bg-primary'
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
    </>
  );
}
