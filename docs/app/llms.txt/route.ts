function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    // fallback for local dev
    'http://localhost:3000'
  ).replace(/\/$/, '');
}

export async function GET() {
  const base = getSiteUrl();

  const body = [
    '# Fleet UI Docs',
    '',
    'Fleet UI 디자인 시스템/컴포넌트 문서입니다.',
    '',
    '## Entry points',
    `- ${base}/en/introduce`,
    `- ${base}/ko/introduce`,
    `- ${base}/en/components`,
    `- ${base}/ko/components`,
    '',
    '## Sitemaps',
    `- ${base}/sitemap.xml`,
    '',
    '## Notes',
    '- 컴포넌트 문서는 /{locale}/components/{slug} 형태입니다.',
    '- locale은 en, ko를 지원합니다.',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

