import { Slider } from '@fleet-ui/components';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

const TRACK_VARIANTS = ['flat', 'lined'] as const;
const THUMB_VARIANTS = ['circle', 'oval', 'line'] as const;
const SIZES = ['sm', 'md', 'lg', 'xl'] as const;
const COLOR_SCHEMES = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
] as const;
const THUMB_SHADOWS = ['md', 'lg'] as const;
const TRACK_SHADOWS = ['none', 'base'] as const;
const ROUNDED_OPTIONS = ['none', 'xs', 'sm', 'md'] as const;

const styles = StyleSheet.create((theme) => ({
	sliderContainer: {
		width: '100%',
		paddingHorizontal: theme.spacing[4],
	},
	stateText: {
		...theme.typography.body2,
		color: theme.colors.neutral.text_2,
	},
	valueDisplay: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_3,
		marginTop: theme.spacing[2],
	},
	rangeRow: {
		flexDirection: 'row',
		gap: theme.spacing[2],
	},
}));

export default function SliderScreen() {
	useUnistyles();

	// Uncontrolled Slider value observation
	const [observedValue, setObservedValue] = useState([50]);
	const [observedRangeValue, setObservedRangeValue] = useState([25, 75]);

	return (
		<ScrollView style={[commonStyles.container]}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Slider"
					description="An input where the user selects a value from within a given range. Supports single and dual thumb (range) modes."
				/>

				{/* Overview */}
				<Section title="Overview">
					<View
						style={[
							styles.sliderContainer,
							{
								width: '100%',
								height: 400,
								alignItems: 'center',
								justifyContent: 'center',
							},
						]}
					>
						<Slider defaultValue={[50]} />
					</View>
				</Section>

				{/* Track Variants */}
				<Section title="Track Variants">
					<View style={commonStyles.column}>
						{TRACK_VARIANTS.map((variant) => (
							<View key={variant} style={commonStyles.column}>
								<Text style={commonStyles.label}>{variant}</Text>
								<View style={styles.sliderContainer}>
									<Slider trackVariant={variant} defaultValue={[50]} />
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
								<View style={styles.sliderContainer}>
									<Slider thumbVariant={variant} defaultValue={[50]} />
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
								<View style={styles.sliderContainer}>
									<Slider size={size} defaultValue={[50]} thumbVariant='line' trackVariant='lined' />
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
								<View style={styles.sliderContainer}>
									<Slider colorScheme={scheme} defaultValue={[60]} />
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
								<View key={scheme} style={styles.sliderContainer}>
									<Slider
										trackVariant={trackVariant}
										colorScheme={scheme}
										defaultValue={[50]}
									/>
								</View>
							))}
						</View>
					))}
				</Section>

				{/* Thumb Shadows */}
				<Section title="Thumb Shadows">
					<View style={commonStyles.column}>
						{THUMB_SHADOWS.map((shadow) => (
							<View key={shadow} style={commonStyles.column}>
								<Text style={commonStyles.label}>{shadow}</Text>
								<View style={styles.sliderContainer}>
									<Slider thumbShadow={shadow} defaultValue={[50]} />
								</View>
							</View>
						))}
					</View>
				</Section>

				{/* Track Shadows */}
				<Section title="Track Shadows">
					<View style={commonStyles.column}>
						{TRACK_SHADOWS.map((shadow) => (
							<View key={shadow} style={commonStyles.column}>
								<Text style={commonStyles.label}>{shadow}</Text>
								<View style={styles.sliderContainer}>
									<Slider trackShadow={shadow} defaultValue={[50]} />
								</View>
							</View>
						))}
					</View>
				</Section>

				{/* Rounded Options */}
				<Section title="Rounded Options">
					<View style={commonStyles.column}>
						{ROUNDED_OPTIONS.map((rounded) => (
							<View key={rounded} style={commonStyles.column}>
								<Text style={commonStyles.label}>{rounded}</Text>
								<View style={styles.sliderContainer}>
									<Slider rounded={rounded} defaultValue={[50]} />
								</View>
							</View>
						))}
					</View>
				</Section>

				{/* Dual Thumb (Range) */}
				<Section title="Dual Thumb (Range Slider)">
					<View style={commonStyles.column}>
						<View style={styles.sliderContainer}>
							<Slider
								thumbCount={2}
								defaultValue={[25, 75]}
								onValueChange={(val) => console.log('Range:', val)}
							/>
						</View>
						<Text style={styles.valueDisplay}>
							Drag both thumbs to select a range
						</Text>
					</View>
				</Section>

				{/* Thumb Count Variants */}
				<Section title="Thumb Count">
					<View style={commonStyles.column}>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>0 (Progress Bar Mode)</Text>
							<View style={styles.sliderContainer}>
								<Slider thumbCount={0} defaultValue={[65]} />
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>1 (Single Thumb)</Text>
							<View style={styles.sliderContainer}>
								<Slider thumbCount={1} defaultValue={[50]} />
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>2 (Dual Thumb / Range)</Text>
							<View style={styles.sliderContainer}>
								<Slider thumbCount={2} defaultValue={[30, 70]} />
							</View>
						</View>
					</View>
				</Section>

				{/* Disabled State */}
				<Section title="Disabled State">
					<View style={commonStyles.column}>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Disabled Single</Text>
							<View style={styles.sliderContainer}>
								<Slider disabled defaultValue={[50]} />
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Disabled Range</Text>
							<View style={styles.sliderContainer}>
								<Slider disabled thumbCount={2} defaultValue={[25, 75]} />
							</View>
						</View>
					</View>
				</Section>

				{/* Value Observation (Uncontrolled) */}
				<Section title="Value Observation">
					<View style={commonStyles.column}>
						<View style={styles.sliderContainer}>
							<Slider
								defaultValue={[50]}
								onValueChange={setObservedValue}
							/>
						</View>
						<Text style={styles.stateText}>Value: {observedValue[0]}</Text>
					</View>
				</Section>

				{/* Range Value Observation (Uncontrolled) */}
				<Section title="Range Value Observation">
					<View style={commonStyles.column}>
						<View style={styles.sliderContainer}>
							<Slider
								thumbCount={2}
								defaultValue={[25, 75]}
								onValueChange={setObservedRangeValue}
							/>
						</View>
						<View style={styles.rangeRow}>
							<Text style={styles.stateText}>Min: {observedRangeValue[0]}</Text>
							<Text style={styles.stateText}>Max: {observedRangeValue[1]}</Text>
						</View>
					</View>
				</Section>

				{/* Step Configuration */}
				<Section title="Step Configuration">
					<View style={commonStyles.column}>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Step: 1 (default)</Text>
							<View style={styles.sliderContainer}>
								<Slider step={1} defaultValue={[50]} />
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Step: 10</Text>
							<View style={styles.sliderContainer}>
								<Slider step={10} defaultValue={[50]} />
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Step: 25</Text>
							<View style={styles.sliderContainer}>
								<Slider step={25} defaultValue={[50]} />
							</View>
						</View>
					</View>
				</Section>

				{/* Min Steps Between Thumbs */}
				<Section title="Min Steps Between Thumbs">
					<View style={commonStyles.column}>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>
								minStepsBetweenThumbs: 0 (default)
							</Text>
							<View style={styles.sliderContainer}>
								<Slider
									thumbCount={2}
									minStepsBetweenThumbs={0}
									defaultValue={[40, 60]}
								/>
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>minStepsBetweenThumbs: 10</Text>
							<View style={styles.sliderContainer}>
								<Slider
									thumbCount={2}
									step={5}
									minStepsBetweenThumbs={10}
									defaultValue={[30, 70]}
								/>
							</View>
						</View>
					</View>
				</Section>

				{/* Custom Min/Max */}
				<Section title="Custom Min/Max Range">
					<View style={commonStyles.column}>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Range: 0-100 (default)</Text>
							<View style={styles.sliderContainer}>
								<Slider defaultValue={[50]} />
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Range: -50 to 50</Text>
							<View style={styles.sliderContainer}>
								<Slider min={-50} max={50} defaultValue={[0]} />
							</View>
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Range: 0-1000</Text>
							<View style={styles.sliderContainer}>
								<Slider min={0} max={1000} step={50} defaultValue={[500]} />
							</View>
						</View>
					</View>
				</Section>

				{/* Thumb Variants × Track Variants */}
				<Section title="Thumb Variants × Track Variants">
					{THUMB_VARIANTS.map((thumbVariant) => (
						<View key={thumbVariant} style={commonStyles.column}>
							<Text style={commonStyles.label}>{thumbVariant}</Text>
							<View style={commonStyles.column}>
								{TRACK_VARIANTS.map((trackVariant) => (
									<View key={trackVariant} style={styles.sliderContainer}>
										<Slider
											thumbVariant={thumbVariant}
											trackVariant={trackVariant}
											defaultValue={[50]}
										/>
									</View>
								))}
							</View>
						</View>
					))}
				</Section>

				{/* Sizes × Thumb Variants */}
				<Section title="Sizes × Thumb Variants">
					{SIZES.map((size) => (
						<View key={size} style={commonStyles.column}>
							<Text style={commonStyles.label}>{size}</Text>
							<View style={commonStyles.column}>
								{THUMB_VARIANTS.map((thumbVariant) => (
									<View key={thumbVariant} style={styles.sliderContainer}>
										<Slider
											size={size}
											thumbVariant={thumbVariant}
											defaultValue={[50]}
										/>
									</View>
								))}
							</View>
						</View>
					))}
				</Section>
			</View>
		</ScrollView>
	);
}
