'use client';

import { GradientText } from './shared/GradientText';
import { CodeBlock } from './shared/CodeBlock';
import { cn } from '@/lib/utils';
import { Code2, Sparkles, Check } from 'lucide-react';

const BUTTON_SOURCE_CODE = `import type { ReactNode } from 'react';
import { forwardRef, isValidElement, useCallback, useEffect, useMemo } from 'react';
import {
	ActivityIndicator,
	type GestureResponderEvent,
	Pressable,
	Text,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedVariantColor } from 'react-native-unistyles/reanimated';
import type { ButtonProps, ButtonSize } from './Button.types';

export const buttonStyles = StyleSheet.create((theme, _rt) => {
	const containerCompoundVariants = theme.utils
		.getColorSchemePaletteEntries(theme)
		.flatMap(([scheme, palette]) => {
			const hasSolidColor = theme.utils.paletteHasSolid(palette);

			return [
				{
					colorScheme: scheme,
					variant: 'filled' as const,
					styles: {
						backgroundColor: hasSolidColor
							? palette.solid
							: palette.content_inversed,
						_web: {
							_hover: {
								backgroundColor: palette.hover,
							},
						},
					},
				},
        // ... more variants
			];
		});

  // ... styles implementation
	return {
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: theme.rounded.md,
      // ... more styles
		},
    // ...
	};
});

// Animation Constants
const SPRING_CONFIG = {
	stiffness: 1600,
	damping: 65,
	mass: 2.5,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button = forwardRef<View, ButtonProps>((props, ref) => {
	const {
		colorScheme = 'primary',
		variant = 'filled',
		size = 'md',
		loading = false,
		children,
		onPress,
    // ... other props
		...rest
	} = props;

	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);

	buttonStyles.useVariants({
		colorScheme,
		size,
		variant,
    // ...
	});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}));

	const handlePressIn = useCallback(
		(event: GestureResponderEvent) => {
			scale.value = withSpring(0.94, SPRING_CONFIG);
			opacity.value = withSpring(0.86, SPRING_CONFIG);
		},
		[scale, opacity]
	);
  
  // ... more event handlers

	return (
		<AnimatedPressable
			ref={ref}
			style={[
				buttonStyles.container,
				animatedStyle,
			]}
			onPress={handlePress}
			onPressIn={handlePressIn}
			{...rest}
		>
			{resolvedChildren}
		</AnimatedPressable>
	);
});

Button.displayName = 'Button';`;

const USAGE_CODE = `import { Button } from '@fleet-ui/components';

export function Example() {
  const handlePress = () => {
    // Handle press
  };

  return (
    <Button 
      variant="solid" 
      size="md" 
      onPress={handlePress}
    >
      Get Started
    </Button>
  );
}`;

export function CodeComparison() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Less Code. <GradientText>More Impact.</GradientText>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We handle the complexity so you can focus on shipping.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Before: Internal Implementation */}
          <div className="relative group rounded-2xl border border-red-500/10 bg-gradient-to-b from-red-500/1 to-transparent p-1">
             <div className="absolute inset-0 bg-grid-white/[0.02] -z-10 rounded-2xl" />
             
             {/* Header */}
             <div className="px-6 py-4 flex items-center justify-between border-b border-red-500/10">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-red-400" />
                  <span className="font-semibold text-red-500/90">Under the hood</span>
                </div>
                <span className="text-lg font-mono text-red-400/60">Button • ~575 lines</span>
             </div>

             {/* Code Area */}
             <div className="relative h-[480px] rounded-b-xl bg-card/10 overflow-scroll">
                <pre className="text-sm font-mono text-gray-300 p-4">
                  <code>{BUTTON_SOURCE_CODE}</code>
                </pre>
             </div>
          </div>

          {/* After: Simple Usage */}
          <div className="relative group rounded-2xl border border-green-500/10 bg-gradient-to-b from-green-500/5 to-transparent p-1 shadow-2xl shadow-green-900/5">
             <div className="absolute inset-0 bg-grid-white/[0.02] -z-10 rounded-2xl" />
             
             {/* Header */}
             <div className="px-6 py-4 flex items-center justify-between border-b border-green-500/10">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-green-500/90">Your Experience</span>
                </div>
                <span className="text-lg font-mono text-green-400/60">Usage • ~10 lines</span>
             </div>

             {/* Code Area */}
             <div className="relative h-[480px] flex flex-col rounded-b-xl">
                <pre className="text-sm font-mono text-gray-300 p-4">
                  <code>{USAGE_CODE}</code>
                </pre>
                 
                 {/* Stat Badge */}
                 <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-5 py-2.5 backdrop-blur-md shadow-lg shadow-green-500/5">
                       <div className="flex bg-green-500 text-black rounded-full p-0.5">
                         <Check className="h-3 w-3" />
                       </div>
                       <span className="text-sm font-medium text-green-200">
                          Ready for Production
                       </span>
                    </div>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
