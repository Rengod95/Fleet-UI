'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { Check, Copy } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function CodeBlock({
  code,
  children,
  className,
  label = 'Copy',
}: {
  code?: string;
  children?: ReactNode;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const normalized = useMemo(() => {
    // MDX/code-fence에서 마지막 줄 공백/개행이 섞이는 케이스 정리
    const src = code ?? '';
    return src.replace(/\s+$/, '');
  }, [code]);

  const copyText = useMemo(() => {
    // children(예: rehype-pretty-code 결과)을 그대로 렌더링하되,
    // 복사할 텍스트는 가능한 한 원문 코드로 복원한다.
    function extract(node: unknown): string {
      if (typeof node === 'string') return node;
      if (Array.isArray(node)) return node.map(extract).join('');
      if (
        node &&
        typeof node === 'object' &&
        'props' in (node as any) &&
        (node as any).props
      ) {
        return extract((node as any).props.children);
      }
      return '';
    }

    const fromChildren = extract(children);
    const raw = normalized || fromChildren;
    return (raw ?? '').replace(/\s+$/, '');
  }, [children, normalized]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
      return;
    } catch {
      // fallback: execCommand
      const el = document.createElement('textarea');
      el.value = copyText;
      el.setAttribute('readonly', 'true');
      el.style.position = 'fixed';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <div className={cn('group relative', className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={copy}
        aria-label={label}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
      <pre className="overflow-x-auto rounded-xl bg-muted p-4 text-xs text-foreground">
        {children ? (
          children
        ) : (
          <code className="font-mono">{normalized}</code>
        )}
      </pre>
    </div>
  );
}

