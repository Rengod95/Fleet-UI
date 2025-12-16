import {
	BottomSheetModal,
	Button,
	CheckboxCard,
	CheckboxCardGroup,
	Chip,
	ContextHeader,
	Divider,
	Icon,
	IconButton,
	Input,
	RadioCard,
	RadioCardGroup,
	Section,
	Slider,
	State,
	TabBar,
	TableRow,
	Typo,
} from '@fleet-ui/components';
import { useToast } from '@fleet-ui/components';
import { router } from 'expo-router';
import {
	Check,
	ChevronLeft,
	CreditCard,
	DollarSignIcon,
	Gift,
	Package,
	Percent,
	Shield,
	ShoppingCart,
	Sparkles,
	Star,
	Zap,
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

// ============================================
// Types
// ============================================

type PlanType = 'basic' | 'pro' | 'enterprise';
type BillingCycle = 'monthly' | 'yearly';

interface BillingState {
	// Plan Selection
	plan: PlanType;
	billingCycle: BillingCycle;

	// Add-ons (multiple selection)
	addons: string[];

	// Quantity
	seats: number;

	// Promo
	promoCode: string;
	promoApplied: boolean;

	// Payment Status
	paymentStatus: 'idle' | 'processing' | 'success' | 'error';
}

// ============================================
// Constants
// ============================================

const PLANS: {
	value: PlanType;
	title: string;
	price: { monthly: number; yearly: number };
	features: string[];
	badge?: string;
}[] = [
	{
		value: 'basic',
		title: 'Basic',
		price: { monthly: 9, yearly: 90 },
		features: ['5 projects', '10GB storage', 'Email support'],
	},
	{
		value: 'pro',
		title: 'Pro',
		price: { monthly: 29, yearly: 290 },
		features: ['Unlimited projects', '100GB storage', 'Priority support'],
		badge: 'Popular',
	},
	{
		value: 'enterprise',
		title: 'Enterprise',
		price: { monthly: 99, yearly: 990 },
		features: ['Custom solutions', 'Unlimited storage', 'Dedicated support'],
	},
];

const ADDONS: {
	value: string;
	title: string;
	description: string;
	price: number;
	icon: typeof Shield;
}[] = [
	{
		value: 'security',
		title: 'Advanced Security',
		description: 'SSO, 2FA, audit logs',
		price: 15,
		icon: Shield,
	},
	{
		value: 'analytics',
		title: 'Analytics Pro',
		description: 'Advanced insights & reports',
		price: 20,
		icon: Sparkles,
	},
	{
		value: 'priority',
		title: 'Priority Delivery',
		description: 'Faster processing & support',
		price: 10,
		icon: Zap,
	},
];

const PROMO_CODES: Record<string, number> = {
	SAVE10: 10,
	WELCOME20: 20,
	VIP30: 30,
};

// ============================================
// Main Component
// ============================================

export default function BillingScreen() {
	const { theme } = useUnistyles();
	const toast = useToast();

	const [billing, setBilling] = useState<BillingState>({
		plan: 'pro',
		billingCycle: 'monthly',
		addons: [],
		seats: 1,
		promoCode: '',
		promoApplied: false,
		paymentStatus: 'idle',
	});

	const [showCheckout, setShowCheckout] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	// ============================================
	// Calculations
	// ============================================

	const selectedPlan = PLANS.find((p) => p.value === billing.plan) ?? PLANS[0];
	const planPrice =
		selectedPlan.price[billing.billingCycle] * billing.seats;
	const addonsPrice = billing.addons.reduce((sum, addonValue) => {
		const addon = ADDONS.find((a) => a.value === addonValue);
		return sum + (addon?.price || 0) * billing.seats;
	}, 0);
	const subtotal = planPrice + addonsPrice;
	const discount = billing.promoApplied
		? subtotal * (PROMO_CODES[billing.promoCode.toUpperCase()] / 100)
		: 0;
	const total = subtotal - discount;

	// ============================================
	// Handlers
	// ============================================

	const updateBilling = <K extends keyof BillingState>(
		key: K,
		value: BillingState[K],
	) => {
		setBilling((prev) => ({ ...prev, [key]: value }));
	};

	const handleApplyPromo = () => {
		const code = billing.promoCode.toUpperCase();
		if (PROMO_CODES[code]) {
			updateBilling('promoApplied', true);
			toast.show({
				title: 'Promo code applied!',
				description: `${PROMO_CODES[code]}% discount added`,
				colorScheme: 'success',
			});
		} else {
			toast.show({
				title: 'Invalid code',
				description: 'Please check your promo code',
				colorScheme: 'error',
			});
		}
	};

	const handleCheckout = () => {
		setShowCheckout(true);
	};

	const handleConfirmPayment = async () => {
		updateBilling('paymentStatus', 'processing');

		// Simulate payment processing
		await new Promise((resolve) => setTimeout(resolve, 2000));

		updateBilling('paymentStatus', 'success');
		setShowCheckout(false);

		// Show success state after a brief delay
		setTimeout(() => {
			setShowSuccess(true);
		}, 300);
	};

	const handleBack = () => {
		if (showSuccess) {
			setShowSuccess(false);
			router.back();
		} else {
			router.back();
		}
	};

	// ============================================
	// Success State
	// ============================================

	if (showSuccess) {
		return (
			<View style={styles.container}>
				<ContextHeader
					title=""
					size="lg"
					style={styles.header}
					includeSafeAreaTop={true}
					paddingHorizontal='md'
					left={
						<IconButton
							size="xs"
							variant="flat"
							icon={<ChevronLeft size={20} strokeWidth={2} />}
							onPress={handleBack}
						/>
					}
				/>
				<View style={styles.successContainer}>
					<State
						variant="success"
						title="Payment Successful!"
						description={`Your ${selectedPlan.title} plan is now active.\nThank you for your purchase!`}
						button={
							<State.Button onPress={handleBack}>Back to Samples</State.Button>
						}
					/>
				</View>
			</View>
		);
	}

	// ============================================
	// Render
	// ============================================

	return (
		<View style={styles.container}>
			{/* Header */}
			<ContextHeader
				title="Billing"
				size="lg"
				includeSafeAreaTop={true}
				paddingHorizontal='md'
				shadow='md'
				left={
					<IconButton
						size="xs"
						variant="ghost"
						icon={<Icon icon={ChevronLeft} size="xl" colorScheme="neutral" />}
						onPress={handleBack}
					/>
				}
				right={
					<Chip
						size="lg"
						variant="flat"
						colorScheme="neutral"
						leftIcon={<DollarSignIcon size={14} />}
					>{total.toFixed(2)}
					</Chip>
				}

			/>

			{/* Content */}
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
			>
				{/* ============================================ */}
				{/* Billing Cycle Toggle */}
				{/* ============================================ */}
				<View style={styles.cycleToggle}>
					<TabBar
						selectedPage={billing.billingCycle === 'monthly' ? 0 : 1}
						items={['Monthly', 'Yearly']}
						onSelect={(index) =>
							updateBilling('billingCycle', index === 0 ? 'monthly' : 'yearly')
						}
						variant="flat"
						size="md"
						rounded="full"
						colorScheme="neutral"
						indicatorPadding='sm'
					/>
				</View>

				{/* ============================================ */}
				{/* Plan Selection */}
				{/* ============================================ */}
				<Section
					title="Select Plan for your business"
					size="md"
					headerStyle={{
						paddingHorizontal: theme.spacing[6],
						paddingTop: theme.spacing[5],
					}}
					padding={theme.spacing[5]}
					contentSpacing={theme.spacing[5]}
					// contentStyle={{ paddingHorizontal: theme.spacing[5], paddingBottom: theme.spacing[7] }}
				>
					<RadioCardGroup
						value={billing.plan}
						onValueChange={(value) => updateBilling('plan', value as PlanType)}
						gap="lg"
						style={{backgroundColor: theme.colors.neutral.content_1}}
					>
						{PLANS.map((plan) => (
							<RadioCard
								key={plan.value}
								value={plan.value}
								title={plan.title}
								description={`$${plan.price[billing.billingCycle]}/${billing.billingCycle === 'monthly' ? 'mo' : 'yr'}`}
								media={<Icon icon={Package} size="lg" colorScheme="neutral" />}
								variant="filled"
								selectedVariant="filled"
								selectedColorScheme="neutral"
								selected={true}
								size="md"
								rounded='lg'
								indicatorPosition="end"
								right={
									plan.badge ? (
										<Chip
											size="md"
											variant="flat"
											colorScheme="primary"
										>
											{plan.badge}
										</Chip>
									) : undefined
								}
								style={{flexGrow:1}}
							/>
						))}
					</RadioCardGroup>
				</Section>

				<Section title="" padding={theme.spacing[5]} size='sm' headerStyle={{paddingHorizontal: theme.spacing[6], paddingTop: theme.spacing[5]}} contentSpacing={theme.spacing[5]} contentStyle={{marginBottom: theme.spacing[8]}}>
					<View style={styles.planFeatures}>
					{selectedPlan.features.map((feature) => (
						<View key={feature} style={styles.featureRow}>
							<Icon icon={Check} size="xs" colorScheme="success" />
							<Typo variant="caption1" style={styles.featureText}>
								{feature}
							</Typo>
						</View>
					))}
					</View>
				</Section>
				

				<Divider variant="thick" size="sm" />

				{/* ============================================ */}
				{/* Add-ons */}
				{/* ============================================ */}
				<Section
					title="Add-ons"
					subtitle="Enhance your plan with additional features"
					size="lg"
					headerStyle={{
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[6],
					}}
					contentStyle={{ paddingHorizontal: theme.spacing[4] }}
				>
					<CheckboxCardGroup
						values={billing.addons}
						onValuesChange={(values) => updateBilling('addons', values)}
						gap="sm"
					>
						{ADDONS.map((addon) => (
							<CheckboxCard
								key={addon.value}
								value={addon.value}
								title={addon.title}
								description={`+$${addon.price}/seat/mo`}
								media={
									<Icon icon={addon.icon} size="md" colorScheme="neutral" />
								}
								variant="flat"
								size="md"
								indicatorPosition="end"
								footer={
									<Typo variant="caption1" style={styles.addonDescription}>
										{addon.description}
									</Typo>
								}
							/>
						))}
					</CheckboxCardGroup>
				</Section>
						
				<Divider variant="thick" size="sm" />

				{/* ============================================ */}
				{/* Seats */}
				{/* ============================================ */}
				<Section
					title="Team Size"
					subtitle="Number of seats in your plan"
					size="lg"
					headerStyle={{
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[6],
					}}
					contentStyle={{ paddingHorizontal: theme.spacing[4] }}
				>
					<View style={styles.seatsContainer}>
						<View style={styles.seatsHeader}>
							<Typo variant="body2">Seats</Typo>
							<Typo variant="h4" style={styles.seatsValue}>
								{billing.seats}
							</Typo>
						</View>
						<Slider
							defaultValue={[billing.seats]}
							onValueChange={(value) => updateBilling('seats', value[0])}
							min={1}
							max={50}
							step={1}
							size="md"
							trackVariant="flat"
							thumbVariant="circle"
							colorScheme="primary"
						/>
						<View style={styles.seatsLabels}>
							<Typo variant="caption1" style={styles.seatsMinMax}>
								1
							</Typo>
							<Typo variant="caption1" style={styles.seatsMinMax}>
								50
							</Typo>
						</View>
					</View>
				</Section>

				<Divider variant="thick" size="sm" />

				{/* ============================================ */}
				{/* Promo Code */}
				{/* ============================================ */}
				<Section
					title="Promo Code"
					size="lg"
					headerStyle={{
						paddingHorizontal: theme.spacing[5],
						paddingTop: theme.spacing[6],
					}}
					contentStyle={{ paddingHorizontal: theme.spacing[4] }}
				>
					<View style={styles.promoContainer}>
						<View style={styles.promoInputWrapper}>
							<Input
								placeholder="Enter code (try: SAVE10)"
								value={billing.promoCode}
								onChangeText={(text) => {
									updateBilling('promoCode', text);
									updateBilling('promoApplied', false);
								}}
								variant="flat"
								size="md"
								startContent={
									<Icon icon={Gift} size="sm" colorScheme="neutral" />
								}
								isDisabled={billing.promoApplied}
							/>
						</View>
						<Button
							variant="flat"
							colorScheme={billing.promoApplied ? 'success' : 'primary'}
							size="lg"
							onPress={handleApplyPromo}
							disabled={!billing.promoCode || billing.promoApplied}
							leftIcon={
								billing.promoApplied ? (
									<Icon icon={Check} size="sm" colorScheme="success" />
								) : (
									<Icon icon={Percent} size="sm" />
								)
							}
						>
							{billing.promoApplied ? 'Applied' : 'Apply'}
						</Button>
					</View>
					{billing.promoApplied && (
						<Chip
							size="sm"
							variant="flat"
							colorScheme="success"
							style={styles.promoAppliedChip}
						>
							{PROMO_CODES[billing.promoCode.toUpperCase()]}% discount applied
						</Chip>
					)}
				</Section>

				{/* Bottom spacing */}
				<View style={styles.bottomSpacer} />
			</ScrollView>

			{/* Footer */}
			<View style={styles.footer}>
				<View style={styles.footerPrice}>
					<Typo variant="body3" style={styles.footerLabel}>
						Total
					</Typo>
					<Typo variant="h3">${total.toFixed(2)}</Typo>
					{discount > 0 && (
						<Typo variant="caption1" style={styles.footerDiscount}>
							-${discount.toFixed(2)} saved
						</Typo>
					)}
				</View>
				<Button
					variant="filled"
					colorScheme="neutral"
					size="xl"
					onPress={handleCheckout}
					rightIcon={<Icon icon={CreditCard} size="sm" color="white" />}
					style={styles.checkoutButton}
				>
					Checkout
				</Button>
			</View>

			{/* ============================================ */}
			{/* Checkout Bottom Sheet */}
			{/* ============================================ */}
			<BottomSheetModal
				visible={showCheckout}
				onDismiss={() => setShowCheckout(false)}
				// size="md"
				rounded="lg"
			>
				<BottomSheetModal.Header
					title="Order Summary"
					size="md"
					// subtitle="Review your order before payment"
				/>
				<BottomSheetModal.Body>
					<View style={styles.billContainer}>
						{/* Plan */}
						<TableRow
							left="Plan"
							right={`${selectedPlan.title} (${billing.billingCycle})`}
							size="md"
							highlightRight
						/>
						<TableRow
							left={`${billing.seats} seat${billing.seats > 1 ? 's' : ''}`}
							right={`$${planPrice.toFixed(2)}`}
							size="md"
						/>

						{/* Add-ons */}
						{billing.addons.length > 0 && (
							<>
								<Divider variant="line" size="sm" style={styles.billDivider} />
								<Typo variant="h6" style={{fontWeight: 600, lineHeight:theme.text.lineHeight._4xl}}>Add-ons</Typo>
								{billing.addons.map((addonValue) => {
									const addon = ADDONS.find((a) => a.value === addonValue);
									if (!addon) return null;
									return (
										<TableRow
											key={addonValue}
											left={addon.title}
											right={`$${(addon.price * billing.seats).toFixed(2)}`}
											size="sm"
										/>
									);
								})}
							</>
						)}

						{/* Subtotal */}
						<Divider variant="line" size="sm" style={styles.billDivider} />
						<TableRow
							left="Subtotal"
							right={`$${subtotal.toFixed(2)}`}
							size="md"
						/>

						{/* Discount */}
						{discount > 0 && (
							<TableRow
								left={
									<View style={styles.discountRow}>
										<Typo variant="body3">Discount</Typo>
										<Chip size="sm" variant="flat" colorScheme="success">
											{billing.promoCode.toUpperCase()}
										</Chip>
									</View>
								}
								right={`-$${discount.toFixed(2)}`}
								size="sm"
								disableLeftTextStyle
								rightTextStyle={styles.discountValue}
							/>
						)}

						{/* Total */}
						{/* <Divider variant="line" size="md" style={styles.billDivider} /> */}
						<TableRow
							left="Total"
							right={`$${total.toFixed(2)}`}
							size="lg"
							highlightLeft
							highlightRight
						/>
					</View>

					{/* Payment Method Hint */}
					<View style={styles.paymentHint}>
						<Icon icon={CreditCard} size="sm" colorScheme="neutral" />
						<Typo variant="caption1" style={styles.paymentHintText}>
							Payment will be processed securely
						</Typo>
					</View>
				</BottomSheetModal.Body>
				<BottomSheetModal.Footer>
					<BottomSheetModal.Action
						layout="vertical"
						showPrimary
						showSecondary
						primaryButtonProps={{
							children:
								billing.paymentStatus === 'processing'
									? 'Processing...'
									: 'Confirm Payment',
							onPress: handleConfirmPayment,
							loading: billing.paymentStatus === 'processing',
							colorScheme: 'neutral',
						}}
						secondaryButtonProps={{
							children: 'Cancel',
							onPress: () => setShowCheckout(false),
							variant: 'flat',
						}}
					/>
				</BottomSheetModal.Footer>
			</BottomSheetModal>
		</View>
	);
}

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create((theme, rt) => ({
	container: {
		flex: 1,
		backgroundColor: theme.colors.neutral.content_1,
		// paddingTop: rt.insets.top,
	},

	// Header
	header: {
		// paddingHorizontal: 16,
		// borderBottomWidth: 1,
		// borderBottomColor: theme.colors.neutral.content_3,
	},

	// Success
	successContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.spacing[6],
	},

	// Scroll
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 120,
	},

	// Cycle Toggle
	cycleToggle: {
		marginHorizontal: theme.spacing[14],
		marginTop: theme.spacing[7],
		marginBottom: theme.spacing[3],
	},

	// Plan Features
	planFeatures: {
		gap: theme.spacing[2],
		// marginTop: theme.spacing[2],
		backgroundColor: theme.colors.neutral.content_2,
		padding: theme.spacing[4],
		paddingVertical: theme.spacing[6],
		borderRadius: theme.rounded.md,
		borderCurve: 'continuous',
	},
	featureRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing[2],
		
	},
	featureText: {
		color: theme.colors.primary.text_3,
	},

	// Addon
	addonDescription: {
		color: theme.colors.neutral.text_4,
		marginTop: theme.spacing[1],
	},

	// Seats
	seatsContainer: {
		padding: theme.spacing[4],
		backgroundColor: theme.colors.neutral.content_2,
		borderRadius: theme.rounded.md,
	},
	seatsHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: theme.spacing[4],
	},
	seatsValue: {
		color: theme.colors.primary.solid,
	},
	seatsLabels: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: theme.spacing[2],
	},
	seatsMinMax: {
		color: theme.colors.neutral.text_4,
	},

	// Promo
	promoContainer: {
		flexDirection: 'row',
		gap: theme.spacing[3],
		alignItems: 'flex-start',
	},
	promoInputWrapper: {
		flex: 1,
	},
	promoAppliedChip: {
		alignSelf: 'flex-start',
		marginTop: theme.spacing[3],
	},

	// Footer
	footer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: theme.spacing[5],
		paddingTop: theme.spacing[4],
		paddingBottom: rt.insets.bottom + theme.spacing[4],
		backgroundColor: theme.colors.neutral.content_1,
		borderTopWidth: 1,
		borderTopColor: theme.colors.neutral.border_subtle,
	},
	footerPrice: {
		gap: theme.spacing[1],
	},
	footerLabel: {
		color: theme.colors.neutral.text_3,
	},
	footerDiscount: {
		color: theme.colors.success.solid,
	},
	checkoutButton: {
		minWidth: 160,
	},

	// Bill
	billContainer: {
		gap: theme.spacing[2],
	},
	billDivider: {
		marginVertical: theme.spacing[2],
	},
	discountRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing[2],
	},
	discountValue: {
		color: theme.colors.success.border_strong,
	},

	// Payment Hint
	paymentHint: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: theme.spacing[2],
		marginTop: theme.spacing[4],
		paddingTop: theme.spacing[4],
		borderTopWidth: 1,
		borderTopColor: theme.colors.neutral.border_subtle,
	},
	paymentHintText: {
		color: theme.colors.neutral.text_4,
	},

	// Bottom
	bottomSpacer: {
		height: 24,
	},
}));
