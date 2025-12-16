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

				{/* Basic Usage */}
				<Section
					title="Basic Usage"
					description="Default 6-digit OTP input with bordered variant."
				>
					<View style={styles.centerRow}>
						<OTPInput
							maxLength={6}
							placeholder=""
							onComplete={handleComplete}
						/>
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
					<View style={styles.variantList}>
						{VARIANTS.map((variant) => (
							<View key={variant} style={styles.variantItem}>
								<Text style={styles.variantLabel}>{variant}</Text>
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
					<View style={styles.sizeList}>
						{SIZES.map((size) => (
							<View key={size} style={styles.sizeItem}>
								<Text style={styles.sizeLabel}>{size.toUpperCase()}</Text>
								<OTPInput maxLength={4} size={size} />
							</View>
						))}
					</View>
				</Section>

				{/* Color Schemes */}
				<Section
					title="Color Schemes"
					description="Border color changes on focus. Tap to focus and see the colorScheme effect."
				>
					<View style={styles.colorSchemeList}>
						{COLOR_SCHEMES.map((colorScheme) => (
							<View key={colorScheme} style={styles.colorSchemeItem}>
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
								<Text style={styles.colorSchemeLabel}>{colorScheme}</Text>
								<OTPInput
									maxLength={4}
									colorScheme={colorScheme}
									variant="bordered"
								/>
							</View>
						))}
					</View>
				</Section>

				{/* Radius */}
				<Section title="Radius" description="Corner radius options for slots.">
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
					<View style={styles.shadowList}>
						{SHADOW_OPTIONS.map((shadow) => (
							<View key={shadow} style={styles.shadowItem}>
								<Text style={styles.shadowLabel}>{shadow}</Text>
								<OTPInput
									maxLength={4}
									shadow={shadow}
									variant="faded"
									rounded="md"
								/>
							</View>
						))}
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

				{/* Bounce Animation Demo */}
				<Section
					title="Bounce Animation"
					description="Each slot bounces when a character is entered. Type to see the animation!"
				>
					<View style={styles.centerRow}>
						<OTPInput
							maxLength={6}
							colorScheme="primary"
							variant="bordered"
							size="lg"
							rounded="lg"
						/>
					</View>
					<Text style={styles.hintText}>
						💡 문자 입력 시 슬롯이 "통" 하고 튀는 애니메이션이 발생합니다
					</Text>
				</Section>

				{/* Underlined Variant Focus Effect */}
				<Section
					title="Underlined Focus Effect"
					description="Underlined variant shows an animated line on focus."
				>
					<View style={styles.centerRow}>
						<OTPInput
							maxLength={6}
							variant="underlined"
							colorScheme="primary"
							size="lg"
						/>
					</View>
				</Section>

				{/* Custom Render */}
				<Section
					title="Custom Render"
					description="Use the render prop for custom slot layouts. Example: 3-3 grouping."
				>
					<View style={styles.centerRow}>
						<OTPInput
							maxLength={6}
							colorScheme="success"
							render={({ slots, isFocused }: OTPRenderProps) => (
								<View style={styles.customRenderContainer}>
									{/* First 3 slots */}
									<View style={styles.slotGroup}>
										{slots.slice(0, 3).map((slot) => (
											<OTPSlot
												key={slot.index}
												slot={slot}
												colorScheme="success"
												variant="bordered"
												size="lg"
												rounded="md"
											/>
										))}
									</View>

									{/* Separator */}
									<View style={styles.separator}>
										<Text style={styles.separatorText}>-</Text>
									</View>

									{/* Last 3 slots */}
									<View style={styles.slotGroup}>
										{slots.slice(3, 6).map((slot) => (
											<OTPSlot
												key={slot.index}
												slot={slot}
												colorScheme="success"
												variant="bordered"
												size="lg"
												rounded="md"
											/>
										))}
									</View>
								</View>
							)}
						/>
					</View>
				</Section>

				{/* Combination Examples */}
				<Section
					title="Combination Examples"
					description="Various combinations of props for different use cases."
				>
					<View style={styles.combinationList}>
						{/* Modern minimal */}
						<View style={styles.combinationItem}>
							<Text style={styles.combinationLabel}>Modern Minimal</Text>
							<OTPInput
								maxLength={4}
								variant="flat"
								colorScheme="primary"
								rounded="lg"
								size="lg"
							/>
						</View>

						{/* Classic bordered */}
						<View style={styles.combinationItem}>
							<Text style={styles.combinationLabel}>Classic Bordered</Text>
							<OTPInput
								maxLength={6}
								variant="bordered"
								colorScheme="neutral"
								rounded="sm"
								size="md"
							/>
						</View>

						{/* Underlined elegant */}
						<View style={styles.combinationItem}>
							<Text style={styles.combinationLabel}>Underlined Elegant</Text>
							<OTPInput
								maxLength={4}
								variant="underlined"
								colorScheme="info"
								size="xl"
							/>
						</View>

						{/* Faded with shadow */}
						<View style={styles.combinationItem}>
							<Text style={styles.combinationLabel}>Faded + Shadow</Text>
							<OTPInput
								maxLength={5}
								variant="faded"
								colorScheme="warning"
								rounded="md"
								shadow="md"
								size="md"
							/>
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
		padding: theme.spacing[3],
		backgroundColor: theme.colors.success.content_2,
		borderRadius: theme.rounded.md,
		alignItems: 'center',
	},
	resultText: {
		...theme.typography.body2,
		color: theme.colors.success.solid,
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
