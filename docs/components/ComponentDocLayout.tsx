import { DemoFrame } from './DemoFrame';
import type { ComponentDoc } from '../lib/component-docs';
import { CodeBlock } from './CodeBlock';
import { Callout } from './Callout';

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl bg-card p-4 shadow-sm">
      <div className="text-fleet-body3Strong">{title}</div>
      <div className="mt-2 text-fleet-body3 text-muted-foreground">{children}</div>
    </section>
  );
}

function List({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}

function DirectoryBlock({ lines }: { lines?: string[] }) {
  if (!lines?.length) return null;
  return <CodeBlock code={lines.join('\n')} />;
}

export function ComponentDocLayout({
  doc,
  content,
}: {
  doc: ComponentDoc;
  content?: React.ReactNode;
}) {
  return (
    <div className="not-prose">
      <div className="space-y-6">
        {/* Demo iframe is always on top */}
        <DemoFrame slug={doc.slug} />

        <div>
          <h1 className="text-fleet-h2Strong">{doc.name}</h1>
          <div className="mt-2 text-fleet-body3 text-muted-foreground">{doc.oneLiner}</div>
        </div>

        {/* <Callout variant="tip" title="문서 작성 규칙">
          이 페이지는 공통 템플릿을 기반으로 구성됩니다. Props 표 전략(수동/자동/혼합)은
          다음 세션에서 확정합니다.
        </Callout> */}

        {content ? <div className="docs-prose">{content}</div> : null}
      </div>
    </div>
  );
}

