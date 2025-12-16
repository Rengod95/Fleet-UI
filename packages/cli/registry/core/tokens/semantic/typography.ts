import { primitiveTypography } from '../primitive/typography';

const { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } =
	primitiveTypography;

/**
 * Semantic Typography Tokens
 *
 * provide strong and weak variants for each basic typography.
 * - Strong: heavier weight, slightly larger size (for emphasis)
 * - Weak: lighter weight, slightly smaller size (for secondary information)
 *
 * the fine adjustments for sub typography (±1~2px) are not in primitive, so we directly specify them based on the primitive values.
 */
export const semanticTypography = {

	// ============================================
	// Heading Typography (h1 ~ h6)
	// ============================================

	// h1: 40px, bold (700)
	h1: {
		fontSize: fontSize._5xl,
		fontWeight: fontWeight.bold,
		lineHeight: lineHeight._5xl,
		letterSpacing: letterSpacing.tight,
	},
	h1Strong: {
		fontSize: fontSize._5xl + 1, // 41px
		fontWeight: fontWeight.extrabold,
		lineHeight: lineHeight._5xl + 2, // 48px
		letterSpacing: letterSpacing.tight,
	},
	h1Weak: {
		fontSize: fontSize._5xl - 1, // 39px
		fontWeight: fontWeight.semibold,
		lineHeight: lineHeight._5xl - 2, // 44px
		letterSpacing: letterSpacing.tight,
	},

	// h2: 32px, bold (700)
	h2: {
		fontSize: fontSize._4xl,
		fontWeight: fontWeight.bold,
		lineHeight: lineHeight._4xl,
		letterSpacing: letterSpacing.tight,
	},
	h2Strong: {
		fontSize: fontSize._4xl + 1, // 33px
		fontWeight: fontWeight.extrabold,
		lineHeight: lineHeight._4xl + 2, // 40px
		letterSpacing: letterSpacing.tight,
	},
	h2Weak: {
		fontSize: fontSize._4xl - 1, // 31px
		fontWeight: fontWeight.semibold,
		lineHeight: lineHeight._4xl - 2, // 36px
		letterSpacing: letterSpacing.tight,
	},

	// h3: 26px, semibold (600)
	h3: {
		fontSize: fontSize._3xl,
		fontWeight: fontWeight.semibold,
		lineHeight: lineHeight._3xl,
		letterSpacing: letterSpacing.normal,
	},
	h3Strong: {
		fontSize: fontSize._3xl + 1, // 27px
		fontWeight: fontWeight.bold,
		lineHeight: lineHeight._3xl + 2, // 34px
		letterSpacing: letterSpacing.normal,
	},
	h3Weak: {
		fontSize: fontSize._3xl - 1, // 25px
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight._3xl - 2, // 30px
		letterSpacing: letterSpacing.normal,
	},

	// h4: 22px, semibold (600)
	h4: {
		fontSize: fontSize._2xl,
		fontWeight: fontWeight.semibold,
		lineHeight: lineHeight._2xl,
		letterSpacing: letterSpacing.normal,
	},
	h4Strong: {
		fontSize: fontSize._2xl + 1, // 23px
		fontWeight: fontWeight.bold,
		lineHeight: lineHeight._2xl + 2, // 30px
		letterSpacing: letterSpacing.normal,
	},
	h4Weak: {
		fontSize: fontSize._2xl - 1, // 21px
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight._2xl - 2, // 26px
		letterSpacing: letterSpacing.normal,
	},

	// h5: 20px, medium (500)
	h5: {
		fontSize: fontSize.xl,
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight.xl,
		letterSpacing: letterSpacing.normal,
	},
	h5Strong: {
		fontSize: fontSize.xl + 1, // 21px
		fontWeight: fontWeight.semibold,
		lineHeight: lineHeight.xl + 2, // 28px
		letterSpacing: letterSpacing.normal,
	},
	h5Weak: {
		fontSize: fontSize.xl - 1, // 19px
		fontWeight: fontWeight.regular,
		lineHeight: lineHeight.xl - 2, // 24px
		letterSpacing: letterSpacing.normal,
	},

	// h6: 18px, medium (500)
	h6: {
		fontSize: fontSize.lg,
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight.lg,
		letterSpacing: letterSpacing.normal,
	},
	h6Strong: {
		fontSize: fontSize.lg + 1, // 19px
		fontWeight: fontWeight.semibold,
		lineHeight: lineHeight.lg + 2, // 26px
		letterSpacing: letterSpacing.normal,
	},
	h6Weak: {
		fontSize: fontSize.lg - 1, // 17px
		fontWeight: fontWeight.regular,
		lineHeight: lineHeight.lg - 2, // 22px
		letterSpacing: letterSpacing.normal,
	},

	//===========================================================================
	// Body Typography (body1 ~ body3)
	//===========================================================================

	// body1: 18px, regular (400)
	body1: {
		fontSize: fontSize.lg,
		fontWeight: fontWeight.regular,
		lineHeight: lineHeight.lg,
		letterSpacing: letterSpacing.normal,
	},
	body1Strong: {
		fontSize: fontSize.lg,
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight.lg,
		letterSpacing: letterSpacing.normal,
	},
	body1Weak: {
		fontSize: fontSize.lg,
		fontWeight: fontWeight.light,
		lineHeight: lineHeight.lg,
		letterSpacing: letterSpacing.normal,
	},

	// body2: 16px, regular (400)
	body2: {
		fontSize: fontSize.md,
		fontWeight: fontWeight.regular,
		lineHeight: lineHeight.md,
		letterSpacing: letterSpacing.normal,
	},
	body2Strong: {
		fontSize: fontSize.md,
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight.md,
		letterSpacing: letterSpacing.normal,
	},
	body2Weak: {
		fontSize: fontSize.md,
		fontWeight: fontWeight.light,
		lineHeight: lineHeight.md,
		letterSpacing: letterSpacing.normal,
	},

	// body3: 14px, regular (400)
	body3: {
		fontSize: fontSize.sm,
		fontWeight: fontWeight.regular,
		lineHeight: lineHeight.sm,
		letterSpacing: letterSpacing.normal,
	},
	body3Strong: {
		fontSize: fontSize.sm,
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight.sm,
		letterSpacing: letterSpacing.normal,
	},
	body3Weak: {
		fontSize: fontSize.sm,
		fontWeight: fontWeight.light,
		lineHeight: lineHeight.sm,
		letterSpacing: letterSpacing.normal,
	},

	// ============================================
	// Caption Typography (caption1 ~ caption2)
	// Caption의 경우 size는 유지하고 weight만 변형
	// ============================================

	// caption1: 12px, regular (400)
	caption1: {
		fontSize: fontSize.xs,
		fontWeight: fontWeight.regular,
		lineHeight: lineHeight.xs,
		letterSpacing: letterSpacing.normal,
	},
	caption1Strong: {
		fontSize: fontSize.xs,
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight.xs,
		letterSpacing: letterSpacing.normal,
	},
	caption1Weak: {
		fontSize: fontSize.xs,
		fontWeight: fontWeight.light,
		lineHeight: lineHeight.xs,
		letterSpacing: letterSpacing.normal,
	},

	// caption2: 10px, regular (400)
	caption2: {
		fontSize: fontSize._2xs,
		fontWeight: fontWeight.regular,
		lineHeight: lineHeight._2xs,
		letterSpacing: letterSpacing.normal,
	},
	caption2Strong: {
		fontSize: fontSize._2xs,
		fontWeight: fontWeight.medium,
		lineHeight: lineHeight._2xs,
		letterSpacing: letterSpacing.normal,
	},
	caption2Weak: {
		fontSize: fontSize._2xs,
		fontWeight: fontWeight.light,
		lineHeight: lineHeight._2xs,
		letterSpacing: letterSpacing.normal,
	},

	// ============================================
	// Special Typography
	// ============================================
	
	button: {
		fontSize: fontSize.md,
		fontWeight: fontWeight.semibold,
		lineHeight: lineHeight.md,
		letterSpacing: letterSpacing.tight,
	},
} as const;

export type SemanticTypography = typeof semanticTypography;

/** 모든 타이포그래피 스케일 키 (서브 타이포 포함) */
export type TypographyScale = keyof SemanticTypography;
