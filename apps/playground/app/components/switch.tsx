import { Switch } from '@fleet-ui/components';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

const VARIANTS = ['lined', 'filled', 'flat'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;
const THUMB_SHAPES = ['oval', 'circle'] as const;
const COLOR_SCHEMES = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
] as const;
const THUMB_SHADOWS = ['none', 'sm', 'md', 'lg'] as const;
const ROUNDED_OPTIONS = ['none', 'xs', 'sm', 'md'] as const;

const styles = StyleSheet.create((theme) => ({
	controlledRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing[4],
	},
	stateText: {
		...theme.typography.body2,
		color: theme.colors.neutral.text_2,
	},
}));

export default function SwitchScreen() {
	useUnistyles();
	const [controlledValue, setControlledValue] = useState(true);

	return (
		<ScrollView style={[commonStyles.container]}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Switch"
					description="Toggle your preferences with this versatile switch component."
				/>

				<Section title="Overview">
					<View
						style={[
							commonStyles.column,
							{
								aspectRatio: 1,
								justifyContent: 'center',
								alignItems: 'center',
							},
						]}
					>
						<Switch defaultChecked={false} size="lg" />
						<Text style={commonStyles.label}>방가워요</Text>
					</View>
				</Section>

				{/* Variants Section */}
				<Section title="Variants">
					<View
						style={[
							commonStyles.column,
							{ justifyContent: 'center', alignItems: 'center' },
						]}
					>
						<View style={commonStyles.row}>
							{VARIANTS.map((variant) => (
								<View key={variant} style={commonStyles.column}>
									<Switch variant={variant} defaultChecked={false} />
									<Text style={commonStyles.label}>{variant}</Text>
								</View>
							))}
						</View>
					</View>
				</Section>

				{/* Sizes Section */}
				<Section title="Sizes with variants">
					<View style={commonStyles.column}>
						<View style={commonStyles.row}>
							{SIZES.map((size) => (
								<View key={size} style={commonStyles.column}>
									<Switch size={size} defaultChecked={false} />
									<Text style={commonStyles.label}>{size}</Text>
								</View>
							))}
						</View>

						<View style={commonStyles.row}>
							{SIZES.map((size) => (
								<View key={size} style={commonStyles.column}>
									<Switch size={size} defaultChecked={false} variant="lined" />
									<Text style={commonStyles.label}>{size}</Text>
								</View>
							))}
						</View>
					</View>
				</Section>

				{/* Thumb Shapes Section */}
				<Section title="Thumb Shapes">
					<View style={commonStyles.row}>
						{THUMB_SHAPES.map((shape) => (
							<View key={shape} style={commonStyles.column}>
								<Switch thumbShape={shape} defaultChecked={false} />
								<Text style={commonStyles.label}>{shape}</Text>
							</View>
						))}
					</View>
				</Section>

				{/* Color Schemes Section */}
				<Section title="Color Schemes">
					<View style={commonStyles.row}>
						{COLOR_SCHEMES.map((scheme) => (
							<View key={scheme} style={commonStyles.column}>
								<Switch colorScheme={scheme} defaultChecked={true} />
								<Text style={commonStyles.label}>{scheme}</Text>
							</View>
						))}
					</View>
				</Section>

				{/* Thumb Shadows Section */}
				<Section title="Thumb Shadows">
					<View style={commonStyles.row}>
						{THUMB_SHADOWS.map((shadow) => (
							<View key={shadow} style={commonStyles.column}>
								<Switch thumbShadow={shadow} defaultChecked={false} />
								<Text style={commonStyles.label}>{shadow}</Text>
							</View>
						))}
					</View>
				</Section>

				{/* Rounded Options Section */}
				<Section title="Rounded Options">
					<View style={commonStyles.row}>
						{ROUNDED_OPTIONS.map((rounded) => (
							<View key={rounded} style={commonStyles.column}>
								<Switch rounded={rounded} defaultChecked={false} />
								<Text style={commonStyles.label}>{rounded}</Text>
							</View>
						))}
					</View>
				</Section>

				{/* Disabled State */}
				<Section title="Disabled State">
					<View style={commonStyles.row}>
						<View style={commonStyles.column}>
							<Switch defaultChecked={false} disabled />
							<Text style={commonStyles.label}>On (Disabled)</Text>
						</View>
						<View style={commonStyles.column}>
							<Switch defaultChecked={false} disabled />
							<Text style={commonStyles.label}>Off (Disabled)</Text>
						</View>
					</View>
				</Section>

				{/* Controlled Mode */}
				<Section title="Controlled Mode">
					<View style={styles.controlledRow}>
						<Switch
							checked={controlledValue}
							onValueChange={setControlledValue}
						/>
						<Text style={styles.stateText}>
							State: {controlledValue ? 'ON' : 'OFF'}
						</Text>
					</View>
				</Section>

				{/* All Variants with Color Schemes */}
				<Section title="Variants × Color Schemes">
					{VARIANTS.map((variant) => (
						<View key={variant}>
							<Text style={commonStyles.label}>{variant}</Text>
							<View style={commonStyles.row}>
								{COLOR_SCHEMES.map((scheme) => (
									<Switch
										key={scheme}
										variant={variant}
										colorScheme={scheme}
										defaultChecked
									/>
								))}
							</View>
						</View>
					))}
				</Section>

				{/* Different Sizes with Shapes */}
				<Section title="Sizes × Shapes">
					{SIZES.map((size) => (
						<View key={size}>
							<Text style={commonStyles.label}>{size}</Text>
							<View style={commonStyles.row}>
								{THUMB_SHAPES.map((shape) => (
									<Switch
										key={shape}
										size={size}
										thumbShape={shape}
										defaultChecked
									/>
								))}
							</View>
						</View>
					))}
				</Section>
			</View>
		</ScrollView>
	);
}
