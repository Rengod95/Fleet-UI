import { redirect } from 'next/navigation';

export default async function LegacyComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Locale prefix(`/en/*`, `/ko/*`)를 표준 URL로 사용합니다.
  redirect(`/en/components/${slug}`);
}

