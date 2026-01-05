import type { JSX } from 'react';
import { type ComponentSlug } from '@/lib/generated/components';

export const componentPreviews: Record<ComponentSlug, JSX.Element> = {
  accordion: (
    <div className="flex w-full flex-col gap-2 p-4">
      <div className="h-8 w-full rounded border bg-muted/50" />
      <div className="space-y-1 rounded border bg-background p-2 shadow-sm">
        <div className="h-4 w-1/3 rounded bg-muted" />
        <div className="h-2 w-full rounded bg-muted/30" />
        <div className="h-2 w-2/3 rounded bg-muted/30" />
      </div>
      <div className="h-8 w-full rounded border bg-muted/50" />
    </div>
  ),
  actionbutton: (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 shadow-md">
        <div className="h-4 w-4 rounded-full bg-primary-foreground/30" />
        <div className="h-2 w-12 rounded bg-primary-foreground/50" />
      </div>
    </div>
  ),
  'bottom-sheet-modal': (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-md bg-muted/20">
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />
      <div className="relative z-10 w-full rounded-t-xl border bg-background p-3 shadow-lg">
        <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-muted/50" />
          <div className="h-20 w-full rounded bg-muted/20" />
          <div className="h-8 w-full rounded bg-primary/20" />
        </div>
      </div>
    </div>
  ),
  button: (
    <div className="flex w-full flex-col gap-3 p-4 items-center justify-center">
      <div className="h-9 w-24 rounded-md bg-primary shadow-sm" />
      <div className="h-9 w-24 rounded-md border bg-background shadow-sm" />
    </div>
  ),
  card: (
    <div className="flex w-full px-6 py-4">
      <div className="w-full space-y-3 rounded-xl border bg-background p-4 shadow-sm">
        <div className="space-y-1">
          <div className="h-4 w-1/2 rounded bg-muted/80" />
          <div className="h-3 w-3/4 rounded bg-muted/40" />
        </div>
        <div className="h-16 rounded-lg bg-muted/20" />
      </div>
    </div>
  ),
  checkbox: (
    <div className="flex w-full flex-col gap-3 p-6 items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded border-2 border-primary bg-primary" />
        <div className="h-2 w-16 rounded bg-muted/60" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded border-2 border-muted" />
        <div className="h-2 w-16 rounded bg-muted/30" />
      </div>
    </div>
  ),
  'checkbox-card': (
    <div className="flex w-full p-4">
      <div className="flex w-full items-start gap-3 rounded-xl border-2 border-primary bg-primary/5 p-3">
        <div className="h-5 w-5 rounded border border-primary bg-primary" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/3 rounded bg-primary/40" />
          <div className="h-2 w-full rounded bg-primary/20" />
          <div className="h-2 w-2/3 rounded bg-primary/20" />
        </div>
      </div>
    </div>
  ),
  chip: (
    <div className="flex w-full flex-wrap gap-2 p-4 items-center justify-center">
      <div className="h-6 w-16 rounded-full bg-primary/20" />
      <div className="h-6 w-12 rounded-full border bg-background" />
      <div className="h-6 w-20 rounded-full bg-muted" />
    </div>
  ),
  'context-header': (
    <div className="flex w-full flex-col bg-background">
      <div className="flex w-full flex-col gap-2 border-b p-3">
        <div className="h-6 w-full rounded bg-muted/20" />
      </div>
      <div className="flex-1 bg-muted/5" />
    </div>
  ),
  divider: (
    <div className="flex w-full flex-col justify-center gap-4 p-6">
      <div className="h-2 w-full rounded bg-muted/10" />
      <div className="h-px w-full bg-border" />
      <div className="h-2 w-full rounded bg-muted/10" />
    </div>
  ),
  icon: (
    <div className="grid w-full grid-cols-4 gap-4 p-6 place-items-center">
      <div className="h-6 w-6 rounded-md bg-muted" />
      <div className="h-6 w-6 rounded-md bg-muted" />
      <div className="h-6 w-6 rounded-md bg-primary/20" />
      <div className="h-6 w-6 rounded-md bg-muted" />
    </div>
  ),
  'icon-button': (
    <div className="flex w-full items-center justify-center gap-4 p-4">
      <div className="h-10 w-10 rounded-full border bg-background shadow-sm" />
      <div className="h-10 w-10 rounded-md bg-primary shadow-sm" />
    </div>
  ),
  'image-card': (
    <div className="flex w-full px-6 py-4">
       <div className="w-full overflow-hidden rounded-xl border bg-background shadow-sm">
         <div className="h-20 w-full bg-muted" />
         <div className="p-3 space-y-2">
           <div className="h-3 w-2/3 rounded bg-muted/60" />
           <div className="h-2 w-1/2 rounded bg-muted/30" />
         </div>
       </div>
    </div>
  ),
  input: (
    <div className="flex w-full flex-col gap-3 p-6 justify-center">
      <div className="h-9 w-full rounded-md border bg-background shadow-sm" />
      <div className="flex gap-2">
        <div className="h-9 w-full rounded-md border bg-muted/30" />
      </div>
    </div>
  ),
  item: (
    <div className="flex w-full flex-col divide-y rounded-lg border bg-background mx-4 my-2">
      <div className="flex h-10 items-center justify-between px-3">
        <div className="h-3 w-16 rounded bg-muted/60" />
        <div className="h-3 w-3 rounded bg-muted/40" />
      </div>
      <div className="flex h-10 items-center justify-between px-3">
        <div className="h-3 w-20 rounded bg-muted/60" />
        <div className="h-3 w-3 rounded bg-muted/40" />
      </div>
    </div>
  ),
  'layout-top': (
    <div className="flex h-full w-full flex-col rounded-md border bg-muted/10 overflow-hidden">
      <div className="h-10 w-full border-b bg-background shadow-sm" />
      <div className="flex-1 p-2">
        <div className="h-full w-full rounded bg-muted/10" />
      </div>
    </div>
  ),
  menu: (
    <div className="flex w-full justify-center p-4">
      <div className="w-32 space-y-1 rounded-lg border bg-background p-1 shadow-md">
        <div className="h-6 w-full rounded bg-muted/50" />
        <div className="h-6 w-full rounded bg-primary/10" />
        <div className="h-px w-full bg-border my-1" />
        <div className="h-6 w-full rounded bg-transparent" />
      </div>
    </div>
  ),
  modal: (
    <div className="relative flex h-full w-full items-center justify-center bg-muted/20">
      <div className="absolute inset-0 bg-background/50" />
      <div className="relative z-10 w-3/5 space-y-3 rounded-lg border bg-background p-4 shadow-lg">
        <div className="h-3 w-1/2 rounded bg-muted/80" />
        <div className="h-10 rounded bg-muted/30" />
        <div className="flex justify-end gap-2">
          <div className="h-6 w-12 rounded bg-muted/50" />
          <div className="h-6 w-12 rounded bg-primary/20" />
        </div>
      </div>
    </div>
  ),
  'otp-input': (
    <div className="flex w-full items-center justify-center gap-2 p-4">
      <div className="h-10 w-8 rounded-md border bg-background shadow-sm" />
      <div className="h-10 w-8 rounded-md border border-primary bg-background shadow-sm" />
      <div className="h-10 w-8 rounded-md border bg-background shadow-sm" />
      <div className="h-10 w-8 rounded-md border bg-background shadow-sm" />
    </div>
  ),
  progress: (
    <div className="flex w-full flex-col justify-center gap-4 p-6">
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted/30">
        <div className="h-full w-2/3 bg-primary" />
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted/30">
        <div className="h-full w-1/3 bg-primary/60" />
      </div>
    </div>
  ),
  radio: (
    <div className="flex w-full flex-col gap-3 p-6 items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded-full border-[5px] border-primary bg-background" />
        <div className="h-2 w-16 rounded bg-muted/60" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded-full border-2 border-muted" />
        <div className="h-2 w-16 rounded bg-muted/30" />
      </div>
    </div>
  ),
  'radio-card': (
    <div className="flex w-full p-4">
      <div className="flex w-full items-start gap-3 rounded-xl border-2 border-primary bg-primary/5 p-3">
        <div className="mt-0.5 h-4 w-4 rounded-full border-[4px] border-primary bg-background" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/3 rounded bg-primary/40" />
          <div className="h-2 w-full rounded bg-primary/20" />
        </div>
      </div>
    </div>
  ),
  section: (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="space-y-2 rounded-lg border border-dashed bg-muted/5 p-3">
        <div className="h-3 w-1/4 rounded bg-muted/50" />
        <div className="h-8 rounded bg-muted/20" />
      </div>
    </div>
  ),
  slider: (
    <div className="flex w-full flex-col justify-center gap-6 p-6">
      <div className="relative h-1.5 w-full rounded-full bg-muted/30">
        <div className="absolute h-full w-1/2 rounded-full bg-primary" />
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-background shadow-sm" />
      </div>
    </div>
  ),
  state: (
    <div className="flex w-full flex-col gap-3 p-4 items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center">
            <div className="h-6 w-6 rounded bg-muted/60" />
        </div>
        <div className="h-2 w-16 rounded bg-muted/40" />
        <div className="h-1.5 w-24 rounded bg-muted/20" />
    </div>
  ),
  'step-indicator': (
    <div className="flex w-full items-center justify-center gap-1 p-4">
      <div className="h-6 w-6 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-bold">1</div>
      <div className="h-0.5 w-6 bg-primary" />
      <div className="h-6 w-6 rounded-full border-2 border-muted text-[10px] text-muted-foreground flex items-center justify-center">2</div>
      <div className="h-0.5 w-6 bg-muted" />
      <div className="h-6 w-6 rounded-full border-2 border-muted text-[10px] text-muted-foreground flex items-center justify-center">3</div>
    </div>
  ),
  swiper: (
    <div className="flex w-full flex-col gap-3 p-4 overflow-hidden">
      <div className="flex gap-3">
        <div className="h-24 w-40 shrink-0 rounded-lg bg-muted/40" />
        <div className="h-24 w-40 shrink-0 rounded-lg bg-muted/40" />
      </div>
      <div className="flex justify-center gap-1.5">
        <div className="h-1.5 w-3 rounded-full bg-primary" />
        <div className="h-1.5 w-1.5 rounded-full bg-muted" />
        <div className="h-1.5 w-1.5 rounded-full bg-muted" />
      </div>
    </div>
  ),
  switch: (
    <div className="flex w-full items-center justify-center gap-4 p-4">
      <div className="flex h-5 w-9 rounded-full bg-primary/20 p-0.5">
        <div className="h-4 w-4 rounded-full bg-background shadow-sm translate-x-4" />
      </div>
      <div className="flex h-5 w-9 rounded-full bg-muted p-0.5">
        <div className="h-4 w-4 rounded-full bg-background shadow-sm" />
      </div>
    </div>
  ),
  tabbar: (
    <div className="flex h-full w-full flex-col justify-end rounded-lg bg-muted/10">
      <div className="flex h-12 w-full items-center justify-around border-t bg-background">
        <div className="h-5 w-5 rounded bg-primary/20" />
        <div className="h-5 w-5 rounded bg-muted/40" />
        <div className="h-5 w-5 rounded bg-muted/40" />
        <div className="h-5 w-5 rounded bg-muted/40" />
      </div>
    </div>
  ),
  'table-row': (
    <div className="flex w-full flex-col divide-y p-4">
       <div className="flex items-center justify-between py-2">
         <div className="h-2 w-1/3 rounded bg-muted/50" />
         <div className="h-2 w-1/6 rounded bg-muted/30" />
       </div>
       <div className="flex items-center justify-between py-2">
         <div className="h-2 w-1/2 rounded bg-muted/50" />
         <div className="h-2 w-1/6 rounded bg-muted/30" />
       </div>
       <div className="flex items-center justify-between py-2">
         <div className="h-2 w-1/4 rounded bg-muted/50" />
         <div className="h-2 w-1/6 rounded bg-muted/30" />
       </div>
    </div>
  ),
  toast: (
    <div className="flex h-full w-full flex-col justify-end p-4">
         <div className="w-full rounded-lg border bg-background p-3 shadow-lg flex gap-3 items-center">
            <div className="h-8 w-8 rounded bg-green-500/20" />
            <div className="space-y-1.5 flex-1">
                <div className="h-2 w-2/3 rounded bg-muted/60" />
                <div className="h-1.5 w-full rounded bg-muted/30" />
            </div>
         </div>
    </div>
  ),
  typo: (
    <div className="flex w-full flex-col gap-2 p-6 justify-center">
      <div className="h-6 w-2/3 rounded bg-foreground/80" />
      <div className="h-4 w-full rounded bg-muted/60" />
      <div className="h-4 w-5/6 rounded bg-muted/60" />
    </div>
  ),
};
