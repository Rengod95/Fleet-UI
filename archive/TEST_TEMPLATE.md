# Test Template Guide

This guide provides templates for writing tests in the My UI SDK.

## Component Test Template

```typescript
// ComponentName.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    const { getByText } = render(<ComponentName>Test Content</ComponentName>);
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('handles user interactions', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ComponentName onPress={onPress}>Press me</ComponentName>
    );
    
    fireEvent.press(getByText('Press me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <ComponentName testID="component" style={customStyle}>
        Content
      </ComponentName>
    );
    
    const component = getByTestId('component');
    expect(component.props.style).toContainEqual(customStyle);
  });

  it('renders different variants', () => {
    const { getByTestId, rerender } = render(
      <ComponentName testID="component" variant="primary">
        Primary
      </ComponentName>
    );
    
    expect(getByTestId('component')).toBeTruthy();
    
    rerender(
      <ComponentName testID="component" variant="secondary">
        Secondary
      </ComponentName>
    );
    
    expect(getByTestId('component')).toBeTruthy();
  });

  it('handles disabled state', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ComponentName onPress={onPress} disabled>
        Disabled
      </ComponentName>
    );
    
    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  describe('accessibility', () => {
    it('has correct accessibility label', () => {
      const { getByLabelText } = render(
        <ComponentName accessibilityLabel="Test Label">
          Content
        </ComponentName>
      );
      
      expect(getByLabelText('Test Label')).toBeTruthy();
    });

    it('has correct accessibility role', () => {
      const { getByRole } = render(
        <ComponentName>Content</ComponentName>
      );
      
      expect(getByRole('button')).toBeTruthy();
    });
  });
});
```

## Hook Test Template

```typescript
// useHookName.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useHookName } from './useHookName';

describe('useHookName', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useHookName());
    
    expect(result.current.value).toBe(defaultValue);
  });

  it('updates value correctly', () => {
    const { result } = renderHook(() => useHookName());
    
    act(() => {
      result.current.setValue(newValue);
    });
    
    expect(result.current.value).toBe(newValue);
  });

  it('handles options correctly', () => {
    const { result } = renderHook(() => 
      useHookName({ option1: true, option2: 'value' })
    );
    
    expect(result.current.value).toBeDefined();
  });

  it('cleans up on unmount', () => {
    const { result, unmount } = renderHook(() => useHookName());
    
    unmount();
    
    // Verify cleanup logic
  });
});
```

## Utility Function Test Template

```typescript
// utilityFunction.test.ts
import { utilityFunction } from './utilityFunction';

describe('utilityFunction', () => {
  it('handles valid input', () => {
    const result = utilityFunction(validInput);
    expect(result).toEqual(expectedOutput);
  });

  it('handles edge cases', () => {
    expect(utilityFunction(null)).toBe(expectedDefault);
    expect(utilityFunction(undefined)).toBe(expectedDefault);
    expect(utilityFunction([])).toBe(expectedEmpty);
  });

  it('throws error for invalid input', () => {
    expect(() => utilityFunction(invalidInput)).toThrow();
  });

  it('returns correct types', () => {
    const result = utilityFunction(input);
    expect(typeof result).toBe('expectedType');
  });
});
```

## Animation Test Template

```typescript
// AnimationComponent.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { AnimationComponent } from './AnimationComponent';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

describe('AnimationComponent', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <AnimationComponent testID="animated">
        Content
      </AnimationComponent>
    );
    
    expect(getByTestId('animated')).toBeTruthy();
  });

  it('applies animation on mount', () => {
    const { getByTestId } = render(
      <AnimationComponent testID="animated" animation="fade">
        Content
      </AnimationComponent>
    );
    
    const component = getByTestId('animated');
    expect(component).toBeTruthy();
    // Animation verification depends on implementation
  });

  it('respects duration prop', () => {
    const { getByTestId } = render(
      <AnimationComponent testID="animated" duration={500}>
        Content
      </AnimationComponent>
    );
    
    expect(getByTestId('animated')).toBeTruthy();
  });
});
```

## Best Practices

1. **Test File Naming**: Use `*.test.ts` or `*.test.tsx` suffix
2. **Describe Blocks**: Group related tests
3. **Test Coverage**: Aim for 80%+ coverage
4. **Arrange-Act-Assert**: Structure tests clearly
5. **Mock Dependencies**: Mock external dependencies and platform-specific code
6. **Accessibility**: Include accessibility tests
7. **Edge Cases**: Test boundary conditions and error cases

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @my-sdk/components test

# Run tests in watch mode
pnpm --filter @my-sdk/components test -- --watch

# Run tests with coverage
pnpm test -- --coverage
```

## Coverage Thresholds

The monorepo enforces these coverage thresholds:

- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

## Excluded from Coverage

- `*.stories.tsx` - (removed) Storybook stories
- `*.test.tsx` - Test files themselves
- `index.ts` - Barrel exports

