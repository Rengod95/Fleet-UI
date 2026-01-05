import { renderDocsPage } from '@/lib/render-docs-page';
import { buildAlternates } from '@/lib/seo';
import { isLocale, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  return { alternates: buildAlternates('/fundamental/theming', locale) };
}

export default function FundamentalThemingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return renderDocsPage({ params, href: '/fundamental/theming' });
}

