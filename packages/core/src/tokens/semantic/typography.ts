import { primitiveTypography } from '../primitive/typography';

const { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } =
	primitiveTypography;

export const semanticTypography = {
	h1: {
		fontFamily: fontFamily.primary,
		fontSize: fontSize._5xl,
		fontWeight: fontWeight.bold,
		lineHeight: lineHeight._5xl,
		letterSpacing: letterSpacing.tight,
	},
	h2: {
		fontFamily: fontFamily.primary,
		fontSize: fontSize._4xl,
		fontWeight: fontWeight.bold,
		lineHeight: lineHeight._4xl,
		letterSpacing: letterSpacing.tight,
	},
	h3: {
		fontFamily: fontFamily.primary,
		fontSize: fontSize._3xl,
		fontWeight: fontWeight.semibold,
		lineHeight: lineHeight._3xl,
		letterSpacing: letterSpacing.normal,
	},
	h4: {
		fontFamily: fontFamily.primary,
		fontSize: fontSize._2xl,
		fontWeight: fontWeight.semibold,
		lineHeight: lineHeight._2xl,
		letterSpacing: letterSpacing.normal,
	},
	h5: {
		fontFamily: fontFamily.primary,
		fontSize: fontSize.xl,
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight.xl,
		letterSpacing: letterSpacing.normal,
	},
	h6: {
		fontFamily: fontFamily.primary,
		fontSize: fontSize.lg,
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight.lg,
		letterSpacing: letterSpacing.normal,
	},
	body1: {
		fontFamily: fontFamily.primary,
		fontSize: fontSize.lg,
		fontWeight: fontWeight.regular,
		lineHeight: lineHeight.lg,
		letterSpacing: letterSpacing.normal,
	},
	body2: {
		fontFamily: fontFamily.primary,
		fontSize: fontSize.md,
		fontWeight: fontWeight.regular,
		lineHeight: lineHeight.md,
		letterSpacing: letterSpacing.normal,
	},
	body3: {
		fontFamily: fontFamily.primary,
		fontSize: fontSize.sm,
		fontWeight: fontWeight.regular,
		lineHeight: lineHeight.sm,
		letterSpacing: letterSpacing.normal,
	},
	caption1: {
		fontFamily: fontFamily.primary,
		fontSize: fontSize.xs,
		fontWeight: fontWeight.regular,
		lineHeight: lineHeight.xs,
		letterSpacing: letterSpacing.normal,
	},
	caption2: {
		fontFamily: fontFamily.primary,
		fontSize: fontSize._2xs,
		fontWeight: fontWeight.regular,
		lineHeight: lineHeight._2xs,
		letterSpacing: letterSpacing.normal,
	},
	button: {
		fontFamily: fontFamily.primary,
		fontSize: fontSize.md,
		fontWeight: fontWeight.semibold,
		lineHeight: lineHeight.md,
		letterSpacing: letterSpacing.tight,
	},
} as const;

export type SemanticTypography = typeof semanticTypography;
