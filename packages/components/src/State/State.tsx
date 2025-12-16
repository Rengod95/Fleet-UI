import {
	AlertCircle,
	AlertTriangle,
	CheckCircle,
	CircleDot,
	Info,
} from 'lucide-react-native';
import { forwardRef, isValidElement } from 'react';
import { Text as RNText, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import type {
	StateComponent,
	StateProps,
	StateVariant,
	VariantIconConfig,
} from './State.types';
import { StateButton } from './StateButton';

// ------------------------------------------------------------
// CONSTANTS
// ------------------------------------------------------------
const VARIANT_ICON_MAP: Record<
	Exclude<StateVariant, 'ghost'>,
	VariantIconConfig
> = {
	error: {
		icon: AlertCircle,
		colorScheme: 'error',
	},
	warning: {
		icon: AlertTriangle,
		colorScheme: 'warning',
	},
	info: {
		icon: Info,
		colorScheme: 'info',
	},
	success: {
		icon: CheckCircle,
		colorScheme: 'success',
	},
	neutral: {
		icon: CircleDot,
		colorScheme: 'neutral',
	},
} as const;

/**
 * State Component
 *
 * A component that visually displays the result of a specific task.
 * It is commonly used to notify users of successful tasks or errors, and to provide various messages and actions.
 *
 * @example
 * ```tsx
 * <State
 *   variant="success"
 *   title="Completed"
 *   description="The request has been successfully processed."
 *   button={<State.Button onPress={handleRetry}>Back to Home</State.Button>}
 * />
 * ```
 */
export const StateRoot = forwardRef<View, StateProps>((props, ref) => {
	const {
		variant = 'neutral',
		asset,
		title,
		description,
		button,
		style,
		titleStyle,
		descriptionStyle,
		...restProps
	} = props;

	const { theme } = useUnistyles();
	styles.useVariants({ variant });

	const renderAsset = () => {
		// If asset is provided from the outside, use it as is
		if (asset) {
			return <View style={styles.assetContainer}>{asset}</View>;
		}

		const IconConfig =
			VARIANT_ICON_MAP[variant as keyof typeof VARIANT_ICON_MAP];

		// ghost variant does not render the icon
		if (variant === 'ghost') {
			return null;
		}

		// Render the default icon based on the variant

		return (
			<View style={styles.assetContainer}>
				<View style={styles.iconFrame}>
					<IconConfig.icon
						size={36}
					/>
				</View>
			</View>
		);
	};

	const renderTitle = () => {
		if (!title) return null;

		if (isValidElement(title)) {
			return title;
		}

		return (
			<RNText style={[styles.title, titleStyle]} accessibilityRole="header">
				{title}
			</RNText>
		);
	};

	const renderDescription = () => {
		if (!description) return null;

		if (isValidElement(description)) {
			return description;
		}

		return (
			<RNText style={[styles.description, descriptionStyle]}>
				{description}
			</RNText>
		);
	};

	const renderButton = () => {
		if (!button) return null;

		return <View style={styles.buttonContainer}>{button}</View>;
	};

	return (
		<View
			ref={ref}
			style={[styles.container, style]}
			accessibilityRole="summary"
			{...restProps}
		>
			{renderAsset()}
			{renderTitle()}
			{renderDescription()}
			{renderButton()}
		</View>
	);
})

StateRoot.displayName = 'State';

// Compound component pattern
export const State = Object.assign(StateRoot, {
	Button: StateButton,
}) satisfies StateComponent;

// ------------------------------------------------------------
// STYLES
// ------------------------------------------------------------
const styles = StyleSheet.create((theme) => ({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: theme.spacing[6],
		paddingVertical: theme.spacing[8],
	},
	assetContainer: {
		marginBottom: theme.spacing[6],
	},
	iconFrame: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 72,
		height: 72,
		borderRadius: theme.rounded.xl,
		borderCurve: 'continuous',
		variants: {
			variant: {
				error: {
					backgroundColor: theme.colors.error.content_2,
				},
				warning: {
					backgroundColor: theme.colors.warning.content_2,
				},
				info: {
					backgroundColor: theme.colors.info.content_2,
				},
				success: {
					backgroundColor: theme.colors.success.content_2,
				},
				neutral: {
					backgroundColor: theme.colors.neutral.content_2,
				},
				ghost: {
					backgroundColor: 'transparent',
				},
			},
		},
	},
	title: {
		...theme.typography.h4,
		letterSpacing: theme.text.letterSpacing.wide,
		color: theme.colors.neutral.text_1,
		textAlign: 'center',
		marginBottom: theme.spacing[2],
	},
	description: {
		...theme.typography.body2,
		letterSpacing: theme.text.letterSpacing.wide,
		color: theme.colors.neutral.text_3,
		textAlign: 'center',
		marginBottom: theme.spacing[5],
	},
	buttonContainer: {
		marginTop: theme.spacing[3],
	},
}));
