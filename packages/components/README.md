# @fleet-ui/components

Cross-platform UI components for React and React Native, built with React Native Unistyles.

## Installation

```bash
npm install @my-sdk/components
# or
pnpm add @my-sdk/components
```

## Peer Dependencies

Make sure you have these installed:

```bash
npm install react react-native react-native-unistyles
```

## Usage

```typescript
import { Button, Input } from '@my-sdk/components';

function MyApp() {
  return (
    <View>
      <Button onPress={() => console.log('pressed')}>
        Click me
      </Button>
      <Input placeholder="Enter text" />
    </View>
  );
}
```

## Adding New Components

Follow this structure when adding a new component:

### 1. Create Component Directory

```
src/ComponentName/
├── ComponentName.tsx           # Shared types and logic
├── ComponentName.native.tsx    # React Native implementation
├── ComponentName.web.tsx       # Web implementation
├── ComponentName.test.tsx      # Unit tests
├── ComponentName.stories.tsx   # Storybook stories
└── index.ts                    # Exports
```

### 2. Example Component Structure

#### ComponentName.tsx (Shared)

```typescript
import type { ViewStyle } from 'react-native';
import type { BaseComponentProps } from '@my-sdk/shared';

export interface ComponentNameProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  children: React.ReactNode;
}

// Shared logic, utilities, or constants
export const COMPONENT_CONSTANTS = {
  // ...
};
```

#### ComponentName.native.tsx (React Native)

```typescript
import React from 'react';
import { Pressable, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import type { ComponentNameProps } from './ComponentName';

export const ComponentName: React.FC<ComponentNameProps> = ({
  variant = 'primary',
  size = 'md',
  onPress,
  children,
  testID,
}) => {
  const { styles } = useStyles(stylesheet, { variant, size });

  return (
    <Pressable style={styles.container} onPress={onPress} testID={testID}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    variants: {
      variant: {
        primary: { backgroundColor: theme.colors.primary },
        secondary: { backgroundColor: theme.colors.secondary },
      },
      size: {
        sm: { padding: theme.spacing.sm },
        md: { padding: theme.spacing.md },
        lg: { padding: theme.spacing.lg },
      },
    },
  },
  text: {
    color: theme.colors.white,
  },
}));
```

#### ComponentName.web.tsx (Web)

```typescript
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import type { ComponentNameProps } from './ComponentName';

export const ComponentName: React.FC<ComponentNameProps> = ({
  variant = 'primary',
  size = 'md',
  onPress,
  children,
  testID,
}) => {
  const { styles } = useStyles(stylesheet, { variant, size });

  return (
    <button style={styles.container} onClick={onPress} data-testid={testID}>
      {children}
    </button>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    border: 'none',
    cursor: 'pointer',
    variants: {
      variant: {
        primary: { backgroundColor: theme.colors.primary },
        secondary: { backgroundColor: theme.colors.secondary },
      },
      size: {
        sm: { padding: theme.spacing.sm },
        md: { padding: theme.spacing.md },
        lg: { padding: theme.spacing.lg },
      },
    },
  },
}));
```

#### ComponentName.test.tsx (Tests)

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    const { getByText } = render(<ComponentName>Test</ComponentName>);
    expect(getByText('Test')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ComponentName onPress={onPress}>Press me</ComponentName>
    );
    
    fireEvent.press(getByText('Press me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

#### ComponentName.stories.tsx (Storybook)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Primary: Story = {
  args: {
    children: 'Primary Component',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Component',
    variant: 'secondary',
    size: 'md',
  },
};
```

#### index.ts (Exports)

```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

### 3. Update Main Index

Add to `src/index.ts`:

```typescript
export * from './ComponentName';
```

## Platform Resolution

React Native automatically resolves platform-specific files:

- On iOS/Android: `ComponentName.native.tsx` is used
- On Web: `ComponentName.web.tsx` is used
- Shared types/logic: `ComponentName.tsx` is used by both

## Best Practices

1. **Use Unistyles for styling** - Ensures consistency and theme support
2. **Write tests** - Maintain 80%+ coverage
3. **Add Storybook stories** - Document all variants and states
4. **Export types** - Enable type-safe usage
5. **Use tokens** - Import from `@my-sdk/tokens` for colors, spacing, etc.
6. **Platform-specific code** - Keep platform differences minimal and isolated

## Available Components

Currently no components are available. Start adding components following the guide above!

## License

MIT

