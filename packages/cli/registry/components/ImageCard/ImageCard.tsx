import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { forwardRef, useMemo } from 'react';
import { Text, View } from 'react-native';
import {
	StyleSheet,
	ScopedTheme as UnistylesScopedTheme,
} from 'react-native-unistyles';
import type { AspectRatioValue, ImageCardProps } from './ImageCard.types';

// ============================================================================
// Helpers
// ============================================================================

export function parseAspectRatio(value: AspectRatioValue): number {
	if (typeof value === 'number') {
		return value;
	}
	// Parse string format 'width:height'
	const parts = value.split(':');
	if (parts.length !== 2) {
		console.warn(
			`Invalid aspect ratio format: ${value}. Expected 'width:height' format.`
		);
		return 1; // Default to square
	}

	const width = parseFloat(parts[0]);
	const height = parseFloat(parts[1]);

	if (isNaN(width) || isNaN(height) || height === 0) {
		console.warn(`Invalid aspect ratio values: ${value}`);
		return 1;
	}

	return width / height;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Content area ratio constants
 * - Vertical: bottom 40% (4/10)
 * - Horizontal: right 50% (5/10)
 */
export const DEFAULT_CONTENT_RATIO = {
	vertical: 0.34, // 34% of height
	horizontal: 0.44, // 44% of width
} as const;

// ============================================================================
// Component
// ============================================================================

/**
 * ImageCard Component
 *
 * A card component with an image background and blur overlay for content.
 *
 * 3-Layer Architecture:
 * - Container Layer: Outer frame with padding, shadow, and rounded corners
 * - Back Layer: Full-size background image (expo-image)
 * - Front Layer: Blur overlay with content slots (bottom 40% for vertical, right 50% for horizontal)
 *
 * @example
 * ```tsx
 * <ImageCard
 *   source={{ uri: 'https://example.com/image.jpg' }}
 *   title='Title'
 *   description='Description'
 *   topContent={<Badge>Featured</Badge>}
 *   action={<Button>Action</Button>}
 *   footer={<Text>Footer</Text>}
 *   contentRatio={0.42}
 *   width={320}
 *   height={213}
 *   shadow='lg'
 *   rounded='md'
 *   variant='vertical'
 * />
 * ```
 */
export const ImageCard = forwardRef<View, ImageCardProps>((props, ref) => {
	const {
		// Image props
		source,
		contentFit = 'cover',
		imageProps,

		// Layout props
		variant = 'vertical',
		aspectRatio,
		width,
		height,

		// Style props
		shadow = 'lg',
		rounded = 'md',
		size = 'md',

		// Content slots
		topContent,
		title,
		description,
		action,
		footer,
		contentRatio,

		// Accessibility
		accessibilityLabel,
		testID,

		// Text color inverted
		textColorInverted = false,

		// Rest props
		style,
		...restProps
	} = props;

	// Parse aspect ratio if provided
	const parsedAspectRatio = useMemo(
		() => (aspectRatio ? parseAspectRatio(aspectRatio) : undefined),
		[aspectRatio]
	);

	// Determine content ratio based on variant
	const totalContentRatio = contentRatio
		? contentRatio
		: variant === 'horizontal'
			? DEFAULT_CONTENT_RATIO.horizontal
			: DEFAULT_CONTENT_RATIO.vertical;

	// Setup variant-specific styles
	styles.useVariants({
		variant,
		shadow,
		rounded,
		size,
	});

	// Build container style with dynamic sizing
	const containerStyle = useMemo(() => {
		const sizeStyle: Record<string, number | string | undefined> = {};

		if (width !== undefined) {
			sizeStyle.width = width;
		}
		if (height !== undefined) {
			sizeStyle.height = height;
		}
		if (parsedAspectRatio !== undefined && height === undefined) {
			sizeStyle.aspectRatio = parsedAspectRatio;
		}

		return sizeStyle;
	}, [width, height, parsedAspectRatio]);

	// Determine if we have any front content
	const hasFrontContent = Boolean(title || description || action || footer);

	return (
		<View
			ref={ref}
			style={[styles.container, containerStyle, style]}
			accessibilityLabel={accessibilityLabel}
			testID={testID}
			{...restProps}
		>
			{/* Inner wrapper for image and content */}
			<View style={styles.innerWrapper}>
				{/* Back Layer - Background Image */}
				<Image
					{...imageProps}
					source={source}
					contentFit={contentFit}
					testID={testID ? `${testID}-image` : undefined}
					style={[styles.backgroundImage, imageProps?.style]}
				/>

				{/* Top Content - Positioned absolutely at top */}
				{topContent && (
					<View
						style={styles.topContentWrapper}
						testID={testID ? `${testID}-top-content` : undefined}
					>
						{topContent}
					</View>
				)}

				{/* Front Layer - Blur overlay with content */}
				{hasFrontContent && (
					<View
						style={[
							styles.frontLayer,
							{
								minHeight:
									variant === 'vertical'
										? `${totalContentRatio * 100}%`
										: '100%',
								width:
									variant === 'horizontal'
										? `${totalContentRatio * 100}%`
										: '100%',
							},
						]}
						testID={testID ? `${testID}-front-layer` : undefined}
					>
						{/* Blur effect */}
						<BlurView style={[styles.blurView]} intensity={30} tint={'light'} />
						{/* Gradient effect */}
						<LinearGradient
							locations={[0, 0.3, 0.9, 1]}
							colors={[
								'rgba(0, 0, 0, 0)',
								'rgba(0, 0, 0, 0.1)',
								'rgba(0, 0, 0, 0.55)',
								'rgba(0, 0, 0, 0.8)',
							]}
							style={[styles.gradientView]}
						/>

						{/* Content wrapper */}
						<View style={styles.contentWrapper}>
							<UnistylesScopedTheme name={'dark'}>
								<View style={styles.textViewContainer}>
									{title && (
										<View
											style={styles.titleWrapper}
											testID={testID ? `${testID}-title` : undefined}
										>
											<Text style={styles.titleText}>{title}</Text>
										</View>
									)}

									{description && (
										<View
											style={styles.descriptionWrapper}
											testID={testID ? `${testID}-description` : undefined}
										>
											<Text style={styles.descriptionText}>{description}</Text>
										</View>
									)}
								</View>
							</UnistylesScopedTheme>

							{action && (
								<View
									style={styles.actionWrapper}
									testID={testID ? `${testID}-action` : undefined}
								>
									{action}
								</View>
							)}

							{footer && (
								<View
									style={styles.footerWrapper}
									testID={testID ? `${testID}-footer` : undefined}
								>
									{footer}
								</View>
							)}
						</View>
					</View>
				)}
			</View>
		</View>
	);
});

ImageCard.displayName = 'ImageCard';

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create((theme) => ({
	// Container Layer - outer frame with padding
	container: {
		backgroundColor: theme.colors.neutral.content_1,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: theme.colors.neutral.content_2,
		padding: theme.spacing[2],
		overflow: 'hidden',
		borderCurve: 'continuous',

		variants: {
			variant: {
				vertical: {},
				horizontal: {},
			},
			shadow: {
				none: { boxShadow: 'none' },
				sm: { boxShadow: theme.shadows.lg },
				md: { boxShadow: theme.shadows.card },
				lg: { boxShadow: theme.shadows.xl },
			},
			rounded: {
				none: { borderRadius: 0 },
				xs: { borderRadius: theme.rounded.sm + 3 },
				sm: { borderRadius: theme.rounded.md + 3 },
				md: { borderRadius: theme.rounded.lg + 3 },
				lg: { borderRadius: theme.rounded.xl + 3 },
				xl: { borderRadius: theme.rounded._2xl + 3 },
				full: { borderRadius: theme.rounded.full },
			},
		},
	},

	// Inner wrapper - contains image and content layers
	innerWrapper: {
		position: 'relative',
		flex: 1,
		overflow: 'hidden',
		borderCurve: 'continuous',

		variants: {
			variant: {
				vertical: {
					flexDirection: 'column',
				},
				horizontal: {
					flexDirection: 'row',
				},
			},
			rounded: {
				none: { borderRadius: 0 },
				xs: { borderRadius: theme.rounded.sm },
				sm: { borderRadius: theme.rounded.md },
				md: { borderRadius: theme.rounded.lg },
				lg: { borderRadius: theme.rounded.xl },
				xl: { borderRadius: theme.rounded._2xl },
				full: { borderRadius: theme.rounded.full },
			},
		},
	},

	// Back Layer - background image
	backgroundImage: {
		...StyleSheet.absoluteFillObject,
		width: '100%',
		height: '100%',
	},

	// Top content wrapper - positioned at top of image
	topContentWrapper: {
		position: 'absolute',
		top: theme.spacing[5],
		paddingHorizontal: theme.spacing[5],
		zIndex: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: theme.spacing[2],
	},

	// Front Layer - blur overlay container
	frontLayer: {
		position: 'absolute',
		overflow: 'hidden',

		variants: {
			variant: {
				vertical: {
					bottom: 0,
					left: 0,
					right: 0,
				},
				horizontal: {
					top: 0,
					right: 0,
					bottom: 0,
				},
			},
			rounded: {
				none: {},
				xs: {},
				sm: {},
				md: {},
				lg: {},
				xl: {},
				full: {},
			},
		},
	},

	// Blur effect layer
	blurView: {
		position: 'absolute',
		borderRadius: theme.rounded.xs,
		borderCurve: 'continuous',

		overflow: 'hidden',
		bottom: 0,
		left: 0,
		right: 0,
		height: '95%',
		opacity: 0.5,
		width: '100%',
		zIndex: 1,
	},

	gradientView: {
		position: 'absolute',
		// borderRadius: theme.rounded.md,
		overflow: 'hidden',
		bottom: 0,
		left: 0,
		right: 0,
		height: '100%',
		width: '100%',
		zIndex: 1,
	},

	// Content wrapper inside front layer
	contentWrapper: {
		flex: 1,
		paddingVertical: theme.spacing[6],
		paddingHorizontal: theme.spacing[5],
		justifyContent: 'flex-start',
		zIndex: 1,
	},

	textViewContainer: {
		flex: 1,
		justifyContent: 'center',
	},

	// Content slot wrappers
	titleWrapper: {
		marginBottom: theme.spacing[1],
	},

	descriptionWrapper: {
		marginBottom: theme.spacing[2],
	},

	actionWrapper: {
		marginTop: theme.spacing[2],
	},

	footerWrapper: {
		marginTop: 'auto',
		paddingTop: theme.spacing[4],
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
	},
	titleText: {
		...theme.typography.h6,
		fontWeight: theme.text.fontWeight.semibold,
		color: theme.colors.neutral.text_1,
		textShadowColor: '#00000040',
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 3,

		variants: {
			size: {
				sm: {
					...theme.typography.body3,
					fontWeight: theme.text.fontWeight.semibold,
				},
				md: {
					...theme.typography.h6,
					fontWeight: theme.text.fontWeight.semibold,
				},
				lg: {
					...theme.typography.h5,
					fontWeight: theme.text.fontWeight.semibold,
				},
			},
		},
	},
	descriptionText: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_2,
		textShadowColor: '#00000040',
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 3,

		variants: {
			size: {
				sm: {
					...theme.typography.caption2,
					fontWeight: 400,
				},
				md: {
					...theme.typography.caption1,
					fontWeight: 400,
				},
				lg: {
					...theme.typography.body3,
					fontWeight: 400,
				},
			},
		},
	},
}));
