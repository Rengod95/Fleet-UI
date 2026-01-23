'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

type HeadingLevel = 1 | 2 | 3 | 4;

type HeadingItem = {
  id: string;
  text: string;
  level: HeadingLevel;
};

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function getHeaderOffsetPx() {
  // `DocsHeader` height currently 56px (+ small gap)
  return 56 + 8;
}

export function OnThisPage({
  className,
  contentSelector = '#docs-content',
  scrollContainerSelector = '#docs-scroll',
}: {
  className?: string;
  contentSelector?: string;
  scrollContainerSelector?: string;
}) {
  const pathname = usePathname();
  const [items, setItems] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const headerOffset = useMemo(() => getHeaderOffsetPx(), []);

  function scrollToIdInContainer(id: string, behavior: ScrollBehavior) {
    const content = document.querySelector(contentSelector) as HTMLElement | null;
    const scroll = document.querySelector(scrollContainerSelector) as HTMLElement | null;
    if (!content || !scroll) return;

    const target = content.querySelector(`#${CSS.escape(id)}`) as HTMLElement | null;
    if (!target) return;

    const targetTop =
      target.getBoundingClientRect().top -
      scroll.getBoundingClientRect().top +
      scroll.scrollTop -
      headerOffset;

    scroll.scrollTo({ top: Math.max(0, targetTop), behavior });
  }

  useEffect(() => {
    function collect() {
      const contentEl = document.querySelector(contentSelector) as HTMLElement | null;
      if (!contentEl) {
        setItems([]);
        return;
      }

      const headings = Array.from(contentEl.querySelectorAll('h2, h3, h4')) as HTMLElement[];

      const used = new Map<string, number>();
      const nextItems: HeadingItem[] = [];

      for (const el of headings) {
        const level = Number(el.tagName.replace('H', '')) as HeadingLevel;
        const rawText = el.textContent?.trim() ?? '';
        if (!rawText) continue;

        let id = el.id?.trim();
        if (!id) {
          const base = slugify(rawText) || 'section';
          const count = used.get(base) ?? 0;
          used.set(base, count + 1);
          id = count === 0 ? base : `${base}-${count + 1}`;
          el.id = id;
        }

        nextItems.push({ id, text: rawText, level });
      }

      setItems(nextItems);
    }

    collect();
    // route change 시 content가 바뀌므로 다음 프레임에 한 번 더 수집
    const raf = window.requestAnimationFrame(collect);
    return () => window.cancelAnimationFrame(raf);
  }, [contentSelector, pathname]);

  useEffect(() => {
    const contentEl = document.querySelector(contentSelector) as HTMLElement | null;
    const scrollEl = document.querySelector(scrollContainerSelector) as HTMLElement | null;
    if (!contentEl || !scrollEl) return;
    const content = contentEl;
    const scroll = scrollEl;

    function scrollToId(id: string, behavior: ScrollBehavior) {
      scrollToIdInContainer(id, behavior);
    }

    function syncFromHash(behavior: ScrollBehavior) {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) return;
      scrollToId(hash, behavior);
    }

    // 초기 해시 스크롤 보정
    syncFromHash('auto');

    const onHashChange = () => syncFromHash('smooth');
    window.addEventListener('hashchange', onHashChange);

    // active 섹션 하이라이트
    const onScroll = () => {
      const headings = items
        .map((it) => content.querySelector(`#${CSS.escape(it.id)}`) as HTMLElement | null)
        .filter(Boolean) as HTMLElement[];

      if (headings.length === 0) return;

      const currentY = scroll.scrollTop + headerOffset + 1;
      let best: { id: string; top: number } | null = null;
      for (const h of headings) {
        const top =
          h.getBoundingClientRect().top -
          scroll.getBoundingClientRect().top +
          scroll.scrollTop;
        if (top <= currentY) best = { id: h.id, top };
      }

      setActiveId(best?.id ?? headings[0]?.id ?? null);
    };

    onScroll();
    scroll.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      scroll.removeEventListener('scroll', onScroll);
    };
  }, [contentSelector, headerOffset, items, scrollContainerSelector]);

  if (items.length === 0) {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="text-fleet-body3Strong text-muted-foreground">On this page</div>
        <div className="text-fleet-caption1 text-muted-foreground/70">이 페이지에는 목차가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3 py-6', className)}>
      <div className="text-fleet-caption1Strong text-muted-foreground font-bold!">On this page</div>
      <nav className="space-y-0">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={cn(
              'block rounded-md px-2 py-2 text-muted-foreground hover:bg-muted hover:text-foreground font-medium text-sm tracking-normal',
              it.level === 1 && 'pl-2 text-base',
              it.level === 2 && 'pl-2 text-base font-semibold! text-foreground/80',
              it.level === 3 && 'pl-6 text-sm text-foreground/60',
              it.level === 4 && 'pl-8 text-xs text-foreground/50',
              activeId === it.id && 'bg-muted-foreground/10 text-foreground font-bold',
            )}
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, '', `#${it.id}`);
              scrollToIdInContainer(it.id, 'smooth');
              setActiveId(it.id);
            }}
          >
            {it.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

