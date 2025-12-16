import { Input } from '@fleet-ui/components';
import { Info, Search } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { commonStyles, PageHeader, Section } from '../../common/views';

const VARIANTS = ['filled', 'flat', 'bordered', 'underlined', 'faded'] as const;
const COLORS = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
] as const;
const SIZES = ['sm', 'md', 'lg', 'xl'] as const;
const LABEL_PLACEMENTS = ['inside', 'outside', 'outside-left'] as const;
const SHADOWS = ['none', 'sm', 'md', 'lg', 'xl', 'inner'] as const;
export default function InputScreen() {
	useUnistyles();
	return (
		<ScrollView
			style={commonStyles.container}
			contentContainerStyle={commonStyles.content}
		>
			<PageHeader title="Input" description="Text input component." />

			<Section title="Variants">
				<View style={commonStyles.fullWidthContainer}>
					{VARIANTS.map((variant) => (
						<Input
							key={variant}
							label={`${variant.charAt(0).toUpperCase() + variant.slice(1)}`}
							variant={variant}
							placeholder="Enter text"
						/>
					))}
				</View>
			</Section>

			<Section title="Icons">
				<View style={commonStyles.fullWidthContainer}>
					<Input
						key="left-icon"
						label="Left Icon"
						placeholder="Enter text"
						startContent={<Info />}
					/>
					<Input
						key="right-icon"
						label="Right Icon"
						placeholder="Enter text"
						endContent={<Search />}
					/>
					<Input
						key="both-icons"
						label="Both Icons"
						startContent={<Info />}
						endContent={<Search />}
						placeholder="Enter text"
					/>
				</View>
			</Section>

			{VARIANTS.map((variant) => (
				<Section
					key={variant}
					title={`Colors - ${variant}`}
					description={`Color variations for ${variant} variant.`}
				>
					<View style={commonStyles.fullWidthContainer}>
						{COLORS.map((color) => (
							<Input
								key={`${variant}-${color}`}
								label={color.charAt(0).toUpperCase() + color.slice(1)}
								colorScheme={color}
								variant={variant}
								placeholder="Enter text"
							/>
						))}
					</View>
				</Section>
			))}

			<Section title="Sizes">
				<View style={commonStyles.fullWidthContainer}>
					{SIZES.map((size) => (
						<Input
							key={size}
							label={size.toUpperCase()}
							size={size}
							placeholder="Enter text"
						/>
					))}
				</View>
				<View style={commonStyles.fullWidthContainer}>
					{SIZES.map((size) => (
						<Input
							key={size}
							label={size.toUpperCase()}
							size={size}
							variant="flat"
							placeholder="Enter text"
						/>
					))}
				</View>
			</Section>

			<Section title="Label Placements">
				<View style={commonStyles.fullWidthContainer}>
					{LABEL_PLACEMENTS.map((placement) => (
						<Input
							key={placement}
							label={placement}
							labelPlacement={placement}
							placeholder="Enter text"
						/>
					))}
				</View>
			</Section>

			<Section title="States">
				<View style={commonStyles.fullWidthContainer}>
					<Input label="Disabled" isDisabled placeholder="Disabled input" />
					<Input label="Read Only" isReadOnly defaultValue="Read only value" />
					<Input
						label="Invalid"
						isInvalid
						errorMessage="Please enter a valid email"
						placeholder="Enter email"
					/>
					<Input
						label="Clearable"
						isClearable
						placeholder="Type to see clear button"
					/>
				</View>
			</Section>

			<Section title="With Description">
				<Input
					label="Email"
					description="We'll never share your email with anyone else."
					placeholder="Enter your email"
				/>
			</Section>

			<Section title="Full Width">
				<View style={commonStyles.fullWidthContainer}>
					<Input
						label="Full Width (Default)"
						fullWidth
						placeholder="Enter text"
					/>
					<View style={{ width: 200 }}>
						<Input
							label="Fixed Width Container"
							fullWidth
							placeholder="Enter text"
						/>
					</View>
					<Input
						label="Auto Width"
						fullWidth={false}
						placeholder="Enter text"
					/>
				</View>
			</Section>
			<Section title="Shadows">
				<View style={[commonStyles.fullWidthContainer, { gap: 36 }]}>
					<Input label="None" shadow="none" placeholder="Enter text" />
					{/* <Input label="Sm" shadow="sm" placeholder="Enter text" />
					<Input label="Md" shadow="md" placeholder="Enter text" />
					<Input label="Lg" shadow="lg" placeholder="Enter text" />
					<Input label="Xl" shadow="xl" placeholder="Enter text" /> */}
					<Input
						label="Inner"
						shadow="inner"
						placeholder="Enter text"
						colorScheme="neutral"
						variant="flat"
					/>
					<Input
						label="Inner-filled"
						shadow="inner"
						placeholder="Enter text"
						colorScheme="neutral"
						variant="filled"
					/>
					<Input
						label="Inner-bordered"
						shadow="inner"
						placeholder="Enter text"
						colorScheme="neutral"
						variant="bordered"
					/>
					<Input
						label="Inner-underlined"
						shadow="inner"
						placeholder="Enter text"
						colorScheme="neutral"
						variant="underlined"
					/>
					<Input
						label="Inner-faded"
						shadow="inner"
						placeholder="Enter text"
						colorScheme="neutral"
						variant="faded"
					/>
				</View>
			</Section>
		</ScrollView>
	);
}
