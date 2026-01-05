import type { ReactNode } from 'react';

import { AlertCircle, Info, Lightbulb } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type CalloutVariant = 'info' | 'tip' | 'warn';

const variantToIcon: Record<CalloutVariant, React.ComponentType<{ className?: string }>> =
  {
    info: Info,
    tip: Lightbulb,
    warn: AlertCircle,
  };

export function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: CalloutVariant;
  title: string;
  children: ReactNode;
}) {
  const Icon = variantToIcon[variant];
  return (
    <Alert
      variant={variant === 'warn' ? 'destructive' : 'default'}
      className={cn(
        'my-4 border-0 bg-card shadow-sm',
        variant === 'warn' && 'bg-card',
      )}
    >
      <Icon className="opacity-80" />
      <AlertTitle className="text-fleet-body3Strong">{title}</AlertTitle>
      <AlertDescription className="text-fleet-body3 text-muted-foreground">
        {children}
      </AlertDescription>
    </Alert>
  );
}

