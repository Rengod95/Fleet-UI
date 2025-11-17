export const primitiveSpacing = {
	0: 0,
	1: 2,
	2: 4,
	3: 8,
	4: 12,
	5: 16,
	6: 20,
	7: 24,
	8: 28,
	9: 32,
	10: 36,
	11: 40,
} as const;

export type PrimitiveSpacing = typeof primitiveSpacing;
