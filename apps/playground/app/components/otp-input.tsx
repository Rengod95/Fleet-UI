import {
	OTPInput,
	type OTPInputColorScheme,
	type OTPInputRounded,
	type OTPInputShadow,
	type OTPInputSize,
	type OTPInputVariant,
	type OTPRenderProps,
	OTPSlot,
} from '@fleet-ui/components';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

// ============================================
// Constants
// ============================================

const VARIANTS: OTPInputVariant[] = ['flat', 'bordered', 'underlined', 'faded'];
const SIZES: OTPInputSize[] = ['sm', 'md', 'lg', 'xl'];
const COLOR_SCHEMES: OTPInputColorScheme[] = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
];
const RADIUS_OPTIONS: OTPInputRounded[] = ['none', 'sm', 'md', 'lg', 'full'];
const SHADOW_OPTIONS: OTPInputShadow[] = ['none', 'sm', 'md', 'lg'];

// ============================================	
// Main Component
// ============================================

export default function OTPInputExamplesScreen() {
	const { theme } = useUnistyles();
	const [completedCode, setCompletedCode] = useState<string | null>(null);

	const handleComplete = (code: string) => {
		setCompletedCode(code);
	};

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="OTPInput"
					description="One-Time Password input component with customizable slots, bounce animation on input, and support for SMS autofill."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Most basic OTPInput example (N digits available). Enter code to see the result."
				>
					<View style={styles.centerRow}>
						<OTPInput maxLength={4} placeholder="" onComplete={handleComplete} />
						
					</View>
					{completedCode && (
						<View style={styles.resultContainer}>
							<Text style={styles.resultText}>
								Entered code: {completedCode}
							</Text>
						</View>
					)}
				</Section>

			
				{/* Variants */}
				<Section
					title="Variants"
					description="Different visual styles: flat, bordered, underlined, faded."
				>
					<View style={commonStyles.fullWidthContainer}>
						{VARIANTS.map((variant) => (
							<View key={variant} style={commonStyles.column}>
								<Text style={commonStyles.label}>{variant}</Text>
								<OTPInput maxLength={4} variant={variant} />
							</View>
						))}
					</View>
				</Section>

				{/* Sizes */}
				<Section
					title="Sizes"
					description="Slot dimensions and spacing scale with size: sm, md, lg, xl."
				>
					<View style={commonStyles.fullWidthContainer}>
						{SIZES.map((size) => (
							<View key={size} style={commonStyles.column}>
								<Text style={commonStyles.label}>{size.toUpperCase()}</Text>
								<OTPInput maxLength={4} size={size} />
							</View>
						))}
					</View>
				</Section>

				{/* Color Schemes */}
				<Section
					title="Color Schemes x Variants"
					description="Color scheme changes on focus and typing. Tap to focus and see the colorScheme effect."
				>
					<View style={commonStyles.fullWidthContainer}>
						{COLOR_SCHEMES.map((colorScheme) => (
							<View key={colorScheme} style={[commonStyles.column, {marginBottom:theme.spacing[10]}]}>
								<View style={[commonStyles.row, {width:'100%', justifyContent:'flex-start'}]}>
									<Text style={[commonStyles.label, {marginBottom:0}]}>{colorScheme}</Text>
									<View
										style={[
											styles.colorBadge,
											{
												backgroundColor:
													theme.colors[colorScheme]?.border_default ??
													theme.colors.neutral.text_1,
											},
										]}
									/>
								</View>
								<View key={`${colorScheme}-bordered`} style={commonStyles.row}>
									<Text style={commonStyles.label}>VARIANT - BORDERED</Text>
									<OTPInput
										maxLength={4}
										colorScheme={colorScheme}
										variant="bordered"
									/>
								</View>
								<View key={`${colorScheme}-flat`} style={commonStyles.row}>
									<Text style={commonStyles.label}>VARIANT - FLAT</Text>
									<OTPInput
										maxLength={4}
										colorScheme={colorScheme}
										variant="flat"
									/>
								</View>
								<View key={`${colorScheme}-underlined`} style={commonStyles.row}>
									<Text style={commonStyles.label}>VARIANT - UNDERLINED</Text>
									<OTPInput
										maxLength={4}
										colorScheme={colorScheme}
										variant="underlined"
									/>
								</View>
								<View key={`${colorScheme}-faded`} style={commonStyles.row}>
									<Text style={commonStyles.label}>VARIANT - FADE</Text>
									<OTPInput
										maxLength={4}
										colorScheme={colorScheme}
										variant="faded"
									/>
								</View>
							</View>
						))}
					</View>
				</Section>

				{/* Radius */}
				<Section title="Rounded" description="Corner radius options for slots.">
					<View style={styles.radiusList}>
						{RADIUS_OPTIONS.map((radius) => (
							<View key={radius} style={styles.radiusItem}>
								<Text style={styles.radiusLabel}>{radius}</Text>
								<OTPInput maxLength={4} rounded={radius} variant="bordered" />
							</View>
						))}
					</View>
				</Section>

				{/* Shadow */}
				<Section title="Shadow" description="Shadow depth options for slots.">
					<View style={commonStyles.fullWidthContainer}>
						{SHADOW_OPTIONS.map((shadow) => (
							<View key={shadow} style={commonStyles.column}>
								<Text style={commonStyles.label}>{shadow}</Text>
								<OTPInput
									maxLength={4}
									shadow={shadow}
									variant="flat"
								/>
							</View>
						))}
					</View>
				</Section>

				{/* Gap */}
				<Section title="Gap prop" description="Gap between slots. Default is 8.">
					<View style={commonStyles.column}>
					<Text style={commonStyles.label}>GAP - SM</Text>
					<View style={commonStyles.row}>
						<OTPInput maxLength={4} gap="sm" />
					</View>
					<Text style={commonStyles.label}>GAP - MD</Text>
					<View style={commonStyles.row}>
						<OTPInput maxLength={4} gap="md" />
					</View>
					<Text style={commonStyles.label}>GAP - LG</Text>
					<View style={commonStyles.row}>
						<OTPInput maxLength={4} gap="lg" />
					</View>
					<Text style={commonStyles.label}>GAP - XL</Text>
					<View style={commonStyles.row}>
						<OTPInput maxLength={4} gap="xl" />
					</View>
					<Text style={commonStyles.label}>GAP - CUSTOM DIGIT - 8</Text>
					<View style={commonStyles.row}>
						<OTPInput maxLength={4} gap={8} />
					</View>
					</View>
				</Section>

				{/* States */}
				<Section title="States" description="Disabled and invalid states.">
					<View style={styles.stateList}>
						<View style={styles.stateItem}>
							<Text style={styles.stateLabel}>Normal</Text>
							<OTPInput maxLength={4} defaultValue="12" />
						</View>
						<View style={styles.stateItem}>
							<Text style={styles.stateLabel}>Disabled</Text>
							<OTPInput maxLength={4} defaultValue="1234" isDisabled />
						</View>
						<View style={styles.stateItem}>
							<Text style={styles.stateLabel}>Invalid</Text>
							<OTPInput maxLength={4} defaultValue="12" isInvalid />
						</View>
					</View>
				</Section>

				{/* Bottom padding */}
				<View style={{ height: 100 }} />
			</View>
		</ScrollView>
	);
}

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create((theme) => ({
	centerRow: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: theme.spacing[4],
	},
	resultContainer: {
		marginTop: theme.spacing[3],
		padding: theme.spacing[4],
		backgroundColor: theme.colors.success.content_1,
		borderRadius: theme.rounded.sm,
		alignItems: 'center',
	},
	resultText: {
		...theme.typography.body2,
		color: theme.colors.success.text_4,
		fontWeight: '600',
	},
	hintText: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_3,
		textAlign: 'center',
		marginTop: theme.spacing[2],
	},

	// Variant list
	variantList: {
		gap: theme.spacing[6],
	},
	variantItem: {
		gap: theme.spacing[2],
		alignItems: 'center',
	},
	variantLabel: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_2,
		fontWeight: '600',
		textTransform: 'uppercase',
	},

	// Size list
	sizeList: {
		gap: theme.spacing[6],
	},
	sizeItem: {
		gap: theme.spacing[2],
		alignItems: 'center',
	},
	sizeLabel: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_2,
		fontWeight: '600',
	},

	// Color scheme list
	colorSchemeList: {
		gap: theme.spacing[5],
	},
	colorSchemeItem: {
		gap: theme.spacing[2],
		alignItems: 'center',
	},
	colorBadge: {
		width: 12,
		height: 12,
		borderRadius: 6,
	},
	colorSchemeLabel: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_2,
		fontWeight: '500',
	},

	// Radius list
	radiusList: {
		gap: theme.spacing[5],
	},
	radiusItem: {
		gap: theme.spacing[2],
		alignItems: 'center',
	},
	radiusLabel: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_2,
		fontWeight: '500',
	},

	// Shadow list
	shadowList: {
		gap: theme.spacing[5],
	},
	shadowItem: {
		gap: theme.spacing[2],
		alignItems: 'center',
	},
	shadowLabel: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_2,
		fontWeight: '500',
	},

	// State list
	stateList: {
		gap: theme.spacing[5],
	},
	stateItem: {
		gap: theme.spacing[2],
		alignItems: 'center',
	},
	stateLabel: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_2,
		fontWeight: '500',
	},

	// Custom render
	customRenderContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing[2],
	},
	slotGroup: {
		flexDirection: 'row',
		gap: theme.spacing[2],
	},
	separator: {
		paddingHorizontal: theme.spacing[2],
	},
	separatorText: {
		...theme.typography.h4,
		color: theme.colors.neutral.text_3,
	},

	// Combination list
	combinationList: {
		gap: theme.spacing[6],
	},
	combinationItem: {
		gap: theme.spacing[3],
		alignItems: 'center',
		paddingVertical: theme.spacing[3],
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: theme.colors.neutral.border_subtle,
	},
	combinationLabel: {
		...theme.typography.body3,
		color: theme.colors.neutral.text_1,
		fontWeight: '600',
	},
}));
