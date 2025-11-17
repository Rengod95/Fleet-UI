export const primitiveShadow = {
	xs: '0px 1px 10px 0px rgba(0,0,0,0.08)',
	sm: '-2px -2px 4px 0px rgba(0,0,0,0.06), 2px 2px 2px 0px rgba(0,0,0,0.06)',
	md: '-2px -2px 8px 0px rgba(0,0,0,0.08), 2px 2px 4px 0px rgba(0,0,0,0.08)',
	lg: '-2px -2px 16px 0px rgba(0,0,0,0.10), 2px 2px 8px 0px rgba(0,0,0,0.10)',
	xl: '-2px -2px 24px 0px rgba(0,0,0,0.12), 2px 2px 12px 0px rgba(0,0,0,0.12)',
	floating:
		'6px -6px 24px 0px rgba(0,0,0,0.08), -6px 6px 24px 0px rgba(0,0,0,0.08)',
} as const;

export type PrimitiveShadow = typeof primitiveShadow;
