import { Progress } from '@fleet-ui/components';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

const TRACK_VARIANTS = ['flat', 'lined'] as const;
const THUMB_VARIANTS = ['circle', 'number', 'none'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;
const COLOR_SCHEMES = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
] as const;
const ROUNDED_OPTIONS = ['none', 'sm', 'md', 'lg'] as const;
const THUMB_GAPS = ['none', 'sm', 'md', 'lg'] as const;

const styles = StyleSheet.create((theme) => ({
	progressContainer: {
		width: '100%',
		paddingHorizontal: theme.spacing[4],
		paddingVertical: theme.spacing[2],
	},
	stateText: {
		...theme.typography.body2,
		color: theme.colors.neutral.text_2,
	},
	controlRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing[4],
		marginTop: theme.spacing[2],
	},
	buttonRow: {
		flexDirection: 'row',
		gap: theme.spacing[2],
		marginTop: theme.spacing[3],
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
}));

export default function ProgressScreen() {
	useUnistyles();

	// Controlled mode state
	const [controlledStep, setControlledStep] = useState(2);
	const [interactiveStep, setInteractiveStep] = useState(0);

	// Sample labels
	const sampleLabels = [
		{ stepIndex: 0, label: '시작' },
		{ stepIndex: 1, label: '정보 입력' },
		{ stepIndex: 2, label: '확인' },
		{ stepIndex: 3, label: '완료' },
	];

	return (
		<ScrollView style={[commonStyles.container]}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Progress"
					description="A step-based progress bar that displays the current step in a multi-step process. Supports flat and lined track variants with smooth animations."
				/>

				{/* Overview */}
				<Section title="Overview">
					<View style={styles.progressContainer}>
						<Progress
							step={5}
							activeStep={2}
							thumbVariant="number"
							trackVariant="lined"
							colorScheme="neutral"
						/>
					</View>
				</Section>

				{/* Track Variants */}
				<Section title="Track Variants">
					<View style={commonStyles.column}>
						{TRACK_VARIANTS.map((variant) => (
							<View
								key={variant}
								style={[[commonStyles.column, { width: '100%' }]]}
							>
								<View style={styles.progressContainer}>
									<Progress
										step={5}
										activeStep={2}
										trackVariant={variant}
										thumbVariant="number"
									/>
								</View>
								<Text style={commonStyles.label}>{variant}</Text>
							</View>
						))}
					</View>
				</Section>

				{/* Thumb Variants */}
				<Section title="Thumb Variants">
					<View style={commonStyles.column}>
						{THUMB_VARIANTS.map((variant) => (
							<View key={variant} style={commonStyles.column}>
								<Text style={commonStyles.label}>{variant}</Text>
								<View style={styles.progressContainer}>
									<Progress
										step={5}
										activeStep={2}
										thumbVariant={variant}
										trackVariant="lined"
									/>
								</View>
							</View>
						))}
					</View>
				</Section>

				{/* Thumb Gaps */}
				<Section title="Thumb Gaps">
					<View style={commonStyles.column}>
						{THUMB_GAPS.map((gap) => (
							<View key={gap} style={commonStyles.column}>
								<Text style={commonStyles.label}>{gap}</Text>
								<View style={styles.progressContainer}>
									<Progress
										step={5}
										activeStep={2}
										thumbGap={gap}
										trackVariant="lined"
									/>
								</View>
							</View>
						))}
					</View>
				</Section>

				{/* Thumb Variants with Flat Track */}
				<Section title="Thumb Variants (Flat Track)">
					<View style={commonStyles.column}>
						{THUMB_VARIANTS.map((variant) => (
							<View key={variant} style={commonStyles.column}>
								<Text style={commonStyles.label}>{variant}</Text>
								<View style={styles.progressContainer}>
									<Progress
										step={5}
										activeStep={2}
										thumbVariant={variant}
										trackVariant="flat"
									/>
								</View>
							</View>
						))}
					</View>
				</Section>

				{/* Sizes */}
				<Section title="Sizes">
					<View style={commonStyles.column}>
						{SIZES.map((size) => (
							<View key={size} style={commonStyles.column}>
								<Text style={commonStyles.label}>{size}</Text>
								<View style={styles.progressContainer}>
									<Progress step={5} activeStep={2} size={size} />
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
								<View style={styles.progressContainer}>
									<Progress step={5} activeStep={3} colorScheme={scheme} />
								</View>
							</View>
						))}
					</View>
				</Section>

				{/* Track Variants × Color Schemes */}
				<Section title="Track Variants × Color Schemes">
					{TRACK_VARIANTS.map((trackVariant) => (
						<View key={trackVariant} style={commonStyles.column}>
							<Text style={commonStyles.label}>{trackVariant}</Text>
							{COLOR_SCHEMES.slice(0, 3).map((scheme) => (
								<View key={scheme} style={styles.progressContainer}>
									<Progress
										step={5}
										activeStep={2}
										trackVariant={trackVariant}
										colorScheme={scheme}
									/>
								</View>
							))}
						</View>
					))}
				</Section>

				{/* Rounded Options */}
				<Section title="Rounded Options">
					<View style={commonStyles.column}>
						{ROUNDED_OPTIONS.map((rounded) => (
							<View key={rounded} style={commonStyles.column}>
								<Text style={commonStyles.label}>{rounded}</Text>
								<View style={styles.progressContainer}>
									<Progress
										step={5}
										activeStep={2}
										rounded={rounded}
										trackVariant="flat"
									/>
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
								<View style={styles.progressContainer}>
									<Progress
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
						<View style={styles.progressContainer}>
							<Progress
								step={5}
								activeStep={controlledStep}
								onStepChange={setControlledStep}
							/>
						</View>
						<Text style={styles.stateText}>
							Active Step: {controlledStep} / 5
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
									setControlledStep((prev) => Math.min(5, prev + 1))
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
						<View style={styles.progressContainer}>
							<Progress
								step={5}
								activeStep={interactiveStep}
								onStepChange={setInteractiveStep}
								interactive
								onStepPress={(step) => console.log('Step pressed:', step)}
							/>
						</View>
						<Text style={styles.stateText}>
							Tap a step to navigate. Current: {interactiveStep}
						</Text>
					</View>
				</Section>

				{/* With Labels */}
				<Section title="With Labels">
					<View style={[commonStyles.column, styles.labelContainer]}>
						<View style={styles.progressContainer}>
							<Progress
								step={4}
								activeStep={1}
								labels={sampleLabels}
								showLabels
								trackVariant="flat"
							/>
						</View>
					</View>
				</Section>

				{/* Animation Toggle */}
				<Section title="Animation Toggle">
					<View style={commonStyles.column}>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Animated (default)</Text>
							<View style={styles.progressContainer}>
								<Progress step={5} activeStep={controlledStep} animated />
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>No Animation</Text>
							<View style={styles.progressContainer}>
								<Progress
									step={5}
									activeStep={controlledStep}
									animated={false}
								/>
							</View>
						</View>
					</View>
				</Section>

				{/* Sizes × Track Variants */}
				<Section title="Sizes × Track Variants">
					{SIZES.map((size) => (
						<View key={size} style={commonStyles.column}>
							<Text style={commonStyles.label}>{size}</Text>
							<View style={commonStyles.column}>
								{TRACK_VARIANTS.map((trackVariant) => (
									<View key={trackVariant} style={styles.progressContainer}>
										<Progress
											step={5}
											activeStep={2}
											size={size}
											trackVariant={trackVariant}
										/>
									</View>
								))}
							</View>
						</View>
					))}
				</Section>

				{/* Complete Example */}
				<Section title="Complete Example">
					<View style={commonStyles.column}>
						<View style={[commonStyles.column, { marginTop: 16 }]}>
							<Text style={commonStyles.label}>Checkout Steps</Text>
							<View style={styles.progressContainer}>
								<Progress
									step={3}
									activeStep={1}
									trackVariant="flat"
									thumbVariant="number"
									colorScheme="success"
									size="lg"
									rounded="lg"
								/>
							</View>
						</View>
						<View style={[commonStyles.column, { marginTop: 16 }]}>
							<Text style={commonStyles.label}>Form Completion</Text>
							<View style={styles.progressContainer}>
								<Progress
									step={6}
									activeStep={4}
									trackVariant="lined"
									thumbVariant="circle"
									colorScheme="info"
									size="sm"
								/>
							</View>
						</View>
						<View style={[commonStyles.column, { marginTop: 16 }]}>
							<Text style={commonStyles.label}>Simple Progress</Text>
							<View style={styles.progressContainer}>
								<Progress
									step={5}
									activeStep={3}
									trackVariant="flat"
									thumbVariant="number"
									colorScheme="primary"
									size="md"
									rounded="md"
								/>
							</View>
						</View>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}
