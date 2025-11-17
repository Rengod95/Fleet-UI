# @fleet-ui/core

Core utilities, design tokens, types, hooks, and theming system for Fleet UI.

## Features

- 🎨 **Design Tokens**: Colors, typography, spacing, radius, gradients
- 🌗 **Theming**: Type-safe light/dark themes with `react-native-unistyles`
- 🪝 **Hooks**: React hooks for dimensions, platform detection, etc.
- 🛠️ **Utils**: Platform detection, style utilities
- 📘 **Types**: Common TypeScript types and interfaces
- 📱 **Responsive**: Breakpoint-based responsive design support

## Installation

```bash
# Install core package
pnpm add @fleet-ui/core

# Install required peer dependencies
pnpm add react-native-unistyles react-native-nitro-modules react-native-edge-to-edge

# Install optional dependencies (for animations)
pnpm add react-native-reanimated react-native-gesture-handler
```

> ⚠️ **Important**: Always use a fixed version of `react-native-nitro-modules` to avoid unexpected behaviors. See [compatibility table](https://www.unistyl.es/v3/other/dependencies).

## Quick Start

### 1. Configure Babel

Add the Unistyles Babel plugin to your `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"], // or 'module:@react-native/babel-preset'
    plugins: [
      [
        "react-native-unistyles/plugin",
        {
          root: "src", // or 'app' for Expo Router
        },
      ],
      "react-native-reanimated/plugin", // must be last
    ],
  };
};
```

### 2. Initialize Theming

Import the unistyles configuration in your app's entry point:

```tsx
// app/_layout.tsx or App.tsx
import '@fleet-ui/core/unistyles';

export default function App() {
  return (
    // Your app components
  );
}
```

### 3. Use Themed Styles

```tsx
import { View, Text } from "react-native";
import { StyleSheet } from "react-native-unistyles";

function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Fleet UI!</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.bg["1"],
    padding: theme.space.lg,
    borderRadius: theme.borderRadius.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight["600"],
    color: theme.colors.text["1"],
  },
}));
```

### 4. TypeScript Theme Augmentation

`@fleet-ui/core` exports the canonical Unistyles tokens and automatically augments
`react-native-unistyles` once the package is imported. When creating another
package (for example `@fleet-ui/components`), add a small ambient import file:

```ts
// packages/components/src/global.d.ts
import "@fleet-ui/core";
```

This keeps the `useUnistyles()` theme fully typed across workspaces.
You can also reference the shared helper types directly:

```ts
import type {
  FleetBreakpoints,
  FleetThemes,
  FleetThemeName,
  LightTheme,
  DarkTheme,
} from "@fleet-ui/core";

type ButtonTheme = LightTheme["colors"]["action"]["primary"];
```

> 📦 **SDK Consumers:** install `@fleet-ui/core` and `react-native-unistyles`,
> `import '@fleet-ui/core/unistyles';` once in your app entry, and optionally create
> `global.d.ts` with `import '@fleet-ui/core';` to ensure the module augmentation
> is always part of your TypeScript program.

## Design Tokens

### Colors

```tsx
import {
  lightSchemeColorPalette,
  darkSchemeColorPalette,
} from "@fleet-ui/core";

// Or use via theme
theme.colors.accent["5"]; // Accent color
theme.colors.success["5"]; // Success color
theme.colors.warning["5"]; // Warning color
theme.colors.info["5"]; // Info color
theme.colors.error["5"]; // Error color

theme.colors.bg["1"]; // Background
theme.colors.bd["1"]; // Border
theme.colors.text["1"]; // Text
```

### Spacing

```tsx
import { space } from "@fleet-ui/core";

theme.space._3xs; // 2px
theme.space.xs; // 8px
theme.space.md; // 16px
theme.space.xl; // 24px
theme.space._5xl; // 40px
```

### Typography

```tsx
import {
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} from "@fleet-ui/core";

theme.fontSize.md; // 16px
theme.fontWeight["600"]; // Semi Bold
theme.lineHeight.md; // 22px
theme.letterSpacing.normal; // -0.15
```

### Border Radius

```tsx
import { borderRadius } from "@fleet-ui/core";

theme.borderRadius.sm; // 12px
theme.borderRadius.md; // 16px
theme.borderRadius.full; // 999px
```

## Hooks

```tsx
import { usePlatform, useDimensions } from "@fleet-ui/core";

function MyComponent() {
  const platform = usePlatform();
  const { width, height } = useDimensions();

  return (
    <Text>
      Platform: {platform}, Width: {width}
    </Text>
  );
}
```

## Utilities

```tsx
import { getPlatform, mergeStyles } from "@fleet-ui/core";

const platform = getPlatform(); // 'ios' | 'android' | 'web'
const merged = mergeStyles(style1, style2);
```

## Responsive Design

```tsx
const styles = StyleSheet.create((theme) => ({
  container: {
    padding: {
      xs: theme.space.sm, // Mobile
      md: theme.space.lg, // Tablet
      xl: theme.space._2xl, // Desktop
    },
  },
}));
```

## Theme Switching

```tsx
import { useUnistyles } from "react-native-unistyles";

function ThemeToggle() {
  const { theme, setTheme } = useUnistyles();

  const toggleTheme = () => {
    setTheme(theme.name === "light" ? "dark" : "light");
  };

  return <Button onPress={toggleTheme} title="Toggle Theme" />;
}
```

## Documentation

- [Theming Guide](./THEMING.md) - Complete theming documentation
- [Design Tokens](./src/tokens/) - All available design tokens

## TypeScript Support

Full TypeScript support with auto-completion and type checking for all design tokens and theme properties.

## License

MIT
