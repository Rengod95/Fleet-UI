import { redirect } from 'next/navigation';

export default function DeprecatedDocsLayout() {
  // Locale 라우팅(`/en/*`, `/ko/*`)로 이동했습니다.
  // 이 레이아웃은 과거 경로에서의 빌드/참조를 방어적으로 처리합니다.
  redirect('/en');
}

