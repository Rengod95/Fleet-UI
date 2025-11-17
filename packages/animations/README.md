# @fleet-ui/animations

Cross-platform animation utilities and presets for React Native, built with React Native Reanimated.

## Installation

```bash
npm install @my-sdk/animations
# or
pnpm add @my-sdk/animations
```

## Peer Dependencies

Make sure you have these installed:

```bash
npm install react react-native react-native-reanimated
```

## Directory Structure

```
src/
├── presets/       # Animation preset configurations
├── hooks/         # Animation-related React hooks
├── components/    # Animated wrapper components
└── utils/         # Animation utility functions
```

## Adding Animation Presets

Create a new file in `src/presets/`:

### Example: Fade Animation Preset

```typescript
// src/presets/fade.ts
import { withTiming, WithTimingConfig } from 'react-native-reanimated';

export interface FadeConfig extends WithTimingConfig {
  from?: number;
  to?: number;
}

export const fadeInConfig: FadeConfig = {
  from: 0,
  to: 1,
  duration: 300,
};

export const fadeOutConfig: FadeConfig = {
  from: 1,
  to: 0,
  duration: 300,
};

export const fadeIn = (config?: Partial<FadeConfig>) => {
  return withTiming(config?.to ?? 1, {
    duration: config?.duration ?? 300,
    easing: config?.easing,
  });
};

export const fadeOut = (config?: Partial<FadeConfig>) => {
  return withTiming(config?.to ?? 0, {
    duration: config?.duration ?? 300,
    easing: config?.easing,
  });
};
```

Don't forget to export from `src/presets/index.ts`:

```typescript
export * from './fade';
```

## Adding Animation Hooks

Create a new file in `src/hooks/`:

### Example: Fade In Hook

```typescript
// src/hooks/useFadeIn.ts
import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export interface UseFadeInOptions {
  duration?: number;
  delay?: number;
  from?: number;
  to?: number;
}

export const useFadeIn = (options: UseFadeInOptions = {}) => {
  const {
    duration = 300,
    delay = 0,
    from = 0,
    to = 1,
  } = options;

  const opacity = useSharedValue(from);

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(to, { duration });
    }, delay);

    return () => clearTimeout(timeout);
  }, [opacity, to, duration, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return { animatedStyle, opacity };
};
```

Export from `src/hooks/index.ts`:

```typescript
export * from './useFadeIn';
```

## Adding Animated Components

Create a new directory in `src/components/`:

### Example: AnimatedView Component

```typescript
// src/components/AnimatedView/AnimatedView.tsx
import type { ViewStyle } from 'react-native';
import type { BaseComponentProps, WithChildren } from '@my-sdk/shared';

export interface AnimatedViewProps extends BaseComponentProps, WithChildren {
  style?: ViewStyle | ViewStyle[];
  animation?: 'fade' | 'slide' | 'scale';
  duration?: number;
  delay?: number;
}
```

```typescript
// src/components/AnimatedView/AnimatedView.native.tsx
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type { AnimatedViewProps } from './AnimatedView';

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  style,
  animation = 'fade',
  duration = 300,
  delay = 0,
  testID,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, { duration });
      translateY.value = withTiming(0, { duration });
    }, delay);

    return () => clearTimeout(timeout);
  }, [opacity, translateY, duration, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    switch (animation) {
      case 'fade':
        return { opacity: opacity.value };
      case 'slide':
        return {
          opacity: opacity.value,
          transform: [{ translateY: translateY.value }],
        };
      case 'scale':
        return {
          opacity: opacity.value,
          transform: [{ scale: opacity.value }],
        };
      default:
        return {};
    }
  });

  return (
    <Animated.View style={[animatedStyle, style]} testID={testID}>
      {children}
    </Animated.View>
  );
};
```

```typescript
// src/components/AnimatedView/AnimatedView.web.tsx
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import type { AnimatedViewProps } from './AnimatedView';

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  style,
  animation = 'fade',
  duration = 300,
  delay = 0,
  testID,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  const webStyle = {
    opacity: isVisible ? 1 : 0,
    transform: animation === 'slide' ? `translateY(${isVisible ? 0 : 20}px)` : undefined,
    transition: `all ${duration}ms ease-in-out`,
  };

  return (
    <View style={[webStyle, style]} testID={testID}>
      {children}
    </View>
  );
};
```

```typescript
// src/components/AnimatedView/index.ts
export { AnimatedView } from './AnimatedView';
export type { AnimatedViewProps } from './AnimatedView';
```

Export from `src/components/index.ts`:

```typescript
export * from './AnimatedView';
```

## Adding Animation Utilities

Create utility files in `src/utils/`:

### Example: Timing Utilities

```typescript
// src/utils/timing.ts
import { Easing, WithTimingConfig } from 'react-native-reanimated';

export const timingPresets = {
  fast: { duration: 150 },
  normal: { duration: 300 },
  slow: { duration: 500 },
  verySlow: { duration: 1000 },
} as const;

export const easingPresets = {
  linear: Easing.linear,
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),
  bounce: Easing.bounce,
  elastic: Easing.elastic(1),
} as const;

export const createTimingConfig = (
  duration: number = 300,
  easing: typeof Easing.linear = Easing.linear
): WithTimingConfig => ({
  duration,
  easing,
});
```

Export from `src/utils/index.ts`:

```typescript
export * from './timing';
```

## Usage Examples

### Using Animation Presets

```typescript
import { fadeIn, fadeOut } from '@my-sdk/animations';

// In your component
opacity.value = fadeIn({ duration: 500 });
```

### Using Animation Hooks

```typescript
import { useFadeIn } from '@my-sdk/animations';

function MyComponent() {
  const { animatedStyle } = useFadeIn({ duration: 500, delay: 100 });

  return <Animated.View style={animatedStyle}>...</Animated.View>;
}
```

### Using Animated Components

```typescript
import { AnimatedView } from '@my-sdk/animations';

function MyComponent() {
  return (
    <AnimatedView animation="fade" duration={500}>
      <Text>Fade in animation</Text>
    </AnimatedView>
  );
}
```

## Web Support

For web platforms, animations fall back to CSS transitions and animations for optimal performance. The API remains the same across platforms.

## Best Practices

1. **Use presets** - Start with predefined presets for consistency
2. **Optimize performance** - Use `useAnimatedStyle` and run animations on the UI thread
3. **Platform-specific code** - Isolate platform differences in `.native.tsx` and `.web.tsx` files
4. **Test animations** - Ensure animations work smoothly on all target platforms
5. **Accessibility** - Respect user preferences for reduced motion

## License

MIT

