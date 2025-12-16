import { ActionButton, Checkbox } from '@fleet-ui/components';
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

				{/* Variants */}
				<Section title="Variants">
					<Text style={commonStyles.label}>Unchecked</Text>
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
								/>
								<Text>{variant} unchecked</Text>
							</View>
						))}
					</View>
					<Text style={commonStyles.label}>Checked</Text>
					<View style={commonStyles.row}>
						{VARIANTS.map((variant) => (
							<View key={`${variant}-checked`} style={commonStyles.row}>
								<Checkbox
									variant={variant}
									checked={true}
									onCheckedChange={() => {}}
								/>
								<Text>{variant} checked</Text>
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
							<View key={rounded} style={[commonStyles.row, { minWidth: 96 }]}>
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
							<View key={shadow} style={[commonStyles.row, { minWidth: 96 }]}>
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
				<Section title="States">
					<View style={[commonStyles.column, { alignItems: 'center' }]}>
						<View style={[commonStyles.row, { minWidth: 192 }]}>
							<Checkbox checked={false} onCheckedChange={() => {}} />
							<Text style={commonStyles.label}>Unchecked</Text>
						</View>
						<View style={[commonStyles.row, { minWidth: 192 }]}>
							<Checkbox checked={true} onCheckedChange={() => {}} />
							<Text style={commonStyles.label}>Checked</Text>
						</View>
						<View style={[commonStyles.row, { minWidth: 192 }]}>
							<Checkbox
								checked={false}
								indeterminate={true}
								onCheckedChange={() => {}}
							/>
							<Text style={commonStyles.label}>Indeterminate</Text>
						</View>
					</View>
					<View style={[commonStyles.column, { alignItems: 'center' }]}>
						<View style={[commonStyles.row, { minWidth: 192 }]}>
							<Checkbox
								checked={false}
								disabled={true}
								onCheckedChange={() => {}}
							/>
							<Text style={commonStyles.label}>Disabled unchecked</Text>
						</View>
						<View style={[commonStyles.row, { minWidth: 192 }]}>
							<Checkbox
								checked={true}
								disabled={true}
								onCheckedChange={() => {}}
							/>
							<Text style={commonStyles.label}>Disabled checked</Text>
						</View>
						<View style={[commonStyles.row, { minWidth: 192 }]}>
							<Checkbox
								checked={false}
								indeterminate={true}
								disabled={true}
								onCheckedChange={() => {}}
							/>
							<Text style={commonStyles.label}>Disabled indeterminate</Text>
						</View>
					</View>
				</Section>

				{/* Interactive Demo - Single Checkbox */}
				<Section title="Interactive Demo - Single">
					<View style={commonStyles.row}>
						<Checkbox
						// checked={interactiveChecked}
						// onCheckedChange={setInteractiveChecked}
						/>
						<Text>{interactiveChecked ? 'Checked' : 'Unchecked'}</Text>
					</View>
				</Section>

				{/* All Variants × All Color Schemes (Checked) */}
				<Section title="Complete Matrix (Checked)">
					{VARIANTS.map((variant) => (
						<View key={variant}>
							<Text style={commonStyles.label}>
								{variant.charAt(0).toUpperCase() + variant.slice(1)}
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
										<Text>{colorScheme}</Text>
									</View>
								))}
							</View>
						</View>
					))}
				</Section>

				{/* All Variants × All Sizes */}
				<Section title="Variants × Sizes">
					{VARIANTS.map((variant) => (
						<View key={variant}>
							<Text style={commonStyles.label}>
								{variant.charAt(0).toUpperCase() + variant.slice(1)}
							</Text>
							<View style={commonStyles.row}>
								{SIZES.map((size) => (
									<View key={size} style={commonStyles.column}>
										<Checkbox
											variant={variant}
											size={size}
											checked={true}
											onCheckedChange={() => {}}
										/>
										<Text style={commonStyles.label}>{size}</Text>
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
