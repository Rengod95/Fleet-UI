export const primitiveZIndex = {
	base: 0,
	dropdown: 10,
	sticky: 20,
	overlay: 100,
	modal: 1000,
	popover: 1500,
	toast: 2000,
	tooltip: 3000,
} as const;

export type PrimitiveZIndex = typeof primitiveZIndex;
