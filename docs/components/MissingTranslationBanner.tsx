import type { Locale } from '@/lib/i18n';

export function MissingTranslationBanner({
  requestedLocale,
  fallbackLocale,
}: {
  requestedLocale: Locale;
  fallbackLocale: Locale;
}) {
  return (
    <div className="mb-6 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
      {requestedLocale === 'en' ? (
        <div>
          This page is not translated yet. Showing <span className="font-medium text-foreground">Korean</span>{' '}
          content.
        </div>
      ) : (
        <div>
          이 페이지는 아직 번역되지 않았습니다. <span className="font-medium text-foreground">영문</span>{' '}
          콘텐츠를 준비 중이며, 현재는 기본 콘텐츠를 표시합니다.
        </div>
      )}
      <div className="mt-1 text-xs text-muted-foreground/80">
        requested: {requestedLocale} · fallback: {fallbackLocale}
      </div>
    </div>
  );
}

