# Playground App

React Native playground app for testing and demonstrating Fleet UI components and animations.

## Features

- ✅ **Expo + Prebuild**: Full control over native code when needed
- ✅ **Expo Router**: File-based routing system
- ✅ **React Native Web**: Run on web, iOS, and Android
- ✅ **Hot Reload**: Fast development experience
- ✅ **Component Testing**: Test all components in real environment

## Quick Start

### Installation

```bash
# From the monorepo root
pnpm install
```

### Running the App

```bash
# Start development server
pnpm --filter playground start

# Run on iOS
pnpm --filter playground ios

# Run on Android
pnpm --filter playground android

# Run on Web
pnpm --filter playground web
```

## Project Structure

```
app/
├── _layout.tsx              # Root layout
├── index.tsx                # Home screen
├── components/              # Components section
│   ├── _layout.tsx         # Components layout
│   ├── index.tsx           # Components list
│   └── [component].tsx     # Dynamic component details
└── animations/              # Animations section
    ├── _layout.tsx         # Animations layout
    ├── index.tsx           # Animations list
    └── [animation].tsx     # Dynamic animation details
```

## Routing

This app uses Expo Router for file-based routing:

### Routes

- `/` - Home screen
- `/components` - Components list
- `/components/button` - Button component details
- `/animations` - Animations list
- `/animations/fade` - Fade animation details

### Adding New Routes

Create a new file in the `app/` directory:

```typescript
// app/new-page.tsx
export default function NewPage() {
  return <View><Text>New Page</Text></View>;
}
```

The route will automatically be available at `/new-page`.

## Using SDK Components

Import components from the SDK packages:

```typescript
import { Button, Input } from '@my-sdk/components';
import { useFadeIn } from '@my-sdk/animations';
import { space, borderRadius } from '@my-sdk/tokens';

function MyScreen() {
  return (
    <View>
      <Button>Click me</Button>
      <Input placeholder="Enter text" />
    </View>
  );
}
```

## Prebuild

Generate native projects when needed:

```bash
# Generate iOS and Android projects
pnpm --filter playground prebuild

# Clean and regenerate
pnpm --filter playground prebuild:clean
```

This creates `ios/` and `android/` directories with native code.

## Development Tips

### Hot Reload

The app supports hot reloading. Changes to:
- Component code in `@my-sdk/components`
- Animation code in `@my-sdk/animations`
- Token values in `@my-sdk/tokens`

Will automatically reflect in the playground without restarting.

### Adding Test Screens

1. Create a new route file in `app/`
2. Import your component
3. Add examples and controls
4. Link from home screen

Example:

```typescript
// app/test-component.tsx
import { View, Text, StyleSheet } from 'react-native';
import { MyComponent } from '@my-sdk/components';

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <MyComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
```

### Debugging

```bash
# Open dev menu
# iOS: Cmd + D
# Android: Cmd + M (Mac) or Ctrl + M (Windows/Linux)

# Enable Debug Mode
# Shake device or use dev menu

# View logs
npx react-native log-ios
npx react-native log-android
```

## Platform-Specific Code

The app automatically resolves platform-specific extensions:

- `Component.native.tsx` - Used on iOS/Android
- `Component.web.tsx` - Used on web
- `Component.tsx` - Shared code

## Environment

The app uses Metro bundler configured to:
- Watch monorepo packages
- Resolve workspace dependencies
- Support React Native Web
- Enable Reanimated plugin

## Building for Production

### iOS

```bash
pnpm --filter playground prebuild
cd apps/playground/ios
xcodebuild -workspace Playground.xcworkspace -scheme Playground archive
```

### Android

```bash
pnpm --filter playground prebuild
cd apps/playground/android
./gradlew assembleRelease
```

### Web

```bash
pnpm --filter playground web --no-dev --minify
```

## Troubleshooting

### Metro Bundler Issues

```bash
# Clear Metro cache
rm -rf apps/playground/.expo
rm -rf apps/playground/node_modules/.cache
```

### Module Resolution Issues

```bash
# Clean and reinstall
rm -rf node_modules apps/playground/node_modules
pnpm install
```

### iOS Build Issues

```bash
cd apps/playground/ios
pod install
cd ../../..
```

### Android Build Issues

```bash
cd apps/playground/android
./gradlew clean
cd ../../..
```

## Links

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://expo.github.io/router/docs/)
- [React Native Documentation](https://reactnative.dev/)

