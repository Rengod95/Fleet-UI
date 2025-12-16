# Contributing to Fleet UI

Thank you for your interest in contributing! This guide will help you get started.

## 🎯 Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🎨 Add components
- ✨ Add animations
- 🧪 Write tests
- 🔧 Fix issues

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0
- Git

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/fleet-ui.git
   cd fleet-ui
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original/fleet-ui.git
   ```
4. Install dependencies:
   ```bash
   pnpm install
   ```
5. Build packages:
   ```bash
   pnpm build
   ```

## 🌳 Branch Naming

Use descriptive branch names:

- `feat/component-name` - New features
- `fix/issue-description` - Bug fixes
- `docs/what-changed` - Documentation updates
- `refactor/what-changed` - Code refactoring
- `test/what-added` - Test additions

## 📝 Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance

### Examples

```
feat(components): add Button component

- Added Button with primary/secondary variants
- Added accessibility support
- Added tests and stories

Closes #123
```

```
fix(animations): fix fade animation timing

The fade animation was completing too quickly.
Adjusted default duration to 300ms.
```

## 🎨 Adding a Component

### 1. Create Component Structure

```
packages/components/src/YourComponent/
├── YourComponent.tsx        # Shared types and logic
├── YourComponent.native.tsx # React Native implementation
├── YourComponent.web.tsx    # Web implementation
├── YourComponent.test.tsx   # Tests
└── index.ts                 # Exports
```

### 2. Implement the Component

#### Shared Types (YourComponent.tsx)

```typescript
import type { BaseComponentProps } from '@fleet-ui/shared';

export interface YourComponentProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
}
```

#### Native Implementation (YourComponent.native.tsx)

```typescript
import React from 'react';
import { Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import type { YourComponentProps } from './YourComponent';

export const YourComponent: React.FC<YourComponentProps> = ({
  variant = 'primary',
  size = 'md',
  onPress,
  testID,
}) => {
  const { styles } = useStyles(stylesheet, { variant, size });

  return (
    <Pressable style={styles.container} onPress={onPress} testID={testID}>
      {/* content */}
    </Pressable>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    // styles
  },
}));
```

#### Web Implementation (YourComponent.web.tsx)

```typescript
// Similar structure, but for web
```

### 3. Write Tests

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <YourComponent testID="component">Content</YourComponent>
    );
    expect(getByTestId('component')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <YourComponent testID="component" onPress={onPress} />
    );
    
    fireEvent.press(getByTestId('component'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### 4. Add Playground examples

Add a demo screen under `apps/playground/app/components/` that showcases all public props and variants.

### 5. Export Component

Add to `packages/components/src/index.ts`:

```typescript
export * from './YourComponent';
```

### 6. Test in Playground

Add a test screen in the playground app to verify the component works correctly.

## ✨ Adding an Animation

### 1. Create Animation Files

```
packages/animations/src/presets/yourAnimation.ts
packages/animations/src/hooks/useYourAnimation.ts
```

### 2. Implement Preset

```typescript
// presets/yourAnimation.ts
import { withTiming, WithTimingConfig } from 'react-native-reanimated';

export const yourAnimationIn = (duration: number = 300) => {
  return withTiming(1, { duration });
};
```

### 3. Create Hook

```typescript
// hooks/useYourAnimation.ts
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

export const useYourAnimation = (options = {}) => {
  const value = useSharedValue(0);

  useEffect(() => {
    value.value = withTiming(1, { duration: options.duration || 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: value.value,
  }));

  return { animatedStyle, value };
};
```

### 4. Add Tests and Stories

Similar to components.

## 🧪 Testing

### Running Tests

```bash
# All tests
pnpm test

# Specific package
pnpm --filter @fleet-ui/components test

# Watch mode
pnpm --filter @fleet-ui/components test -- --watch

# Coverage
pnpm test --coverage
```

### Test Guidelines

- Write tests for all new code
- Maintain 80%+ coverage
- Test both happy and error paths
- Include accessibility tests
- Mock external dependencies

## 📖 Documentation

### Component Documentation

Every component should have:

1. **TypeScript types** with JSDoc comments
2. **README section** in the package
3. **Playground examples** with variants/props coverage
4. **Usage examples** in code comments

### Adding to README

Update package README with:
- Component description
- Props table
- Usage examples
- Platform notes (if any)

## 🔄 Pull Request Process

### Before Submitting

1. **Update your branch**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run checks**:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm build
   ```

3. **Add changeset**:
   ```bash
   pnpm changeset
   ```

4. **Test in playground**:
   ```bash
   pnpm --filter playground start
   ```

### Submit PR

1. Push your branch to your fork
2. Create a Pull Request on GitHub
3. Fill out the PR template
4. Link related issues

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] Tests pass locally
- [ ] Tested in playground

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added
- [ ] Documentation updated
- [ ] Changeset added
- [ ] No breaking changes (or documented)
```

### Review Process

1. Maintainers will review your PR
2. Address any feedback
3. Once approved, it will be merged

## 📏 Code Style

### TypeScript

- Use TypeScript for all code
- Export types for public APIs
- Use strict mode
- Prefer interfaces over types for objects

### React/React Native

- Use functional components
- Use hooks (no class components)
- Use proper prop types
- Follow React Native best practices

### Naming Conventions

- **Components**: PascalCase (`Button`, `MyComponent`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

### File Organization

```typescript
// 1. Imports (grouped)
import React from 'react';
import { View } from 'react-native';

import type { MyType } from './types';
import { myUtil } from './utils';

// 2. Types
export interface MyProps {
  // ...
}

// 3. Component
export const MyComponent: React.FC<MyProps> = (props) => {
  // ...
};

// 4. Styles (if any)
const styles = StyleSheet.create({
  // ...
});
```

## 🚫 What Not to Do

- ❌ Don't commit directly to main
- ❌ Don't skip tests
- ❌ Don't ignore linter warnings
- ❌ Don't add large dependencies without discussion
- ❌ Don't make breaking changes without RFC
- ❌ Don't copy code without attribution

## 💬 Getting Help

- 💭 [GitHub Discussions](#) - Ask questions
- 🐛 [GitHub Issues](#) - Report bugs
- 💬 [Discord](#) - Chat with community

## 🎖️ Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in documentation

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute!

