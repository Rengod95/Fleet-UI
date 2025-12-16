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
	const [themeMode, setThemeMode] = useState<string>('system');
	const [subscriptionPlan, setSubscriptionPlan] = useState<string>('pro');

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="RadioCard"
					description="Card-style radio using Item + Radio composition. Accepts title/description as string props."
				/>

				{/* Variants */}
				<Section title="Variants">
					<View style={{ gap: 12 }}>
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
				<Section title="Color Schemes (Selected)">
					<View style={{ gap: 12 }}>
						{COLOR_SCHEMES.map((colorScheme) => (
							<RadioCard
								key={colorScheme}
								colorScheme={colorScheme}
								value={colorScheme}
								defaultSelected={true}
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

				{/* Indicator Position */}
				<Section title="Indicator Position">
					<View style={{ gap: 12 }}>
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
					<View style={{ gap: 12 }}>
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
				<Section title="Selected Color Scheme">
					<View style={{ gap: 12 }}>
						<RadioCard
							colorScheme="neutral"
							selectedColorScheme="primary"
							value="selected-demo"
							defaultSelected={true}
							title="neutral → primary (selected)"
							description="Changes colorScheme when selected"
						/>

						<RadioCard
							colorScheme="neutral"
							selectedColorScheme="primary"
							value="unselected-demo"
							defaultSelected={false}
							title="neutral → primary (unselected)"
							description="Uses neutral when not selected"
						/>
					</View>
				</Section>

				{/* Disabled State */}
				<Section title="Disabled State">
					<View style={{ gap: 12 }}>
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
				</Section>

				{/* Shipping Method Example */}
				<Section title="Example: Shipping Method">
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
				</Section>

				{/* Theme Mode Example */}
				<Section title="Example: Theme Mode">
					<Text style={commonStyles.label}>Selected: {themeMode}</Text>
					<RadioCardGroup
						value={themeMode}
						onValueChange={setThemeMode}
						name="theme-mode"
						gap="md"
					>
						<RadioCard
							value="light"
							indicatorPosition="start"
							variant="outlined"
							colorScheme="primary"
							rounded="lg"
							title="Light Mode"
							description="Bright and clear interface"
							media={<Icon icon={Sun} size="md" />}
						/>

						<RadioCard
							value="dark"
							indicatorPosition="start"
							variant="outlined"
							colorScheme="primary"
							rounded="lg"
							title="Dark Mode"
							description="Easy on the eyes at night"
							media={<Icon icon={Moon} size="md" />}
						/>

						<RadioCard
							value="system"
							indicatorPosition="start"
							variant="outlined"
							colorScheme="primary"
							rounded="lg"
							title="System Default"
							description="Follows your device settings"
							media={<Icon icon={Monitor} size="md" />}
						/>
					</RadioCardGroup>
				</Section>

				{/* Subscription Plan Example */}
				<Section title="Example: Subscription Plans">
					<Text style={commonStyles.label}>Selected: {subscriptionPlan}</Text>
					<RadioCardGroup
						value={subscriptionPlan}
						onValueChange={setSubscriptionPlan}
						name="subscription-plan"
						gap="md"
					>
						<RadioCard
							value="basic"
							indicatorPosition="end"
							indicatorVariant="outlined"
							variant="outlined"
							colorScheme="neutral"
							selectedColorScheme="primary"
							rounded="xl"
							title="Basic Plan"
							description="$9.99/month • Essential features"
							media={<Icon icon={Sparkles} size="md" />}
						/>

						<RadioCard
							value="pro"
							indicatorPosition="end"
							indicatorVariant="outlined"
							variant="outlined"
							colorScheme="neutral"
							selectedColorScheme="success"
							rounded="xl"
							title="Pro Plan"
							description="$19.99/month • Advanced features + Priority support"
							media={<Icon icon={Crown} size="md" />}
						/>

						<RadioCard
							value="enterprise"
							indicatorPosition="end"
							indicatorVariant="outlined"
							variant="outlined"
							colorScheme="neutral"
							selectedColorScheme="warning"
							rounded="xl"
							title="Enterprise Plan"
							description="Custom pricing • Unlimited everything"
							media={<Icon icon={Gem} size="md" />}
						/>
					</RadioCardGroup>
				</Section>

				{/* Rounded Options */}
				<Section title="Rounded Options">
					<View style={{ gap: 12 }}>
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
			</View>
		</ScrollView>
	);
}
