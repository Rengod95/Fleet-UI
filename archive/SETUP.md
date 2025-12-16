# Setup Guide

Complete setup guide for the Fleet UI monorepo.

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Build all packages
pnpm build

# 3. Prebuild native code (first time only)
pnpm prebuild:clean

# 4. Start playground
pnpm playground

# Then press:
# - i for iOS simulator
# - a for Android emulator
# - w for web browser
```

## Detailed Setup

### 1. Prerequisites

Install these tools:

- **Node.js** >= 18.0.0
  ```bash
  node --version
  ```

- **pnpm** >= 9.0.0
  ```bash
  npm install -g pnpm@9
  pnpm --version
  ```

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>
cd fleet-ui

# Install all dependencies
pnpm install
```

This installs dependencies for all packages in the monorepo.

### 3. Build Packages

```bash
# Build all packages
pnpm build

# Or build specific packages
pnpm --filter @fleet-ui/tokens build
pnpm --filter @fleet-ui/shared build
pnpm --filter @fleet-ui/components build
pnpm --filter @fleet-ui/animations build
```

### 4. Verify Installation

```bash
# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint
```

All checks should pass.

## Development

### Watch Mode

For active development:

```bash
# Watch all packages
pnpm dev

# Watch specific package
pnpm --filter @fleet-ui/components dev
```

### Testing Components

#### Option 1: Playground App

```bash
pnpm --filter playground start

# Then press:
# - i for iOS
# - a for Android
# - w for web
```

#### Option 2: (Removed) Storybook

Storybook support has been removed. Use the Playground app instead.

## Project Structure

```
fleet-ui/
├── packages/              # Published packages
│   ├── core/             # Design tokens, hooks, types, utils
│   ├── components/       # UI components
│   └── animations/       # Animation utilities
├── apps/
│   ├── playground/       # Test app (Expo)
│   └── (removed)         # Storybook removed
├── tools/                # Dev tools
│   └── typescript-config/
└── scripts/              # Build & utility scripts
```

## Package Dependencies

Dependency graph:

```
core (no dependencies)
  ↓
components (depends on: core)
animations (depends on: core)
  ↓
playground (depends on: core, components, animations)
storybook (removed)
```

### Key Technologies

- **React Native**: 0.82.1
- **React**: 19.2
- **TypeScript**: 5.4.5
- **Expo**: ~54.0.23
- **react-native-unistyles**: 3.0.17 (theming)
- **react-native-nitro-modules**: 0.18.1 (required by Unistyles)
- **react-native-edge-to-edge**: 1.0.1 (required by Unistyles)
- **react-native-reanimated**: 4.1.5 (animations)
- **Biome**: 2.3.5 (linting & formatting)
- **Turbo**: 2.6.1 (monorepo build system)

## Theming with Unistyles

Fleet UI uses [`react-native-unistyles` 3.0](https://www.unistyl.es/v3/start/getting-started) for powerful, type-safe theming across all platforms.

### Setup in Your App

1. **Install dependencies**:
```bash
# Core dependencies (required)
pnpm add react-native-unistyles react-native-nitro-modules react-native-edge-to-edge

# Animation support (recommended)
pnpm add react-native-reanimated react-native-gesture-handler
```

> ⚠️ **Important**: Always use a fixed version of `react-native-nitro-modules` to avoid unexpected behaviors.

2. **Configure Babel** in your `babel.config.js`:
```js
module.exports = function (api) {
  api.cache(true);
  
  return {
    presets: ['babel-preset-expo'], // or 'module:@react-native/babel-preset'
    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          // Root folder of your application
          root: 'src' // or 'app' for Expo Router
        }
      ],
      // Note: react-native-reanimated/plugin must be listed last
      'react-native-reanimated/plugin'
    ]
  };
};
```

3. **Initialize theming** in your app entry point:
```tsx
// app/_layout.tsx or App.tsx
import '@fleet-ui/core/unistyles';

export default function App() {
  // Your app code
}
```

4. **Use themed styles** in components:
```tsx
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

function MyComponent() {
  return <View style={styles.container}>
    <Text style={styles.title}>Hello Fleet UI!</Text>
  </View>;
}

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.bg['1'],
    padding: theme.space.md,
    borderRadius: theme.borderRadius.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight['600'],
    color: theme.colors.text['1'],
  }
}));
```

### Platform-Specific Setup

#### Expo (Playground)
```bash
# First time setup or after adding native dependencies
pnpm prebuild:clean

# Or without cleaning (faster)
pnpm prebuild
```

#### Bare React Native
```bash
# iOS
cd ios && pod install && cd ..

# Android
cd android && ./gradlew clean && cd ..
```

### Available Design Tokens

- **Colors**: Light/Dark themes with semantic colors (accent, success, warning, info, error)
- **Spacing**: `_3xs` to `_5xl` (2px to 40px)
- **Typography**: Font sizes, weights, line heights, letter spacing
- **Border Radius**: `_2xs` to `full` (4px to 999px)
- **Breakpoints**: Responsive design support (xs, sm, md, lg, xl, _2xl)

### Theme Demo

Visit the Theme Demo in the playground app to see all design tokens in action:
```bash
pnpm --filter playground start
# Navigate to "🎨 Theme Demo"
```

## Common Commands

### Development

```bash
pnpm dev                 # Watch all packages
pnpm test               # Run all tests
pnpm test -- --watch    # Watch mode tests
pnpm typecheck          # Type check
pnpm lint               # Lint code
pnpm lint:fix           # Auto-fix linting issues
pnpm format             # Check formatting
pnpm format:fix         # Auto-fix formatting
pnpm build              # Build all packages
```

### Playground Commands (from root)

```bash
pnpm playground         # Start Expo dev server
pnpm playground:ios     # Run on iOS simulator
pnpm playground:android # Run on Android emulator
pnpm playground:web     # Run on web browser
pnpm prebuild           # Generate native code
pnpm prebuild:clean     # Clean & regenerate native code
```

### Package-Specific

```bash
# Format: pnpm --filter <package-name> <command>

pnpm --filter @fleet-ui/core dev
pnpm --filter @fleet-ui/core test
pnpm --filter @fleet-ui/components dev
pnpm --filter @fleet-ui/components build
pnpm --filter @fleet-ui/animations dev
```

### Apps

```bash
# Playground (shorthand from root)
pnpm playground         # Start dev server
pnpm playground:ios     # iOS
pnpm playground:android # Android
pnpm playground:web     # Web

# Or using filter
pnpm --filter playground start
pnpm --filter playground ios
pnpm --filter playground android
pnpm --filter playground web

# Storybook
pnpm --filter storybook-app storybook
pnpm --filter storybook-app build-storybook
```

### Versioning

```bash
pnpm changeset           # Add changeset
pnpm changeset version   # Update versions
pnpm release            # Publish packages
```

## Troubleshooting

### "Cannot find module" or dependency issues

```bash
# Method 1: Use the clean install script (recommended)
pnpm clean:all

# Method 2: Manual cleanup
pnpm clean:modules
pnpm install
pnpm build

# Method 3: Complete cleanup (including lock file)
rm -rf node_modules packages/*/node_modules apps/*/node_modules tools/*/node_modules
rm -rf pnpm-lock.yaml
pnpm install
pnpm build
```

### "Type errors" or "Module not found"

```bash
# Rebuild packages in correct order
pnpm --filter @fleet-ui/core build
pnpm --filter @fleet-ui/components build
pnpm --filter @fleet-ui/animations build
```

### "Metro bundler issues"

```bash
# Clear Metro cache and restart
rm -rf apps/playground/.expo
rm -rf apps/playground/node_modules/.cache
pnpm --filter playground start --clear
```

### "Turborepo cache issues"

```bash
# Clear Turbo cache and force rebuild
rm -rf .turbo
rm -rf node_modules/.cache
pnpm build --force
```

### "Unistyles not working" or theme not applied

```bash
# Make sure unistyles is imported in app entry point
# Check apps/playground/app/_layout.tsx for:
# import '@fleet-ui/core/unistyles';

# Rebuild and restart
pnpm build
pnpm --filter playground start --clear
```

### iOS build issues

```bash
# Clean iOS build
cd apps/playground/ios
pod deintegrate
pod install
cd ../../..
pnpm --filter playground ios
```

### Android build issues

```bash
# Clean Android build
cd apps/playground/android
./gradlew clean
cd ../../..
pnpm --filter playground android
```

## IDE Setup

### VS Code

Recommended extensions:

- **Biome** (biomejs.biome) - Fast linter & formatter
- **TypeScript and JavaScript Language Features** (built-in)
- **React Native Tools** (msjsdiag.vscode-react-native)
- **Expo Tools** (expo.vscode-expo-tools)

Settings (`.vscode/settings.json`):

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome"
  }
}
```

## Environment Variables

No environment variables are required for local development.

For production/deployment, you may need:

```bash
# .env (not tracked in git)
NPM_TOKEN=your-npm-token
GITHUB_TOKEN=your-github-token
```

## Next Steps

1. **Read documentation**
   - [README.md](./README.md) - Project overview
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
   - [BUILD_GUIDE.md](./BUILD_GUIDE.md) - Build system details

2. **Explore packages**
   - [Core](./packages/core/README.md) - Design tokens & theming
   - [Components](./packages/components/README.md) - UI components
   - [Animations](./packages/animations/README.md) - Animation utilities

3. **Try the playground**
   ```bash
   pnpm --filter playground start
   ```
   - Explore existing components
   - Test the Theme Demo
   - Try animations

4. **Start developing**
   - Add a new component to `packages/components/`
   - Create an animation preset in `packages/animations/`
   - Extend design tokens in `packages/core/src/tokens/`
   - Improve documentation

## Getting Help

- 📖 [Documentation](./README.md)
- 💬 [Discussions](#)
- 🐛 [Issues](#)
- 💼 [Contributing](./CONTRIBUTING.md)

## Summary

You're all set! The Fleet UI monorepo is ready for development. 

**Quick recap:**
- ✅ Monorepo with Turborepo for fast builds
- ✅ Type-safe theming with Unistyles
- ✅ React Native 0.82 + React 19
- ✅ Expo for easy testing
- ✅ Biome for lightning-fast linting & formatting

Start by exploring the playground app or adding a new component. Happy coding! 🚀

