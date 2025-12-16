import { StepIndicator } from '@fleet-ui/components';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

const SIZES = ['sm', 'md', 'lg'] as const;
const COLOR_SCHEMES = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
] as const;

const styles = StyleSheet.create((theme) => ({
	indicatorContainer: {
		width: '100%',
		paddingHorizontal: theme.spacing[4],
		paddingVertical: theme.spacing[4],
		alignItems: 'center',
	},
	stateText: {
		...theme.typography.body2,
		color: theme.colors.neutral.text_2,
		textAlign: 'center',
		marginTop: theme.spacing[2],
	},
	buttonRow: {
		flexDirection: 'row',
		gap: theme.spacing[2],
		marginTop: theme.spacing[3],
		justifyContent: 'center',
	},
	stepButton: {
		paddingHorizontal: theme.spacing[3],
		paddingVertical: theme.spacing[2],
		backgroundColor: theme.colors.primary.solid,
		borderRadius: theme.rounded.sm,
	},
	stepButtonText: {
		...theme.typography.button,
		color: theme.colors.primary.text_inversed,
	},
	labelContainer: {
		marginTop: theme.spacing[6],
	},
	demoBox: {
		backgroundColor: theme.colors.neutral.content_1,
		borderRadius: theme.rounded.md,
		padding: theme.spacing[4],
		marginVertical: theme.spacing[2],
	},
}));

export default function StepIndicatorScreen() {
	useUnistyles();

	// Controlled mode state
	const [controlledStep, setControlledStep] = useState(2);
	const [interactiveStep, setInteractiveStep] = useState(0);

	// Sample labels
	const sampleLabels = [
		{ stepIndex: 0, label: '시작' },
		{ stepIndex: 1, label: '정보' },
		{ stepIndex: 2, label: '확인' },
		{ stepIndex: 3, label: '완료' },
	];

	return (
		<ScrollView style={[commonStyles.container]}>
			<View style={commonStyles.content}>
				<PageHeader
					title="StepIndicator"
					description="A dot-based step indicator that displays the current step with animated expansion. Active dots expand to 2.5x width and 1.5x height."
				/>

				{/* Overview */}
				<Section title="Overview">
					<View style={styles.indicatorContainer}>
						<StepIndicator step={5} activeStep={2} />
					</View>
				</Section>

				{/* Sizes */}
				<Section title="Sizes">
					<View style={commonStyles.column}>
						{SIZES.map((size) => (
							<View key={size} style={commonStyles.column}>
								<Text style={commonStyles.label}>{size}</Text>
								<View style={styles.indicatorContainer}>
									<StepIndicator step={5} activeStep={2} size={size} />
								</View>
							</View>
						))}
					</View>
				</Section>

				{/* Color Schemes */}
				<Section title="Color Schemes">
					<View style={commonStyles.column}>
						{COLOR_SCHEMES.map((scheme) => (
							<View key={scheme} style={commonStyles.column}>
								<Text style={commonStyles.label}>{scheme}</Text>
								<View style={styles.indicatorContainer}>
									<StepIndicator step={5} activeStep={2} colorScheme={scheme} />
								</View>
							</View>
						))}
					</View>
				</Section>

				{/* Different Step Counts */}
				<Section title="Step Counts">
					<View style={commonStyles.column}>
						{[3, 5, 7, 10].map((stepCount) => (
							<View key={stepCount} style={commonStyles.column}>
								<Text style={commonStyles.label}>{stepCount} steps</Text>
								<View style={styles.indicatorContainer}>
									<StepIndicator
										step={stepCount}
										activeStep={Math.floor(stepCount / 2)}
									/>
								</View>
							</View>
						))}
					</View>
				</Section>

				{/* Controlled Mode */}
				<Section title="Controlled Mode">
					<View style={commonStyles.column}>
						<View style={styles.indicatorContainer}>
							<StepIndicator
								step={5}
								activeStep={controlledStep}
								onStepChange={setControlledStep}
							/>
						</View>
						<Text style={styles.stateText}>
							Active Step: {controlledStep + 1} / 5
						</Text>
						<View style={styles.buttonRow}>
							<View
								style={styles.stepButton}
								onTouchEnd={() =>
									setControlledStep((prev) => Math.max(0, prev - 1))
								}
							>
								<Text style={styles.stepButtonText}>Previous</Text>
							</View>
							<View
								style={styles.stepButton}
								onTouchEnd={() =>
									setControlledStep((prev) => Math.min(4, prev + 1))
								}
							>
								<Text style={styles.stepButtonText}>Next</Text>
							</View>
						</View>
					</View>
				</Section>

				{/* Interactive Mode */}
				<Section title="Interactive Mode">
					<View style={commonStyles.column}>
						<View style={styles.indicatorContainer}>
							<StepIndicator
								step={5}
								activeStep={interactiveStep}
								onStepChange={setInteractiveStep}
								interactive
								onStepPress={(step) => console.log('Step pressed:', step)}
							/>
						</View>
						<Text style={styles.stateText}>
							Tap a dot to navigate. Current: {interactiveStep + 1}
						</Text>
					</View>
				</Section>

				{/* With Labels */}
				<Section title="With Labels">
					<View style={[commonStyles.column, styles.labelContainer]}>
						<View style={styles.indicatorContainer}>
							<StepIndicator
								step={4}
								activeStep={1}
								labels={sampleLabels}
								showLabels
							/>
						</View>
					</View>
				</Section>

				{/* Custom Gap */}
				<Section title="Custom Gap">
					<View style={commonStyles.column}>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Gap: 4px</Text>
							<View style={styles.indicatorContainer}>
								<StepIndicator step={5} activeStep={2} gap={4} />
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Gap: 12px</Text>
							<View style={styles.indicatorContainer}>
								<StepIndicator step={5} activeStep={2} gap={12} />
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Gap: 20px</Text>
							<View style={styles.indicatorContainer}>
								<StepIndicator step={5} activeStep={2} gap={20} />
							</View>
						</View>
					</View>
				</Section>

				{/* Animation Toggle */}
				<Section title="Animation Toggle">
					<View style={commonStyles.column}>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Animated (default)</Text>
							<View style={styles.indicatorContainer}>
								<StepIndicator step={5} activeStep={controlledStep} animated />
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>No Animation</Text>
							<View style={styles.indicatorContainer}>
								<StepIndicator
									step={5}
									activeStep={controlledStep}
									animated={false}
								/>
							</View>
						</View>
					</View>
				</Section>

				{/* Sizes × Color Schemes */}
				<Section title="Sizes × Color Schemes">
					{SIZES.map((size) => (
						<View key={size} style={commonStyles.column}>
							<Text style={commonStyles.label}>{size}</Text>
							<View style={commonStyles.column}>
								{COLOR_SCHEMES.slice(0, 3).map((scheme) => (
									<View key={scheme} style={styles.indicatorContainer}>
										<StepIndicator
											step={5}
											activeStep={2}
											size={size}
											colorScheme={scheme}
										/>
									</View>
								))}
							</View>
						</View>
					))}
				</Section>

				{/* Use Case Examples */}
				<Section title="Use Case Examples">
					<View style={commonStyles.column}>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Image Carousel Indicator</Text>
							<View style={[styles.indicatorContainer, styles.demoBox]}>
								<StepIndicator
									step={6}
									activeStep={2}
									size="sm"
									colorScheme="neutral"
									gap={6}
								/>
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Onboarding Steps</Text>
							<View style={[styles.indicatorContainer, styles.demoBox]}>
								<StepIndicator
									step={4}
									activeStep={1}
									size="md"
									colorScheme="primary"
									labels={sampleLabels}
									showLabels
								/>
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Tutorial Progress</Text>
							<View style={[styles.indicatorContainer, styles.demoBox]}>
								<StepIndicator
									step={3}
									activeStep={0}
									size="lg"
									colorScheme="success"
									interactive
								/>
							</View>
						</View>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}
