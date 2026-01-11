import { Icon, RadioCard, RadioCardGroup } from '@fleet-ui/components';
import {
	Building2,
	CreditCard,
	Crown,
	Gem,
	Monitor,
	Moon,
	Package,
	Plane,
	Rocket,
	Smartphone,
	Sparkles,
	Sun,
	Truck,
	Wallet,
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

export default function RadioCardScreen() {
	useUnistyles();

	// 그룹 사용 상태들
	const [paymentMethod, setPaymentMethod] = useState<string>('card');
	const [shippingMethod, setShippingMethod] = useState<string>('standard');

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="RadioCard"
					description="Card-style radio using Item + Radio composition. Accepts title/description as string props."
				/>

				<Section
					title="Overview"
					value="overview"
					description="Most basic RadioCard example (controlled group, flat variant)."
				>
					<View style={[{width:'100%'}]}>
						<RadioCard
							variant="filled"
							value="card"
							selected={paymentMethod === 'card'}
							onSelect={() => setPaymentMethod('card')}
							title="Card"
							description="Payment method"
						/>
					</View>
				</Section>

				{/* Variants */}
				<Section title="Variants">
					<View style={[{width:'100%', gap :16}]}>
						{VARIANTS.map((variant) => (
							<RadioCard
								key={variant}
								variant={variant}
								value={variant}
								defaultSelected={variant === 'outlined'}
								title={`${variant} variant`}
								// description={`Card variant: ${variant}`}
								indicatorPosition="start"
							/>
						))}
					</View>
				</Section>

				{/* Color Schemes */}
				<Section title="Color Schemes x Variants">
					<View style={[{width:'100%', gap :16}]}>
						{COLOR_SCHEMES.map((colorScheme) => (
							VARIANTS.map((variant) => (
							<RadioCard
								key={`${colorScheme}-${variant}`}
								colorScheme={colorScheme}
								variant={variant}
								value={colorScheme}
								defaultSelected={true}
								title={colorScheme}
								description={`${variant} variant`}
								/>
							))
						))}
					</View>
				</Section>

				{/* Sizes */}
				<Section title="Sizes">
					<View style={[{width:'100%', gap :16}]}>
						{SIZES.map((size) => (
							<RadioCard
								key={size}
								size={size}
								value={size}
								defaultSelected={true}
								title={`Size: ${size}`}
								description="Card and indicator size variant"
							/>
						))}
					</View>
				</Section>

				{/* Rounded Options */}
				<Section title="Rounded">
					<View style={[{width:'100%', gap :16}]}>
						{ROUNDED_OPTIONS.map((rounded) => (
							<RadioCard
								key={rounded}
								rounded={rounded}
								value={rounded}
								defaultSelected={true}
								colorScheme="primary"
								title={`rounded: ${rounded}`}
							/>
						))}
					</View>
				</Section>

				{/* Indicator Position */}
				<Section title="Indicator Position">
					<View style={[{width:'100%', gap :16}]}>
						{INDICATOR_POSITIONS.map((position) => (
							<RadioCard
								key={position}
								indicatorPosition={position}
								value={position}
								defaultSelected={true}
								colorScheme="primary"
								title={`Position: ${position}`}
								description={`Radio on the ${position}`}
							/>
						))}
					</View>
				</Section>

				{/* Indicator Variants */}
				<Section title="Indicator Variants">
					<View style={[{width:'100%', gap :16}]}>
						{INDICATOR_VARIANTS.map((indicatorVariant) => (
							<RadioCard
								key={indicatorVariant}
								indicatorVariant={indicatorVariant}
								value={indicatorVariant}
								defaultSelected={true}
								colorScheme="primary"
								title={`Indicator: ${indicatorVariant}`}
								description="Radio indicator style"
							/>
						))}
					</View>
				</Section>

				{/* Selected Color Scheme */}
				<Section title="Selected Color Scheme Prop">
					<View style={[{width:'100%', gap :16}]}>
						<RadioCard
							colorScheme="neutral"
							selectedColorScheme="primary"
							value="selected-demo"
							defaultSelected={true}
							title="neutral → primary (selected)"
							description="Changes colorScheme when selected"
						/>
					</View>
				</Section>

				{/* Disabled State */}
				<Section title="Disabled State">
					<View style={[{width:'100%', gap :16}]}>
						<RadioCard
							disabled={true}
							value="disabled-1"
							defaultSelected={false}
							title="Disabled (unselected)"
							description="Cannot interact with this card"
						/>

						<RadioCard
							disabled={true}
							value="disabled-2"
							defaultSelected={true}
							title="Disabled (selected)"
							description="Selected but cannot be changed"
						/>
					</View>
				</Section>

				{/* Payment Method Example */}
				<Section title="Example: Payment Method">
					<View style={[{width:'100%', gap :16}]}>
					 	<Text style={commonStyles.label}>Selected: {paymentMethod}</Text>
						<RadioCardGroup
							value={paymentMethod}
							onValueChange={setPaymentMethod}
							name="payment-method"
							gap="md"
						>
							<RadioCard
								value="card"
								indicatorPosition="start"
								colorScheme="primary"
								title="Credit Card"
								description="Pay with Visa, Mastercard, or AMEX"
								media={<Icon icon={CreditCard} size="md" />}
							/>

							<RadioCard
								value="wallet"
								indicatorPosition="start"
								colorScheme="primary"
								title="Digital Wallet"
								description="Apple Pay, Google Pay, or PayPal"
								media={<Icon icon={Wallet} size="md" />}
							/>

							<RadioCard
								value="bank"
								indicatorPosition="start"
								colorScheme="primary"
								title="Bank Transfer"
								description="Direct bank transfer (1-2 days)"
								media={<Icon icon={Building2} size="md" />}
							/>

							<RadioCard
								value="mobile"
								indicatorPosition="start"
								colorScheme="primary"
								title="Mobile Payment"
								description="Samsung Pay or carrier billing"
								media={<Icon icon={Smartphone} size="md" />}
							/>
						</RadioCardGroup>
					</View>
				</Section>

				{/* Shipping Method Example */}
				<Section title="Example: Shipping Method">
					<View style={[{width:'100%', gap :16}]}>
						<Text style={commonStyles.label}>Selected: {shippingMethod}</Text>
						<RadioCardGroup
							value={shippingMethod}
							onValueChange={setShippingMethod}
							name="shipping-method"
							gap="md"
						>
							<RadioCard
								value="standard"
								indicatorPosition="end"
								variant="fade"
								colorScheme="neutral"
								selectedColorScheme="success"
								title="Standard Shipping"
								description="5-7 business days • Free"
								media={<Icon icon={Package} size="md" />}
							/>

							<RadioCard
								value="express"
								indicatorPosition="end"
								variant="fade"
								colorScheme="neutral"
								selectedColorScheme="info"
								title="Express Shipping"
								description="2-3 business days • $9.99"
								media={<Icon icon={Truck} size="md" />}
							/>

							<RadioCard
								value="overnight"
								indicatorPosition="end"
								variant="fade"
								colorScheme="neutral"
								selectedColorScheme="warning"
								title="Overnight Shipping"
								description="Next business day • $24.99"
								media={<Icon icon={Plane} size="md" />}
							/>

							<RadioCard
								value="same-day"
								indicatorPosition="end"
								variant="fade"
								colorScheme="neutral"
								selectedColorScheme="error"
								title="Same Day Delivery"
								description="Within 4 hours • $39.99"
								media={<Icon icon={Rocket} size="md" />}
							/>
						</RadioCardGroup>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}
