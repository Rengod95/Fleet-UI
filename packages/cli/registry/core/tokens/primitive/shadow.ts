export type ShadowLayer = {
	x: number;
	y: number;
	blur: number;
	spread: number;
	opacity: number;
};

export const primitiveShadow = {
	xs: [
		{ x: 0, y: 1, blur: 2, spread: 0, opacity: 0.05 },
		{ x: 0, y: -1, blur: 2, spread: 0, opacity: 0.05 },
	],
	sm: [
		{ x: 0, y: 1, blur: 3, spread: 0, opacity: 0.07 },
		{ x: 0, y: -1, blur: 2, spread: 0, opacity: 0.06 },
	],
	md: [
		{ x: 0, y: 4, blur: 6, spread: -2, opacity: 0.09 },
		{ x: 0, y: 2, blur: 6, spread: -2, opacity: 0.06 },
		{ x: 0, y: -2, blur: 6, spread: -1, opacity: 0.06 },
	],
	lg: [
		{ x: 0, y: 10, blur: 15, spread: -3, opacity: 0.1 },
		{ x: 0, y: 4, blur: 6, spread: -2, opacity: 0.05 },
		{ x: 0, y: -4, blur: 6, spread: -2, opacity: 0.05 },
	],
	
	xl: [
		{ x: 0, y: 20, blur: 25, spread: -4, opacity: 0.1 },
		{ x: 0, y: 10, blur: 10, spread: -3, opacity: 0.05 },
		{ x: 0, y: -10, blur: 10, spread: -3, opacity: 0.05 },
	],
	'2xl': [
		{ x: 0, y: 25, blur: 50, spread: -8, opacity: 0.15 },
		{ x: 0, y: 25, blur: 30, spread: -7, opacity: 0.1 },
		{ x: 0, y: -25, blur: 50, spread: -7, opacity: 0.1 },
	],

	toast: [
		{ x: 0, y: 4, blur: 16, spread: 0, opacity: 0.1 },
		{ x: 0, y: 8, blur: 32, spread: 0, opacity: 0.1 },
	],
	card: [
		{ x: 0, y: 8, blur: 24, spread: 0, opacity: 0.1 },
		{ x: 0, y: 16, blur: 56, spread: 0, opacity: 0.1 },
		{ x: 0, y: 24, blur: 80, spread: 0, opacity: 0.1 },
	],
	inner:[
		{ x: 0, y: 0, blur: 6, spread: 0, opacity: 0.13 },
	],
	banner: [
		{ x: 0, y: 30, blur: 60, spread: -10, opacity: 0.5 },
	]
} as const;

export type PrimitiveShadow = typeof primitiveShadow;
