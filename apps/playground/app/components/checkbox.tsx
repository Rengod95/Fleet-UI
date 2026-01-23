import { ActionButton, Checkbox, Divider } from '@fleet-ui/components';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

// Props 상수화
const VARIANTS = ['filled', 'flat', 'outlined'] as const;
const COLOR_SCHEMES = [
	'primary',
	'neutral',
	'error',
	'warning',
	'success',
	'info',
] as const;
const SIZES = ['sm', 'md', 'lg'] as const;
const ROUNDED_OPTIONS = ['none', 'sm', 'md', 'lg', 'full'] as const;
const SHADOW_OPTIONS = ['none', 'sm', 'md', 'lg'] as const;

export default function CheckboxScreen() {
	useUnistyles();
	const [interactiveChecked, setInteractiveChecked] = useState(false);
	const [multipleChecked, setMultipleChecked] = useState<{
		[key: string]: boolean;
	}>({
		option1: false,
		option2: true,
		option3: false,
	});

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Checkbox"
					description="Controlled checkbox component with multiple variants, sizes, and animations powered by Reanimated."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Most basic Checkbox example (controlled, flat variant)."
				>
					<View style={commonStyles.column}>
						<View style={commonStyles.row}>
							<Checkbox
								variant="flat"
								checked={interactiveChecked}
								onCheckedChange={setInteractiveChecked}
								label={`Checked: ${interactiveChecked ? 'true' : 'false'}`}
							/>
						</View>
					</View>
				</Section>

				{/* Variants */}
				<Section title="Variants">
					<Text style={[commonStyles.label,{alignSelf:'flex-start'}]}>Unchecked</Text>
					<View style={[commonStyles.row, { marginBottom: 24 }]}>
						{VARIANTS.map((variant) => (
							<View
								key={variant}
								style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
							>
								<Checkbox
									variant={variant}
									checked={false}
									onCheckedChange={() => {}}
									label={variant}
								/>
							</View>
						))}
					</View>
					<Text style={[commonStyles.label,{alignSelf:'flex-start'}]}>Checked</Text>
					<View style={commonStyles.row}>
						{VARIANTS.map((variant) => (
							<View key={`${variant}-checked`} style={commonStyles.row}>
								<Checkbox
									variant={variant}
									checked={true}
									onCheckedChange={() => {}}
									label={variant}
								/>
							</View>
						))}
					</View>
				</Section>

				{/* Color Schemes × Variants */}
				<Section title="Color Schemes">
					{VARIANTS.map((variant) => (
						<View key={variant} style={{ marginBottom: 24 }}>
							<Text style={[commonStyles.label, { marginBottom: 16 }]}>
								Variant: {variant}
							</Text>
							<View style={commonStyles.row}>
								{COLOR_SCHEMES.map((colorScheme) => (
									<View key={colorScheme} style={commonStyles.row}>
										<Checkbox
											variant={variant}
											colorScheme={colorScheme}
											checked={true}
											onCheckedChange={() => {}}
										/>
										<Text style={commonStyles.label}>{colorScheme}</Text>
									</View>
								))}
							</View>
						</View>
					))}
				</Section>

				{/* Sizes */}
				<Section title="Sizes">
					<View style={commonStyles.row}>
						{SIZES.map((size) => (
							<View key={size} style={commonStyles.row}>
								<Checkbox
									size={size}
									checked={true}
									onCheckedChange={() => {}}
								/>
								<Text style={commonStyles.label}>{size}</Text>
							</View>
						))}
					</View>
				</Section>

				{/* Rounded */}
				<Section title="Rounded">
					<View style={[commonStyles.column, { alignItems: 'center' }]}>
						{ROUNDED_OPTIONS.map((rounded) => (
							<View key={rounded} style={[commonStyles.row, { minWidth: 120, justifyContent: 'flex-start' }]}>
								<Checkbox
									rounded={rounded}
									checked={true}
									onCheckedChange={() => {}}
								/>
								<Text style={commonStyles.label}>{rounded}</Text>
							</View>
						))}
					</View>
				</Section>

				{/* Shadow */}
				<Section title="Shadow">
					<View style={[commonStyles.column, { alignItems: 'center' }]}>
						{SHADOW_OPTIONS.map((shadow) => (
							<View key={shadow} style={[commonStyles.row, { minWidth: 120, justifyContent: 'flex-start' }]}>
								<Checkbox
									shadow={shadow}
									checked={true}
									onCheckedChange={() => {}}
								/>
								<Text style={commonStyles.label}>{shadow}</Text>
							</View>
						))}
					</View>
				</Section>

				{/* States */}
				<Section title="Disabled State">
					<View style={[commonStyles.row, { alignItems: 'center' }]}>
						<View style={[commonStyles.row, { minWidth: 192 }]}>
							<View style={[commonStyles.column, { minWidth: 192, alignItems:'flex-start' }]}>
								<Checkbox
									checked={false}
									disabled={true}
									onCheckedChange={() => {}}
									label="Disabled unchecked"
								/>
								<Checkbox
									checked={false}
									onCheckedChange={() => {}}
									label="unchecked"
								/>
							</View>
						</View>
						<Divider/>
						<View style={[commonStyles.row, { minWidth: 192 }]}>
							<View style={[commonStyles.column, { minWidth: 192, alignItems:'flex-start' }]}>
								<Checkbox
									checked={true}
									disabled={true}
									onCheckedChange={() => {}}
									label="Disabled checked"
								/>
								<Checkbox
									checked={true}
									onCheckedChange={() => {}}
									label="checked"
								/>
							</View>
						</View>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}
