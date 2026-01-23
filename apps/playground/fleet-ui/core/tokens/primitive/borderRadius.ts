export const primitiveBorderRadius = {
	none: 0,
	_2xs: 4,
	xs: 8,
	sm: 12,
	md: 16,
	lg: 20,
	xl: 24,
	_2xl: 32,
	full: 9999,
} as const;

export type PrimitiveBorderRadius = typeof primitiveBorderRadius;
