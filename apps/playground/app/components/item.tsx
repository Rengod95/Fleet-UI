import {
	Button,
	Icon,
	Item,
	ItemActions,
	type ItemColorScheme,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemHeader,
	ItemMedia,
	type ItemMediaVariant,
	type ItemMediaVerticalAlign,
	type ItemRounded,
	type ItemShadow,
	ItemTitle,
	type ItemVariant,
} from '@fleet-ui/components';
import type { ItemSize } from '@fleet-ui/components/src/Item/Item.types';
import {
	AlertCircle,
	ArrowRight,
	Home,
	Settings,
	UserIcon,
} from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import {
	commonStyles,
	DemoIcon,
	PageHeader,
	Section,
} from '../../common/views';

const COLOR_SCHEMES: ItemColorScheme[] = [
	'primary',
	'neutral',
	'error',
	'success',
	'warning',
	'info',
];

const VARIANTS: ItemVariant[] = ['filled', 'outlined', 'flat', 'fade'];

const ROUNDED: ItemRounded[] = ['none', 'sm', 'md', 'lg'];

const SHADOWS: ItemShadow[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];

const MEDIA_VARIANTS: ItemMediaVariant[] = ['icon', 'image'];

const VERTICAL_ALIGNS: ItemMediaVerticalAlign[] = ['top', 'center', 'bottom'];

const SIZES: ItemSize[] = ['sm', 'md', 'lg'];

export default function ItemExamplesScreen() {
	useUnistyles();

	return (
		<ScrollView style={commonStyles.container}>
			<View style={commonStyles.content}>
				<PageHeader
					title="Item"
					description="A versatile component that displays content with media, title, description, and actions. Based on shadcn/ui Item component."
				/>

				<Section
					title="Basic Item"
					description="Simple item with title and description."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<Item variant="flat">
						<ItemMedia mediaType="image" size="md">
							<Icon icon={Home} size="md" />
						</ItemMedia>
						<ItemContent>
							<ItemTitle size="md">Basic Item</ItemTitle>
							<ItemDescription size="md">
								A simple item with title and description.
							</ItemDescription>
						</ItemContent>
					</Item>
				</Section>

				<Section
					title="Variants"
					description="Visual treatments: filled (muted), outlined, flat (default), fade (outlined + muted)."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.column}>
						{VARIANTS.map((variant) => (
							<Item key={variant} variant={variant} style={styles.itemSpacing}>
								<ItemMedia mediaType="icon" size="md">
									<Icon icon={Home} size="md" />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>{variant.toUpperCase()} Variant</ItemTitle>
									<ItemDescription>
										This is the {variant} variant style.
									</ItemDescription>
								</ItemContent>
							</Item>
						))}
					</View>
				</Section>

				<Section
					title="Sizes"
					description="Size options from sm to lg."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.column}>
						{SIZES.map((size) => (
							<Item
								key={size}
								size={size}
								variant="filled"
								style={styles.itemSpacing}
							>
								<ItemMedia mediaType="image" variant="fade" size={size}>
									<Icon icon={Home} size={size} />
								</ItemMedia>
								<ItemContent>
									<ItemTitle size={size}>Size: {size}</ItemTitle>
									<ItemDescription size={size}>
										Size set to {size}
									</ItemDescription>
								</ItemContent>
							</Item>
						))}
					</View>
				</Section>

				<Section
					title="Icon Sizes"
					description="Size options from sm to lg."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.column}>
						{SIZES.map((size) => (
							<Item
								key={size}
								variant="outlined"
								size={size}
								style={styles.itemSpacing}
							>
								<ItemMedia mediaType="image" variant="flat" size={size}>
									<Icon icon={Home} size={size} />
								</ItemMedia>
								<ItemContent>
									<ItemTitle size={size}>Size: {size}</ItemTitle>
									<ItemDescription size={size}>
										Size set to {size}
									</ItemDescription>
								</ItemContent>
							</Item>
						))}
					</View>
				</Section>

				<Section
					title="Color Schemes"
					description="Semantic color roles mapped from design tokens."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.column}>
						{COLOR_SCHEMES.map((scheme) => (
							<Item
								key={scheme}
								colorScheme={scheme}
								variant="filled"
								style={[styles.itemSpacing, { paddingHorizontal: 12 }]}
							>
								<ItemContent>
									<ItemTitle>{scheme.toUpperCase()}</ItemTitle>
									<ItemDescription>
										{scheme} color scheme with filled variant
									</ItemDescription>
								</ItemContent>
							</Item>
						))}
					</View>
				</Section>

				<Section
					title="Rounded Corners"
					description="Border radius options from none to xl."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.column}>
						{ROUNDED.map((rounded) => (
							<Item
								key={rounded}
								variant="outlined"
								rounded={rounded}
								style={styles.itemSpacing}
							>
								<ItemContent>
									<ItemTitle>Rounded: {rounded}</ItemTitle>
									<ItemDescription>
										Border radius set to {rounded}
									</ItemDescription>
								</ItemContent>
							</Item>
						))}
					</View>
				</Section>

				<Section
					title="Shadows"
					description="Elevation presets from none to xl."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.column}>
						{SHADOWS.map((shadow) => (
							<Item
								key={shadow}
								variant="flat"
								shadow={shadow}
								style={styles.itemSpacing}
							>
								<ItemContent>
									<ItemTitle>Shadow: {shadow}</ItemTitle>
									<ItemDescription>
										Shadow elevation set to {shadow}
									</ItemDescription>
								</ItemContent>
							</Item>
						))}
					</View>
				</Section>

				<Section
					title="With Media - Icon Variant"
					description="ItemMedia with icon variant (24x24 fixed size)."
					sectionBodyStyle={{ boxShadow: 'none' }}
				>
					<View style={styles.column}>
						{SIZES.map((size) => (
							<Item key={size} variant="outlined" style={styles.itemSpacing}>
								<ItemMedia mediaType="icon" variant="flat" size={size}>
									<Icon strokeWidth={1.5} icon={Home} size={size} />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>Icon Media Size: {size}</ItemTitle>
									<ItemDescription>
										Icon media size set to {size}
									</ItemDescription>
								</ItemContent>
							</Item>
						))}
					</View>
				</Section>

				<Section
					title="With Media - Image Variant"
					description="ItemMedia with image variant (48x48 rounded)."
				>
					<View style={styles.column}>
						{SIZES.map((size) => (
							<Item key={size} variant="outlined" style={styles.itemSpacing}>
								<ItemMedia mediaType="image" variant="flat" size={size}>
									<Icon strokeWidth={1.5} icon={Home} size={size} />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>Image Media Size: {size}</ItemTitle>
									<ItemDescription>
										Image media size set to {size}
									</ItemDescription>
								</ItemContent>
							</Item>
						))}
					</View>
				</Section>

				<Section
					title="Media Vertical Alignment"
					description="ItemMedia vertical alignment: top, center, bottom."
				>
					<View style={styles.column}>
						{VERTICAL_ALIGNS.map((align) => (
							<Item key={align} variant="outlined" style={styles.itemSpacing}>
								<ItemMedia
									mediaType="icon"
									variant="flat"
									verticalAlign={align}
									size="md"
								>
									<Icon strokeWidth={1.5} icon={Home} />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>Vertical Align: {align}</ItemTitle>
									<ItemDescription>
										This is a longer description to show how vertical alignment
										works. The media should be aligned to the {align} of the
										content area.
									</ItemDescription>
								</ItemContent>
							</Item>
						))}
					</View>
				</Section>

				<Section
					title="With Actions"
					description="Item with action buttons on the right."
				>
					<View style={styles.column}>
						<Item variant="outlined" style={styles.itemSpacing}>
							<ItemContent>
								<ItemTitle>Item with Actions</ItemTitle>
								<ItemDescription>
									Click the button to perform an action
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Button size="sm" variant="outlined">
									Action
								</Button>
							</ItemActions>
						</Item>

						<Item variant="fade" style={styles.itemSpacing}>
							<ItemMedia mediaType="icon" variant="flat" size="md">
								<Icon strokeWidth={1.5} icon={UserIcon} />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Complete Example</ItemTitle>
								<ItemDescription>
									With media, content, and actions
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Button size="sm" variant="ghost">
									View
								</Button>
							</ItemActions>
						</Item>
					</View>
				</Section>

				<Section
					title="With Header & Footer"
					description="Item with header and footer sections."
				>
					<View style={styles.column}>
						<View style={styles.bordered}>
							<ItemHeader>
								<Text style={styles.headerText}>Item Header</Text>
							</ItemHeader>
							<Item variant="flat" style={styles.noSpacing}>
								<ItemContent>
									<ItemTitle>Main Content</ItemTitle>
									<ItemDescription>
										This item has a header and footer
									</ItemDescription>
								</ItemContent>
							</Item>
							<ItemFooter>
								<Text style={styles.footerText}>Item Footer</Text>
							</ItemFooter>
						</View>
					</View>
				</Section>

				<Section
					title="Complex Example"
					description="Full featured item with all elements."
				>
					<View style={[styles.column, { gap: 36 }]}>
						<Item
							variant="outlined"
							size="sm"
							rounded="lg"
							onPress={() => console.log('Item pressed')}
							style={styles.itemSpacing}
						>
							<ItemMedia mediaType="icon" variant="flat">
								<Icon strokeWidth={1.5} icon={Settings} size="md" />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Pressable Item</ItemTitle>
							</ItemContent>
							<ItemActions>
								<Button size="sm" variant="filled">
									Action
								</Button>
							</ItemActions>
						</Item>

						<Item
							variant="flat"
							onPress={() => console.log('Item pressed')}
							style={styles.itemSpacing}
						>
							<ItemMedia mediaType="icon" variant="flat">
								<Icon icon={Home} size="md" />
							</ItemMedia>
							<ItemContent>
								<ItemTitle size="sm">Pressable Item</ItemTitle>
								<ItemDescription>
									Press and hold to see scale animation
								</ItemDescription>
							</ItemContent>
						</Item>

						<Item
							variant="outlined"
							colorScheme="neutral"
							onPress={() => console.log('Primary item pressed')}
							style={styles.itemSpacing}
						>
							<ItemContent>
								<ItemTitle>Primary Pressable</ItemTitle>
								<ItemDescription>
									Scales to 0.98 with spring animation
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Icon strokeWidth={1.5} icon={ArrowRight} size="md" />
							</ItemActions>
						</Item>
						<Item
							variant="filled"
							colorScheme="success"
							rounded="lg"
							shadow="md"
							onPress={() => console.log('Complex item pressed')}
							style={styles.itemSpacing}
						>
							<ItemMedia mediaType="icon" variant="flat" size="lg">
								<Icon strokeWidth={1.5} icon={UserIcon} size="lg" />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Profile Verified</ItemTitle>
								<ItemDescription>
									Your profile has been successfully verified and is now active.
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Button size="sm" colorScheme="neutral" variant="filled">
									View
								</Button>
							</ItemActions>
						</Item>

						<Item
							variant="fade"
							colorScheme="error"
							rounded="md"
							onPress={() => console.log('Error item pressed')}
							style={styles.itemSpacing}
						>
							<ItemMedia mediaType="icon" variant="flat" verticalAlign="top">
								<Icon icon={AlertCircle} size="md" />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>Action Required</ItemTitle>
								<ItemDescription>
									Please review and update your information. This is important
									for your account security.
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Button size="sm" colorScheme="neutral" variant="outlined">
									Review
								</Button>
							</ItemActions>
						</Item>
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create((theme) => ({
	column: {
		gap: theme.spacing[3],
	},
	itemSpacing: {
		marginBottom: theme.spacing[2],
	},
	noSpacing: {
		marginBottom: 0,
	},
	bordered: {
		borderWidth: 1,
		borderColor: theme.colors.neutral.border_default,
		borderRadius: theme.rounded.md,
		overflow: 'hidden',
	},
	headerText: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_2,
		fontWeight: '600',
	},
	footerText: {
		...theme.typography.caption2,
		color: theme.colors.neutral.text_3,
	},
	imagePlaceholder: {
		width: '100%',
		height: '100%',
		backgroundColor: theme.colors.neutral.content_3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imagePlaceholderText: {
		...theme.typography.caption1,
		color: theme.colors.neutral.text_3,
		fontWeight: '600',
	},
	actionIndicator: {
		...theme.typography.h3,
		color: theme.colors.neutral.text_3,
	},
}));
