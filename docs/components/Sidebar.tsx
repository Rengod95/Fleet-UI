'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { components } from '@/lib/generated/components';
import { getNav } from '../lib/nav';
import { isLocale, type Locale, withLocale } from '../lib/i18n';
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function DocsSidebarNav({
  className,
  onNavigate,
}: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const params = useParams<{ locale?: string }>();
  const locale: Locale = isLocale(params?.locale) ? params.locale : 'en';
  const nav = getNav(locale);

  return (
    <div className={cn('space-y-4', className)}>
      {nav
        .filter((section) => section.title !== 'Components' && section.title !== '컴포넌트')
        .map((section) => (
        <SidebarGroup key={section.title}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) => {
              const href = withLocale(item.href, locale);
              const isActive =
                pathname === href ||
                (href !== '/' && pathname.startsWith(href));
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    onClick={() => onNavigate?.()}
                  >
                    <Link href={href}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}

      <SidebarGroup>
        <SidebarGroupLabel>{locale === 'ko' ? '컴포넌트' : 'Components'}</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem key="/components">
            <SidebarMenuButton
              asChild
              isActive={pathname === withLocale('/components', locale)}
              onClick={() => onNavigate?.()}
            >
              <Link href={withLocale('/components', locale)}>
                {locale === 'ko' ? '컴포넌트 개요' : 'Components Overview'}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {components.map((c) => {
            const href = withLocale(`/components/${c.slug}`, locale);
            const isActive =
              pathname === href || (href !== '/' && pathname.startsWith(href));

            return (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  onClick={() => onNavigate?.()}
                >
                  <Link href={href}>{c.name}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
}

export function Sidebar() {
  const { isMobile, setOpenMobile } = useSidebar();
  const params = useParams<{ locale?: string }>();
  const locale: Locale = isLocale(params?.locale) ? params.locale : 'en';

  return (
    <UISidebar>
      <SidebarHeader>
        <Link
          href={withLocale('/', locale)}
          className="flex items-center gap-2 text-fleet-body2Strong font-bold!"
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
            width={20}
            height={20}
            className="hidden h-7 w-auto dark:block"
            priority
          />
          Fleet UI
        </Link>
        {/* <div className="mt-1 text-fleet-caption1 text-muted-foreground">
          Documentation
        </div> */}
      </SidebarHeader>
      <SidebarContent>
        <DocsSidebarNav
          onNavigate={() => {
            if (isMobile) setOpenMobile(false);
          }}
        />
      </SidebarContent>
    </UISidebar>
  );
}

