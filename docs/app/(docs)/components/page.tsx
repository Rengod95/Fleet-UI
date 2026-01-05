import { redirect } from 'next/navigation';

export default function LegacyComponentsIndexPage() {
  // Locale prefix(`/en/*`, `/ko/*`)를 표준 URL로 사용합니다.
  redirect('/en/components');
}

