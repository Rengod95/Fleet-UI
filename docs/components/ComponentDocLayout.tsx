import { DemoFrame } from './DemoFrame';
import type { ComponentDoc } from '../lib/component-docs';
import { CodeBlock } from './CodeBlock';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

function SampleCodePanel({
  title,
  code,
  html,
}: {
  title: string;
  code?: string;
  html?: string;
}) {
  if (!code?.trim() && !html?.trim()) return null;

  return (
    <section className="rounded-xl bg-card p-5 shadow-sm">
      <Accordion type="single" collapsible>
        <AccordionItem value="sample-code" className="border-b-0">
          <AccordionTrigger className="py-0 text-fleet-body1Strong hover:no-underline">
            {title}
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <div className="mt-3 max-h-full overflow-y-auto">
              <CodeBlock className="codeblock-scroll h-[880px]" code={code} html={html} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

export function ComponentDocLayout({
  doc,
  content,
  sampleCode,
  sampleCodeHtml,
  locale = 'en',
}: {
  doc: ComponentDoc;
  content?: React.ReactNode;
  sampleCode?: string;
  sampleCodeHtml?: string;
  locale?: 'en' | 'ko';
}) {
  const sampleCodeTitle = 'View Playground Code';

  return (
    <div className="not-prose">
      <div className="space-y-6">
        <div className="flex flex-col align-center justify-center gap-8">
          {/* Left: Demo */}
          <div>
            <DemoFrame slug={doc.slug} />
          </div>

          {/* Right: Sample code */}
          <div className="min-w-0 xl:flex-1 xl:sticky xl:top-20">
            <SampleCodePanel title={sampleCodeTitle} code={sampleCode} html={sampleCodeHtml} />
          </div>
        </div>

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

