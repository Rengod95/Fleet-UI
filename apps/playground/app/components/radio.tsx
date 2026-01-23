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

				<Section
					title="Overview"
					value="overview"
					description="Most basic Radio example (controlled group)."
				>
					<View style={commonStyles.row}>
						<View style={commonStyles.column}>
							<Radio
								variant="flat"
								selected={groupSelected === 'option1'}
								onSelect={() => setGroupSelected('option1')}
								label="option1"
							/>
							<Radio
								variant="flat"
								selected={groupSelected === 'option2'}
								onSelect={() => setGroupSelected('option2')}
								label="option2"
							/>
						</View>
					</View>
				</Section>

				{/* Variants */}
				<Section title="Variants">
					<View style={[commonStyles.fullWidthContainer, {alignItems:'center'}]}>
						{VARIANTS.map((variant) => (
							<View key={variant} style={[commonStyles.column, {width:'100%', alignItems:'flex-start'}]}>
								<Radio variant={variant} selected={false} onSelect={() => {}} label={`${variant} unselected`} />
							</View>
						))}
						{VARIANTS.map((variant) => (
							<View key={`${variant}-selected`} style={[commonStyles.column, {width:'100%', alignItems:'flex-start'}]}>
								<Radio variant={variant} selected={true} onSelect={() => {}} label={`${variant} selected`} />
							</View>
						))}
					</View>
				</Section>

				{/* Color Schemes × Variants */}
				<Section title="Color Schemes">
					{VARIANTS.map((variant) => (
						<View key={variant} style={commonStyles.column}>
							<View style={[commonStyles.fullWidthContainer, {alignItems:'center'}]}>
								<Text style={commonStyles.label}>{variant}</Text>
								{COLOR_SCHEMES.map((colorScheme) => (
									<View key={colorScheme} style={[commonStyles.column, {width:'100%', alignItems:'flex-start'}]}>
										<Radio
											variant={variant}
											colorScheme={colorScheme}
											selected={true}
											onSelect={() => {}}
											label={colorScheme}
										/>
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
							<View key={size} style={[commonStyles.column, {width:'100%'}]}>
								<Radio size={size} selected={true} onSelect={() => {}} label={size} />
							</View>
						))}
					</View>
				</Section>

				{/* Shadow */}
				<Section title="Shadow">
					<View style={[commonStyles.row, {gap:20, paddingVertical:24, gap:24}]}>
						{SHADOW_OPTIONS.map((shadow) => (
							<View key={shadow} style={[commonStyles.column, {width:'100%'}]}>
								<Radio shadow={shadow} selected={true} onSelect={() => {}} label={shadow} />
							</View>
						))}
					</View>
				</Section>

				{/* States */}
				<Section title="States">
					<View style={commonStyles.row}>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Unselected</Text>
							<Radio selected={false} onSelect={() => {}} />
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Selected</Text>
							<Radio selected={true} onSelect={() => {}} />
						</View>
					</View>
					<View style={commonStyles.row}>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Disabled unselected</Text>
							<Radio selected={false} disabled={true} onSelect={() => {}} />
						</View>
						<View style={commonStyles.column}>
							<Text style={commonStyles.label}>Disabled selected</Text>
							<Radio selected={true} disabled={true} onSelect={() => {}} />
						</View>
					</View>
				</Section>

				{/* Interactive Demo - Radio Group (Controlled) */}
				<Section title="Controlled">
					<View style={commonStyles.column}>
						{['option1', 'option2', 'option3'].map((option) => (
							<View key={option} style={commonStyles.row}>
								<Radio
									selected={groupSelected === option}
									onSelect={() => setGroupSelected(option)}
									label={groupSelected === option ? 'Selected' : 'Unselected' + ' ' + option}
								/>
							</View>
						))}
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}
