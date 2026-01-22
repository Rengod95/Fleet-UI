<p align="center">
  <a href="https://fleet-ui.dev">
    <img src="docs/assets/light-scheme-logo.svg" alt="Fleet UI Logo" width="200" />
  </a>
</p>

<h1 align="center">Fleet UI</h1>

<p align="center">
  <strong>A production-ready, fully animated React Native UI SDK with Unistyles</strong>
</p>

<p align="center">
  <a href="https://github.com/Rengod95/Fleet-UI/stargazers">
    <img src="https://img.shields.io/github/stars/Rengod95/Fleet-UI?style=social" alt="GitHub Stars" />
  </a>
  <a href="https://www.npmjs.com/package/@fleet-ui/cli">
    <img src="https://img.shields.io/npm/v/@fleet-ui/cli?label=%40fleet-ui%2Fcli&color=blue" alt="npm @fleet-ui/cli" />
  </a>
  <a href="https://www.npmjs.com/package/@fleet-ui/core">
    <img src="https://img.shields.io/npm/v/@fleet-ui/core?label=%40fleet-ui%2Fcore&color=blue" alt="npm @fleet-ui/core" />
  </a>
  <a href="https://www.npmjs.com/package/@fleet-ui/components">
    <img src="https://img.shields.io/npm/v/@fleet-ui/components?label=%40fleet-ui%2Fcomponents&color=blue" alt="npm @fleet-ui/components" />
  </a>
  <a href="https://github.com/Rengod95/Fleet-UI/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache%202.0%20%2B%20Commons%20Clause-blue" alt="License" />
  </a>
</p>

<p align="center">
  <a href="https://fleet-ui.dev/en"><strong>📖 Documentation</strong></a> ·
  <a href="https://fleet-ui.dev/en/introduce"><strong>🎯 Introduction</strong></a> ·
  <a href="https://fleet-ui.dev/en/getting-started/install"><strong>🚀 Quick Start</strong></a> ·
  <a href="https://fleet-ui.dev/ko"><strong>🇰🇷 한국어</strong></a>
</p>

---

## What is Fleet UI?

Fleet UI is a UI SDK for React Native that bundles **theming (react-native-unistyles) + animation (react-native-reanimated) + components** into a seamless workflow.

It helps you build production-ready UIs faster while maintaining a consistent design based on **minimalism** and **fluid animations**.

### Core Design Philosophy

- **Universal Minimalism**: A minimal visual language centered on mobile UI/UX that looks natural anywhere.
- **Radical Simplicity**: Design so naturally that users operate it without thinking.

---

## ✨ Features

### Main Features

| Feature | Description |
|---------|-------------|
| **🎨 Trendy Design** | Production-ready design, iOS-inspired universal animations |
| **🎬 Animated** | Smooth animations written with Reanimated only. High performance |
| **🛠️ Customizable** | Easy to customize components for your own purposes |
| **📦 Few Dependencies** | Only need to import configuration file and Unistyles, no provider needed |
| **📋 Copy-Paste** | Copy and paste only what you need |
| **🧩 Modular** | Install only what you need |

### What Fleet UI Provides

Fleet UI isn't just a "component collection"—it also provides the **system those components depend on**.

- **Mobile-first design**: Includes common mobile screen patterns
- **Theme/token system**: Tokens designed in the `raw → primitive → semantic → theme` flow
- **Variants system**: Combine axes like `colorScheme / variant / size ...` for predictable styles
- **Accessibility (A11y) defaults**: role/state/interaction patterns aligned consistently
- **Motion/interaction defaults**: Reanimated-based motion as component default behavior

### Also Supports

- ✅ **Cross-Platform**: Works seamlessly on iOS, Android, and Web
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Themeable**: Built-in light/dark mode support with Unistyles

---

## 📦 Packages

| Package | NPM | Description |
|---------|-----|-------------|
| [`@fleet-ui/cli`](./packages/cli) | [![npm](https://img.shields.io/npm/v/@fleet-ui/cli?color=blue)](https://www.npmjs.com/package/@fleet-ui/cli) | CLI tool for local installation |
| [`@fleet-ui/core`](./packages/core) | [![npm](https://img.shields.io/npm/v/@fleet-ui/core?color=blue)](https://www.npmjs.com/package/@fleet-ui/core) | Theme, tokens, and Unistyles configuration |
| [`@fleet-ui/components`](./packages/components) | [![npm](https://img.shields.io/npm/v/@fleet-ui/components?color=blue)](https://www.npmjs.com/package/@fleet-ui/components) | UI component library |

---

## 🚀 Quick Start

Fleet UI offers **2 installation tracks**:

- **Track A (Local Install)**: Use CLI to bring code into your project, then modify/override it "like your own code" (like shadcn/ui)
- **Track B (Package Install)**: Install via package manager, update through version upgrades

> 💡 **Recommendation**: Track A is easier to manage in most cases. See [Choose a Track](https://fleet-ui.dev/en/getting-started/quick-start) for guidance.

### Track A (CLI-Based Local Install)

```bash
# Initialize Fleet UI core
pnpm dlx @fleet-ui/cli init

# Add components
pnpm dlx @fleet-ui/cli add Button Modal

# Validate configuration
pnpm dlx @fleet-ui/cli doctor
```

Your entry file (`app/_layout.tsx` for Expo Router) will include:

```ts
import '@fleet-ui/local/core/unistyles';
```

### Track B (Package Install)

```bash
# Install packages
pnpm add @fleet-ui/core @fleet-ui/components
```

Add to your entry file:

```ts
import '@fleet-ui/core/unistyles';
```

### Required Dependencies (Both Tracks)

```bash
pnpm add react-native-unistyles react-native-reanimated react-native-gesture-handler react-native-worklets
```

**Optional dependencies** (for specific components):

```bash
# Expo environments
npx expo install expo-blur expo-image expo-linear-gradient react-native-safe-area-context react-native-svg
```

---

## 🎨 Token System

Fleet UI uses a hierarchical token system designed for **consistency**, **ease of change**, and **reduced decision cost**.

```text
Raw Value → Primitive → Semantic → Theme → (Component Consumption)
```

| Layer | Description |
|-------|-------------|
| **Raw Value** | Actual values (colors, numbers) |
| **Primitive** | Rule-based minimal unit tokens (spacing scale, radius scale, color palette) |
| **Semantic** | Purpose/context-based tokens (background/text/border/action/state) |
| **Theme** | Final bundle used at runtime (light/dark) |

### Reference Rules

- ✅ Only reference lower layers (no reverse direction)
- ✅ No circular references
- ✅ Components consume only semantic where possible
- ✅ Minimize layer skipping

Learn more in the [Token Architecture documentation](https://fleet-ui.dev/en/fundamental/token-architecture).

---

## 💻 Usage Example

```tsx
import { Text, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.neutral.content_1,
    padding: theme.spacing[4],
    borderRadius: theme.rounded.md,
  },
  title: {
    ...theme.typography.body1,
    color: theme.colors.neutral.text_1,
    fontWeight: theme.text.fontWeight.semibold,
  },
}));

export function Example() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Fleet UI</Text>
    </View>
  );
}
```

---

## 📚 Documentation

Visit the [official documentation](https://fleet-ui.dev) for comprehensive guides:

| Section | Description |
|---------|-------------|
| [Introduction](https://fleet-ui.dev/en/introduce) | What Fleet UI solves and its design philosophy |
| [Quick Start](https://fleet-ui.dev/en/getting-started/quick-start) | Choose the right track for your team |
| [Installation](https://fleet-ui.dev/en/getting-started/install) | Step-by-step installation guide |
| [Fundamental](https://fleet-ui.dev/en/fundamental) | Understanding the design system structure |
| [Theming](https://fleet-ui.dev/en/fundamental/theming) | Theme registration and style composition |
| [Token Architecture](https://fleet-ui.dev/en/fundamental/token-architecture) | Token hierarchy and file structure |
| [FAQ](https://fleet-ui.dev/en/others/faq) | Common setup and build issues |

---

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

---

## 🏗️ Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/Rengod95/Fleet-UI.git
cd Fleet-UI

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

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the **Apache License 2.0 with Commons Clause**.

✅ **You CAN:**
- Use this SDK to build and ship your mobile applications (commercial or free)
- Modify the code for your own app's needs

🚫 **You CANNOT:**
- **Sell** this SDK itself or a derivative version of it
- Create a commercial UI toolkit, template, or design system product based on this code

For more details, please see the [LICENSE](LICENSE) file.

© [Rengod95](https://github.com/Rengod95)

---

## 🔗 Links

| Resource | Link |
|----------|------|
| **GitHub Repository** | [github.com/Rengod95/Fleet-UI](https://github.com/Rengod95/Fleet-UI) |
| **Documentation** | [fleet-ui.dev](https://fleet-ui.dev) |
| **NPM - @fleet-ui/cli** | [npmjs.com/package/@fleet-ui/cli](https://www.npmjs.com/package/@fleet-ui/cli) |
| **NPM - @fleet-ui/core** | [npmjs.com/package/@fleet-ui/core](https://www.npmjs.com/package/@fleet-ui/core) |
| **NPM - @fleet-ui/components** | [npmjs.com/package/@fleet-ui/components](https://www.npmjs.com/package/@fleet-ui/components) |

---

## 💡 Inspiration

Fleet UI was built following best practices from:

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Native Unistyles](https://www.unistyl.es/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [shadcn/ui](https://ui.shadcn.com/)

---

<p align="center">
  Made with ❤️ for React Native developers
</p>
