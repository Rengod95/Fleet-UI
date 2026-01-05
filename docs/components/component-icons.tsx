import type { JSX } from 'react';
import { type ComponentSlug } from '@/lib/generated/components';

export const componentIcons: Record<ComponentSlug, JSX.Element> = {
  accordion: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  actionbutton: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'bottom-sheet-modal': (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
      <path d="M4 14h16v6H4z" fill="currentColor" fillOpacity="0.2" />
      <path d="M10 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  button: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 10h16" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  checkbox: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'checkbox-card': (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="6" y="6" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 14h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="3" y="6" width="18" height="12" rx="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  'context-header': (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
       <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
       <path d="M4 10h16" stroke="currentColor" strokeWidth="2" />
       <circle cx="8" cy="7" r="1.5" fill="currentColor" />
       <rect x="11" y="6" width="8" height="2" rx="1" fill="currentColor" />
    </svg>
  ),
  divider: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
       <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
       <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  icon: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  ),
  'icon-button': (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="6" y="6" width="12" height="12" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  'image-card': (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 14l4-4 4 4 4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  input: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="8" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  item: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'layout-top': (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 10h16" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
       <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
       <path d="M8 9h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
       <path d="M8 15h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
       <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  modal: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
      <rect x="7" y="8" width="10" height="8" rx="1" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  'otp-input': (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
       <rect x="3" y="8" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
       <rect x="10" y="8" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
       <rect x="17" y="8" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  progress: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="10" width="16" height="4" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="4" y="10" width="8" height="4" rx="2" fill="currentColor" />
    </svg>
  ),
  radio: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  ),
  'radio-card': (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 14h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  section: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  slider: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="12" r="3" fill="currentColor" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  state: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <path d="M12 4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 20v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 12h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  'step-indicator': (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <circle cx="6" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h2" stroke="currentColor" strokeWidth="2" />
      <path d="M14 12h2" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  swiper: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="15" r="1.5" fill="currentColor" />
      <circle cx="14" cy="15" r="1.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  switch: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="8" width="16" height="8" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  tabbar: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
      <path d="M4 16h16v4H4z" stroke="currentColor" strokeWidth="2" />
      <rect x="6" y="17" width="4" height="2" rx="1" fill="currentColor" />
    </svg>
  ),
  'table-row': (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
       <rect x="4" y="6" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
       <rect x="4" y="14" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  toast: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
      <rect x="6" y="16" width="12" height="4" rx="2" fill="currentColor" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  typo: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full p-4">
      <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 5h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 19h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};
