import { CheckboxCard, CheckboxCardGroup, Icon } from '@fleet-ui/components';
import {
	Bell,
	Bookmark,
	Heart,
	Mail,
	MessageSquare,
	Settings,
	Shield,
	Star,
	Zap,
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

// Props 상수화
const VARIANTS = ['outlined', 'filled', 'flat', 'fade'] as const;
const COLOR_SCHEMES = [
	'primary',
	'neutral',
	'error',
	'warning',
	'success',
	'info',
] as const;
const SIZES = ['sm', 'md', 'lg'] as const;
const ROUNDED_OPTIONS = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
const INDICATOR_POSITIONS = ['start', 'end'] as const;
const INDICATOR_VARIANTS = ['filled', 'flat', 'outlined'] as const;

export default function CheckboxCardScreen() {
	useUnistyles();

	// 단독 사용 상태
	const [singleChecked, setSingleChecked] = useState(false);

	// 그룹 사용 상태
	const [groupValues, setGroupValues] = useState<string[]>(['notifications']);

	// 최대 선택 그룹 상태
	const [limitedValues, setLimitedValues] = useState<string[]>(['option1']);

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="CheckboxCard"
					description="Card-style checkbox using Item + Checkbox composition. Accepts title/description as string props."
				/>

				{/* Variants */}
				<Section title="Variants">
					<View style={{ gap: 12 }}>
						{VARIANTS.map((variant) => (
							<CheckboxCard
								key={variant}
								variant={variant}
								value={variant}
								defaultChecked={variant === 'outlined'}
								title={variant}
								description={`Card variant: ${variant}`}
							/>
						))}
					</View>
				</Section>

				{/* Color Schemes */}
				<Section title="Color Schemes (Checked)">
					<View style={{ gap: 12 }}>
						{COLOR_SCHEMES.map((colorScheme) => (
							<CheckboxCard
								key={colorScheme}
								colorScheme={colorScheme}
								defaultChecked={true}
								title={colorScheme}
								description={`ColorScheme: ${colorScheme}`}
							/>
						))}
					</View>
				</Section>

				{/* Sizes */}
				<Section title="Sizes">
					<View style={{ gap: 12 }}>
						{SIZES.map((size) => (
							<CheckboxCard
								key={size}
								size={size}
								defaultChecked={true}
								title={`Size: ${size}`}
								// description="Card and indicator size variant"
							/>
						))}
					</View>
				</Section>

				{/* Indicator Position */}
				<Section title="Indicator Position">
					<View style={{ gap: 12 }}>
						{INDICATOR_POSITIONS.map((position) => (
							<CheckboxCard
								key={position}
								indicatorPosition={position}
								defaultChecked={true}
								colorScheme="primary"
								title={`Position: ${position}`}
								description={`Checkbox on the ${position}`}
							/>
						))}
					</View>
				</Section>

				{/* Indicator Variants */}
				<Section title="Indicator Variants">
					<View style={{ gap: 12 }}>
						{INDICATOR_VARIANTS.map((indicatorVariant) => (
							<CheckboxCard
								key={indicatorVariant}
								indicatorVariant={indicatorVariant}
								defaultChecked={true}
								colorScheme="primary"
								title={`Indicator: ${indicatorVariant}`}
								description="Checkbox indicator style"
							/>
						))}
					</View>
				</Section>

				{/* With Media (Icon) */}
				<Section title="With Media">
					<View style={{ gap: 12 }}>
						<CheckboxCard
							defaultChecked={true}
							indicatorPosition="end"
							colorScheme="primary"
							title="Notifications"
							description="Receive push notifications"
							media={<Icon icon={Bell} size="md" />}
						/>

						<CheckboxCard
							defaultChecked={false}
							indicatorPosition="end"
							colorScheme="info"
							title="Email Updates"
							description="Weekly newsletter subscription"
							media={<Icon icon={Mail} size="md" />}
						/>

						<CheckboxCard
							defaultChecked={true}
							indicatorPosition="end"
							colorScheme="success"
							title="Security Alerts"
							description="Important account security updates"
							media={<Icon icon={Shield} size="md" />}
						/>
					</View>
				</Section>

				{/* Selected Color Scheme */}
				<Section title="Selected Color Scheme">
					<View style={{ gap: 12 }}>
						<CheckboxCard
							colorScheme="neutral"
							selectedColorScheme="success"
							defaultChecked={true}
							title="neutral → success (checked)"
							description="Changes colorScheme when selected"
						/>

						<CheckboxCard
							colorScheme="neutral"
							selectedColorScheme="success"
							defaultChecked={false}
							title="neutral → success (unchecked)"
							description="Uses neutral when not selected"
						/>
					</View>
				</Section>

				{/* Disabled State */}
				<Section title="Disabled State">
					<View style={{ gap: 12 }}>
						<CheckboxCard
							disabled={true}
							defaultChecked={false}
							title="Disabled (unchecked)"
							description="Cannot interact with this card"
						/>

						<CheckboxCard
							disabled={true}
							defaultChecked={true}
							title="Disabled (checked)"
							description="Checked but cannot be changed"
						/>
					</View>
				</Section>

				{/* Interactive Demo - Single */}
				<Section title="Interactive Demo - Single">
					<CheckboxCard
						checked={singleChecked}
						onCheckedChange={setSingleChecked}
						colorScheme="primary"
						indicatorPosition="start"
						title={singleChecked ? 'Checked ✓' : 'Unchecked'}
						description="Tap to toggle checkbox state"
						media={<Icon icon={Star} size="md" />}
					/>
				</Section>

				{/* Group Usage */}
				<Section title="CheckboxCardGroup">
					<Text style={commonStyles.label}>
						Selected: {groupValues.join(', ') || 'None'}
					</Text>
					<CheckboxCardGroup
						values={groupValues}
						onValuesChange={setGroupValues}
						gap="md"
					>
						<CheckboxCard
							value="notifications"
							indicatorPosition="start"
							title="Notifications"
							description="Receive push notifications"
							media={<Icon icon={Bell} size="md" />}
						/>

						<CheckboxCard
							value="messages"
							indicatorPosition="start"
							title="Messages"
							description="Direct message alerts"
							media={<Icon icon={MessageSquare} size="md" />}
						/>

						<CheckboxCard
							value="emails"
							indicatorPosition="start"
							title="Emails"
							description="Email subscription"
							media={<Icon icon={Mail} size="md" />}
						/>
					</CheckboxCardGroup>
				</Section>

				{/* Group with Max Selection */}
				<Section title="Group with Max Selection (max: 2)">
					<Text style={commonStyles.label}>
						Selected: {limitedValues.length}/2 -{' '}
						{limitedValues.join(', ') || 'None'}
					</Text>
					<CheckboxCardGroup
						values={limitedValues}
						onValuesChange={setLimitedValues}
						max={2}
						gap="md"
					>
						<CheckboxCard
							value="option1"
							indicatorPosition="end"
							colorScheme="primary"
							title="Option 1"
							description="First option"
							media={<Icon icon={Heart} size="md" />}
						/>

						<CheckboxCard
							value="option2"
							indicatorPosition="end"
							colorScheme="primary"
							title="Option 2"
							description="Second option"
							media={<Icon icon={Bookmark} size="md" />}
						/>

						<CheckboxCard
							value="option3"
							indicatorPosition="end"
							colorScheme="primary"
							title="Option 3"
							description="Third option (disabled when max reached)"
							media={<Icon icon={Settings} size="md" />}
						/>
					</CheckboxCardGroup>
				</Section>

				{/* Rounded Options */}
				<Section title="Rounded Options">
					<View style={{ gap: 12 }}>
						{ROUNDED_OPTIONS.map((rounded) => (
							<CheckboxCard
								key={rounded}
								rounded={rounded}
								defaultChecked={true}
								colorScheme="primary"
								title={`rounded: ${rounded}`}
							/>
						))}
					</View>
				</Section>

				{/* Complete Example */}
				<Section title="Complete Example - Settings">
					<View style={{ gap: 12 }}>
						<CheckboxCard
							variant="fade"
							colorScheme="primary"
							selectedColorScheme="success"
							indicatorPosition="end"
							indicatorVariant="filled"
							rounded="lg"
							defaultChecked={true}
							title="Performance Mode"
							description="Enable hardware acceleration for better performance"
							media={<Icon icon={Zap} size="md" />}
						/>

						<CheckboxCard
							variant="fade"
							colorScheme="primary"
							selectedColorScheme="info"
							indicatorPosition="end"
							indicatorVariant="filled"
							rounded="lg"
							defaultChecked={false}
							title="Enhanced Security"
							description="Two-factor authentication and login alerts"
							media={<Icon icon={Shield} size="md" />}
						/>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}
