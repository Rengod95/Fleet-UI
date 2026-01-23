import { Button, Progress } from '@fleet-ui/components';
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
		{ stepIndex: 0, label: 'Start' },
		{ stepIndex: 1, label: 'Input Information' },
		{ stepIndex: 2, label: 'Confirm' },
		{ stepIndex: 3, label: 'Complete' },
	];

	return (
		<ScrollView style={[commonStyles.container]}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Progress"
					description="A step-based progress bar that displays the current step in a multi-step process. Supports flat and lined track variants with smooth animations."
				/>

				{/* Overview */}
				<Section
					title="Overview"
					value="overview"
					description="The most basic Progress example."
				>
					<View style={styles.progressContainer}>
						<Progress
							step={5}
							activeStep={2}
							thumbVariant="number"
							trackVariant="lined"
							colorScheme="neutral"
						/>
					</View>
					<View style={styles.progressContainer}>
						<Progress
							step={5}
							activeStep={2}
							thumbVariant="none"
							trackVariant="lined"
							colorScheme="neutral"
							thumbGap='none'
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
									<Text style={commonStyles.label}>{variant}</Text>
									<Progress
										step={5}
										activeStep={2}
										trackVariant={variant}
										thumbVariant="none"
									/>
								</View>
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

				{/* Sizes */}
				<Section title="Sizes">
					<View style={commonStyles.column}>
						{SIZES.map((size) => (
							<View key={size} style={commonStyles.column}>
								<Text style={commonStyles.label}>FLAT - {size}</Text>
								<View style={styles.progressContainer}>
									<Progress step={5} activeStep={2} size={size} />
								</View>
							</View>
						))}
						{SIZES.map((size) => (
							<View key={size} style={commonStyles.column}>
								<Text style={commonStyles.label}>LINED - {size}</Text>
								<View style={styles.progressContainer}>
									<Progress step={5} activeStep={2} size={size} trackVariant='lined' />
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

				{/* Rounded Options */}
				<Section title="Rounded">
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
				<Section title="Step Counts" description='Progress step count is based on 1-based index. if you want to set 4 steps, you should set step=4.'>
					<View style={commonStyles.column}>
						{[3, 5,].map((stepCount) => (
							<View key={stepCount} style={commonStyles.column}>
								<Text style={commonStyles.label}>Thumb Variant - None, {stepCount} steps total, activeStep=3</Text>
								<View style={styles.progressContainer}>
									<Progress
										step={stepCount}
										activeStep={3}
									/>
								</View>
							</View>
						))}
						{[3, 5,].map((stepCount) => (
							<View key={stepCount} style={commonStyles.column}>
								<Text style={commonStyles.label}>Thumb Variant - Circle, {stepCount} steps total, activeStep=3</Text>
								<View style={styles.progressContainer}>
									<Progress
										step={stepCount}
										trackVariant="lined"
										thumbVariant="circle"
										activeStep={3} 
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
							<Text style={commonStyles.label}>
								Active Step: {controlledStep} / 5
							</Text>
							<Progress
								step={5}
								activeStep={controlledStep}
								onStepChange={setControlledStep}
							/>
						</View>
						<View style={styles.buttonRow}>
							<Button
								variant="flat"
								size="sm"
								onPress={() =>
									setControlledStep((prev) => Math.max(0, prev - 1))
								}
							>
								Previous
							</Button>
							<Button
								variant="flat"
								size="sm"
								onPress={() =>
									setControlledStep((prev) => Math.min(5, prev + 1))
								}
							>
								Next
							</Button>
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

				
				<View style={{ height: 100 }} />
			</View>
		</ScrollView>
	);
}
