import type { JSX } from 'react';
import { type ComponentSlug } from '@/lib/generated/components';

export const componentPreviews: Record<ComponentSlug, JSX.Element> = {
  accordion: (
    <div className="flex w-full flex-col gap-2 p-4">
      <div className="h-8 w-full rounded  bg-muted/50" />
      <div className="space-y-1 rounded  bg-background p-2 shadow-sm">
        <div className="h-4 w-1/3 rounded bg-muted" />
        <div className="h-2 w-full rounded bg-muted/30" />
        <div className="h-2 w-2/3 rounded bg-muted/30" />
      </div>
      <div className="h-8 w-full rounded bg-muted/50" />
    </div>
  ),
  actionbutton: (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex flex-col items-center gap-2 rounded-xl bg-primary px-4 py-3 shadow-md">
        <div className="flex p-2 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground">
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15l-4.9 2.7.9-5.5-4-3.9 5.5-.8z" />
          </svg>
        </div>
        <div className="h-2 w-10 rounded bg-primary-foreground/60 mt-2" />
      </div>
    </div>
  ),
  'bottom-sheet-modal': (
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-md">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      <div className="relative z-10 w-full rounded-t-2xl bg-card p-4 shadow-2xl">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted" />
        <div className="space-y-2.5">
          <div className="h-4 w-3/4 rounded bg-muted/50" />
          <div className="h-16 w-full rounded bg-muted/15" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary/20" />
            <div className="h-8 flex-1 rounded bg-primary/15" />
          </div>
        </div>
      </div>
    </div>
  ),
  button: (
    <div className="flex w-full flex-col gap-3 p-4 items-center justify-center">
      <div className="h-9 w-24 rounded-md bg-primary shadow-sm" />
      <div className="h-9 w-24 rounded-md bg-background shadow-sm" />
    </div>
  ),
  // card: (
  //   <div className="flex w-full px-6 py-4">
  //     <div className="w-full space-y-3 rounded-xl bg-background p-4 shadow-sm">
  //       <div className="space-y-1">
  //         <div className="h-4 w-1/2 rounded bg-muted/80" />
  //         <div className="h-3 w-3/4 rounded bg-muted/40" />
  //       </div>
  //       <div className="h-16 rounded-lg bg-muted/20" />
  //     </div>
  //   </div>
  // ),
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
    <div className="flex w-full flex-wrap items-center justify-center gap-2 p-4">
      <div className="flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1.5">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-primary">
          <svg
            aria-hidden="true"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15l-4.9 2.7.9-5.5-4-3.9 5.5-.8z" />
          </svg>
        </span>
        <div className="h-2 w-10 rounded bg-primary/60" />
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-primary">
          <svg
            aria-hidden="true"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-1.5">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-muted/40 text-muted-foreground">
          <svg
            aria-hidden="true"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 7v4l9 9 8-8-9-9H3z" />
            <circle cx="7" cy="7" r="1.5" />
          </svg>
        </span>
        <div className="h-2 w-8 rounded bg-muted/60" />
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-muted/30 text-muted-foreground">
          <svg
            aria-hidden="true"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
        <div className="h-2 w-6 rounded bg-muted-foreground/50" />
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-muted-foreground/20 text-muted-foreground">
          <svg
            aria-hidden="true"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </span>
      </div>
    </div>
  ),
  'context-header': (
    <div className="flex w-full flex-col bg-background">
      <div className="flex items-center justify-between p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card border text-muted-foreground">
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
        <div className="h-3 w-28 rounded bg-muted/60" />
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/20 text-muted-foreground">
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="6" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="18" cy="12" r="1.5" />
          </svg>
        </div>
      </div>
      <div className="flex-1 bg-muted/5" />
    </div>
  ),
  divider: (
    <div className="flex w-full flex-col gap-6 p-6">
      <div className="space-y-2">
        <div className="h-4 w-1/2 rounded bg-muted/60" />
        <div className="h-16 rounded-lg bg-muted/15" />
      </div>
      <div className="h-px w-full bg-border" />
      <div className="space-y-2">
        <div className="h-4 w-1/3 rounded bg-muted/60" />
        <div className="h-16 rounded-lg bg-muted/10" />
      </div>
    </div>
  ),
  icon: (
    <div className="grid w-full grid-cols-4 place-items-center gap-4 p-6 text-muted-foreground">
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 16v-5a6 6 0 1 1 12 0v5l2 2H4z" />
        <path d="M9 18a3 3 0 0 0 6 0" />
      </svg>
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" y1="6" x2="14" y2="6" />
        <circle cx="18" cy="6" r="2" />
        <line x1="4" y1="12" x2="10" y2="12" />
        <circle cx="14" cy="12" r="2" />
        <line x1="4" y1="18" x2="12" y2="18" />
        <circle cx="16" cy="18" r="2" />
      </svg>
    </div>
  ),
  'icon-button': (
    <div className="flex w-full items-center justify-center gap-4 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm text-muted-foreground">
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary shadow-sm text-primary-foreground">
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 12l3 3 7-7" />
        </svg>
      </div>
    </div>
  ),
  'image-card': (
    <div className="flex w-full px-6 py-4">
       <div className="w-full overflow-hidden rounded-xl bg-background">
         <div className="h-32 w-0.8 bg-muted" />
         <div className="p-3 space-y-2">
           <div className="h-3 w-2/3 rounded bg-muted/60" />
           <div className="h-2 w-1/2 rounded bg-muted/30" />
         </div>
       </div>
    </div>
  ),
  input: (
    <div className="flex w-full flex-col justify-center gap-3 p-6">
      <div className="flex h-9 w-full items-center gap-2 rounded-md bg-background px-3 shadow-sm">
        <svg
          aria-hidden="true"
          className="h-4 w-4 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="6" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <div className="h-2 w-full rounded bg-muted/40" />
        <svg
          aria-hidden="true"
          className="h-4 w-4 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      </div>
    </div>
  ),
  item: (
    <div className="mx-4 my-2 flex w-full flex-col divide-y rounded-lg bg-background">
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/20 text-muted-foreground">
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 7h6l2 2h10v10H3z" />
          </svg>
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-3 w-24 rounded bg-muted/60" />
          <div className="h-2 w-32 rounded bg-muted/30" />
        </div>
        <div className="flex h-6 w-6 items-center justify-center text-muted-foreground">
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/20 text-muted-foreground">
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 16v-5a6 6 0 1 1 12 0v5l2 2H4z" />
            <path d="M9 18a3 3 0 0 0 6 0" />
          </svg>
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-3 w-20 rounded bg-muted/60" />
          <div className="h-2 w-28 rounded bg-muted/30" />
        </div>
        <div className="h-3 w-10 rounded bg-muted/40" />
      </div>
    </div>
  ),
  'layout-top': (
    <div className="flex h-full w-full flex-col rounded-md bg-background p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/20 text-muted-foreground">
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7l9-4 9 4-9 4z" />
          <path d="M3 7v10l9 4 9-4V7" />
          <path d="M12 11v10" />
        </svg>
      </div>
      <div className="mt-3 h-5 w-2/3 rounded bg-foreground/80" />
      <div className="mt-2 h-3 w-4/5 rounded bg-muted/50" />
      <div className="mt-1 h-3 w-2/3 rounded bg-muted/40" />
    </div>
  ),
  menu: (
    <div className="flex w-full justify-center p-4">
      <div className="w-36 space-y-2 rounded-lg bg-background p-2 shadow-md">
        <div className="flex items-center justify-between rounded-md px-2 py-1.5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="3" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
            <div className="h-2 w-14 rounded bg-muted/70" />
          </div>
          <div className="flex h-4 w-4 items-center justify-center rounded-sm border  text-muted-foreground">
            <svg
              aria-hidden="true"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 12l4 4 8-8" />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-md bg-muted/20 px-2 py-1.5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15l-4.9 2.7.9-5.5-4-3.9 5.5-.8z" />
            </svg>
            <div className="h-2 w-12 rounded bg-muted/70" />
          </div>
          <div className="h-2 w-6 rounded bg-muted/50" />
        </div>
        <div className="flex items-center justify-between rounded-md bg-muted/20 px-2 py-1.5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h18M12 3l9 9-9 9" />
            </svg>
            <div className="h-2 w-10 rounded bg-muted/70" />
          </div>
          <svg
            aria-hidden="true"
            className="h-4 w-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  ),
  modal: (
    <div className="relative flex h-full w-full items-center justify-center bg-muted/20">
      <div className="absolute inset-0 bg-background/50" />
      <div className="relative z-10 w-4/5 space-y-4 rounded-xl bg-card p-6 shadow-lg">
        <div className="h-4 w-1/2 rounded bg-muted/80" />
        <div className="h-16 rounded bg-muted/30" />
        <div className="flex justify-end gap-3">
          <div className="h-8 w-16 rounded bg-muted/50" />
          <div className="h-8 w-16 rounded bg-primary/20" />
        </div>
      </div>
    </div>
  ),
  'otp-input': (
    <div className="flex w-full items-center justify-center gap-2 p-4">
      <div className="h-10 w-8 rounded-md bg-background" />
      <div className="h-10 w-8 rounded-md  bg-primary" />
      <div className="h-10 w-8 rounded-md  bg-background" />
      <div className="h-10 w-8 rounded-md  bg-background" />
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
      <div className="flex items-center justify-between rounded-lg bg-muted/5">
        <div className="space-y-1">
          <div className="h-3 w-24 rounded bg-muted/60" />
          <div className="h-2 w-40 rounded bg-muted/30" />
        </div>
        <div className="flex h-6 w-6 items-center justify-center text-muted-foreground">
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
      <div className="h-32 rounded-lg bg-muted/25" />
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
    <div className="flex w-full flex-col gap-2 p-4 items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-muted/60 flex items-center justify-center">
            <div className="h-6 w-6 rounded bg-muted/60" />
        </div>
        <div className="h-3.5 w-16 rounded bg-muted/45 mt-2" />
        <div className="h-2.5 w-24 rounded bg-muted/30" />
    </div>
  ),
  'step-indicator': (
    <div className="flex w-full items-center justify-center gap-1 p-4">
      <div className="h-3 w-3 rounded-full bg-foreground" />
      <div className="h-3 w-3 rounded-full bg-foreground" />
      <div className="h-3 w-10 rounded-full bg-foreground" />
      <div className="h-3 w-3 rounded-full bg-muted" />
      <div className="h-3 w-3 rounded-full bg-muted" />
    </div>
  ),
  swiper: (
    <div className="flex w-full items-center justify-center p-4">
      <div className="relative flex h-12 w-full max-w-xs items-center rounded-full bg-muted/30 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full  bg-white shadow-sm text-muted-foreground">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 7l4 5-4 5" />
            <path d="M12 7l4 5-4 5" />
          </svg>
        </div>
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-32 rounded bg-muted-foreground/40" />
        </div> */}
      </div>
    </div>
  ),
  switch: (
    <div className="flex w-full items-center justify-center gap-4 p-4">
      <div className="flex h-7 w-14 rounded-full bg-primary/20 p-1">
        <div className="h-5 w-8 rounded-full bg-background shadow-sm translate-x-4" />
      </div>
      <div className="flex h-7 w-14 rounded-full bg-muted p-1">
        <div className="h-5 w-8 rounded-full bg-background shadow-sm" />
      </div>
    </div>
  ),
  tabbar: (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-xs items-center rounded-full p-1 bg-background">
        <div className="flex flex-1 items-center justify-center rounded-full bg-white px-3 py-2 text-sm font-medium text-foreground shadow-sm">
          One
        </div>
        <div className="flex flex-1 items-center justify-center px-3 py-2 text-sm font-medium text-muted-foreground">
          Two
        </div>
        <div className="flex flex-1 items-center justify-center px-3 py-2 text-sm font-medium text-muted-foreground">
          Three
        </div>
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
    <div className="flex h-full w-full flex-col justify-end p-4 bg-background">
         <div className="w-full rounded-lg p-3 shadow-lg flex gap-3 items-center bg-card">
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
