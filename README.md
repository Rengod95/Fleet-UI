# Fleet UI

A production-ready, fully animated React native UI Components library with Unistyles.

## 🎯 MAIN Features

- ✅ **Trendy Designr** : Production Ready Design, IOS Inspired Universable Animations.
- ✅ **Animated**: Smooth animations written by reanimated only. high perfromance.
- ✅ **Customizable**: Easy to customizing compoent by your own purposes.
- ✅ **Few Dependencies**: only need to import configruation file and Unistyles, no provider needed.
- ✅ **Copy-Paste**: copy, paste only what you need
- ✅ **Modular**: Install only what you need


## 🎯 Also Support

- ✅ **Cross-Platform**: Works seamlessly on iOS, Android, and Web
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Themeable**: Built-in light/dark mode support with Unistyles

## 📦 Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`@fleet-ui/components`](./packages/components) | 0.0.1 | UI component library |
| [`@fleet-ui/tokens`](./packages/tokens) | 0.0.1 | Design System bases, tokens (colors, spacing, typography) |
| [`@fleet-ui/shared`](./packages/shared) | 0.0.1 | Shared utilities and types |

## 🚀 Quick Start

### Track A (Local Install via CLI)

This track copies Fleet UI code into your project so you can freely modify it.

```bash
# Initialize local Fleet UI core under ./fleet-ui/core
pnpm dlx @fleet-ui/cli init

# Add components locally under ./fleet-ui/components
pnpm dlx @fleet-ui/cli add Button Modal

# Validate configuration (alias, entry import, dependencies)
pnpm dlx @fleet-ui/cli doctor
```

Your entry file (Expo Router: `app/_layout.tsx`) will be patched to include:

```ts
import '@fleet-ui/local/core/unistyles';
```

Required dependencies (must be installed in your app):

```bash
pnpm add react-native-unistyles react-native-reanimated react-native-gesture-handler react-native-worklets expo-blur expo-image expo-linear-gradient react-native-safe-area-context react-native-svg
```

### Installation

```bash
# Install Fleet UI packages
pnpm add @fleet-ui/core @fleet-ui/components @fleet-ui/animations

# Install required peer dependencies
pnpm add react-native-unistyles react-native-nitro-modules react-native-edge-to-edge

# Install optional dependencies (for animations)
pnpm add react-native-reanimated react-native-gesture-handler
```

> ⚠️ **Important**: Always use a fixed version of `react-native-nitro-modules` to avoid unexpected behaviors.

### Usage

```typescript
import { Button, Input } from '@fleet-ui/components';
import { useFadeIn } from '@fleet-ui/animations';
import { space, borderRadius } from '@fleet-ui/tokens';

function MyApp() {
  const { animatedStyle } = useFadeIn({ duration: 500 });

  return (
    <View style={{ padding: space.lg }}>
      <Animated.View style={animatedStyle}>
        <Button variant="primary" onPress={() => console.log('Pressed!')}>
          Click Me
        </Button>
        <Input placeholder="Enter your name" />
      </Animated.View>
    </View>
  );
}
```

## 📚 Documentation

- **[Component Guide](./packages/components/README.md)** - How to use and add components
- **[Animation Guide](./packages/animations/README.md)** - Animation presets and hooks
- **[Design Tokens](./packages/tokens/README.md)** - Design system tokens
- **[Build Guide](./BUILD_GUIDE.md)** - Building and publishing packages
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute

## 🎮 Playground

Test components in a real React Native environment:

```bash
# Start the playground
pnpm --filter playground start

# Run on iOS
pnpm --filter playground ios

# Run on Android
pnpm --filter playground android

# Run on Web
pnpm --filter playground web
```

## 🏗️ Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/fleet-ui.git
cd fleet-ui

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Development Workflow

```bash
# Watch mode for all packages
pnpm dev

# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint
```

### Adding a New Component

See [Component Guide](./packages/components/README.md#adding-new-components) for detailed instructions.

Quick overview:

1. Create component directory in `packages/components/src/`
2. Add platform-specific implementations (`.native.tsx` and `.web.tsx`)
3. Write tests (`.test.tsx`)
4. Export from `index.ts`

### Adding a New Animation

See [Animation Guide](./packages/animations/README.md#adding-animation-presets) for detailed instructions.

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test --coverage

# Run tests for specific package
pnpm --filter @fleet-ui/components test
```

## 📦 Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @fleet-ui/components build

# Clean build artifacts
pnpm turbo clean
```

## 🚢 Publishing

This project uses [Changesets](https://github.com/changesets/changesets) for version management.

### Adding Changes

```bash
# Add a changeset
pnpm changeset

# Follow the prompts to:
# 1. Select affected packages
# 2. Choose version bump type
# 3. Describe the changes
```

### Publishing

```bash
# Update versions
pnpm changeset version

# Publish to npm
pnpm release
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Code of Conduct

This project follows a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## 📄 License

MIT © [Your Name/Organization]

## 🔗 Links

- [GitHub Repository](#)
- [NPM Packages](#)
- [Documentation](#)
- [Issue Tracker](#)

## 💡 Inspiration

This SDK was built following best practices from:

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Native Unistyles](https://reactnativeunistyles.vercel.app/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

## 🙏 Acknowledgements

Thanks to all contributors who have helped build this SDK!

## 📊 Project Structure

```
fleet-ui/
├── packages/
│   ├── components/      # UI components
│   ├── animations/      # Animation utilities
│   ├── tokens/          # Design tokens
│   └── shared/          # Shared utilities
├── apps/
│   ├── playground/      # React Native test app
├── tools/
│   ├── typescript-config/
│   └── eslint-config/
└── .github/
    └── workflows/       # CI/CD pipelines
```

## 🎯 Roadmap

- [ ] Add more components (Checkbox, Radio, Switch, etc.)
- [ ] Add more animation presets
- [ ] Improve accessibility
- [ ] Add performance monitoring
- [ ] Create CLI tool for scaffolding
- [ ] Add theme generator
- [ ] Improve documentation

## 🐛 Known Issues

See [GitHub Issues](#) for current known issues.

## 📈 Stats

![Build Status](#)
![Test Coverage](#)
![npm Downloads](#)
![GitHub Stars](#)

## 💬 Community

- [Discord](#)
- [Twitter](#)
- [Discussions](#)

## 🔐 Security

For security vulnerabilities, please email security@yourorg.com instead of using the issue tracker.

