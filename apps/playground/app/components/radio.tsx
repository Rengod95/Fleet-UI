import { Radio } from '@fleet-ui/components';
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
const SHADOW_OPTIONS = ['none', 'sm', 'md', 'lg'] as const;

export default function RadioScreen() {
	useUnistyles();
	const [groupSelected, setGroupSelected] = useState<string>('option1');

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Radio"
					description="Controlled radio component with multiple variants, sizes, and animations powered by Reanimated."
				/>

				{/* Variants */}
				<Section title="Variants">
					<View style={commonStyles.row}>
						{VARIANTS.map((variant) => (
							<View key={variant} style={commonStyles.column}>
								<Radio variant={variant} selected={false} onSelect={() => {}} />
								<Text style={commonStyles.label}>{variant} unselected</Text>
							</View>
						))}
					</View>
					<View style={commonStyles.row}>
						{VARIANTS.map((variant) => (
							<View key={`${variant}-selected`} style={commonStyles.column}>
								<Radio variant={variant} selected={true} onSelect={() => {}} />
								<Text style={commonStyles.label}>{variant} selected</Text>
							</View>
						))}
					</View>
				</Section>

				{/* Color Schemes × Variants */}
				<Section title="Color Schemes">
					{VARIANTS.map((variant) => (
						<View key={variant}>
							<Text style={commonStyles.sectionSubtitle}>
								Variant: {variant}
							</Text>
							<View style={commonStyles.row}>
								{COLOR_SCHEMES.map((colorScheme) => (
									<View key={colorScheme} style={commonStyles.column}>
										<Radio
											variant={variant}
											colorScheme={colorScheme}
											selected={true}
											onSelect={() => {}}
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
							<View key={size} style={commonStyles.column}>
								<Radio size={size} selected={true} onSelect={() => {}} />
								<Text style={commonStyles.label}>{size}</Text>
							</View>
						))}
					</View>
				</Section>

				{/* Shadow */}
				<Section title="Shadow">
					<View style={commonStyles.row}>
						{SHADOW_OPTIONS.map((shadow) => (
							<View key={shadow} style={commonStyles.column}>
								<Radio shadow={shadow} selected={true} onSelect={() => {}} />
								<Text style={commonStyles.label}>{shadow}</Text>
							</View>
						))}
					</View>
				</Section>

				{/* States */}
				<Section title="States">
					<View style={commonStyles.row}>
						<View style={commonStyles.column}>
							<Radio selected={false} onSelect={() => {}} />
							<Text style={commonStyles.label}>Unselected</Text>
						</View>
						<View style={commonStyles.column}>
							<Radio selected={true} onSelect={() => {}} />
							<Text style={commonStyles.label}>Selected</Text>
						</View>
					</View>
					<View style={commonStyles.row}>
						<View style={commonStyles.column}>
							<Radio selected={false} disabled={true} onSelect={() => {}} />
							<Text style={commonStyles.label}>Disabled unselected</Text>
						</View>
						<View style={commonStyles.column}>
							<Radio selected={true} disabled={true} onSelect={() => {}} />
							<Text style={commonStyles.label}>Disabled selected</Text>
						</View>
					</View>
				</Section>

				{/* Interactive Demo - Single Radio (Uncontrolled) */}
				<Section title="Interactive Demo - Single (Uncontrolled)">
					<View style={commonStyles.row}>
						<Radio
							defaultSelected={false}
							onSelect={(selected) => console.log('Selected:', selected)}
						/>
						<Text style={commonStyles.label}>
							Click to select (uncontrolled)
						</Text>
					</View>
				</Section>

				{/* Interactive Demo - Radio Group (Controlled) */}
				<Section title="Interactive Demo - Group (Controlled)">
					<View style={commonStyles.column}>
						{['option1', 'option2', 'option3'].map((option) => (
							<View key={option} style={commonStyles.row}>
								<Radio
									selected={groupSelected === option}
									onSelect={() => setGroupSelected(option)}
								/>
								<Text style={commonStyles.label}>
									{option}:{' '}
									{groupSelected === option ? 'Selected' : 'Unselected'}
								</Text>
							</View>
						))}
					</View>
				</Section>

				{/* All Variants × All Color Schemes (Selected) */}
				<Section title="Complete Matrix (Selected)">
					{VARIANTS.map((variant) => (
						<View key={variant}>
							<Text style={commonStyles.sectionSubtitle}>
								{variant.charAt(0).toUpperCase() + variant.slice(1)}
							</Text>
							<View style={commonStyles.row}>
								{COLOR_SCHEMES.map((colorScheme) => (
									<View key={colorScheme} style={commonStyles.column}>
										<Radio
											variant={variant}
											colorScheme={colorScheme}
											selected={true}
											onSelect={() => {}}
										/>
										<Text style={commonStyles.label}>{colorScheme}</Text>
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
							<Text style={commonStyles.sectionSubtitle}>
								{variant.charAt(0).toUpperCase() + variant.slice(1)}
							</Text>
							<View style={commonStyles.row}>
								{SIZES.map((size) => (
									<View key={size} style={commonStyles.column}>
										<Radio
											variant={variant}
											size={size}
											selected={true}
											onSelect={() => {}}
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
