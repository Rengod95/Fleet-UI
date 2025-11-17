/**
 * @fleet-ui/components
 *
 * Cross-platform UI components for React and React Native
 *
 * When adding a new component, follow this structure:
 *
 * 1. Create a directory: src/ComponentName/
 * 2. Add the following files:
 *    - ComponentName.tsx        (shared types and logic)
 *    - ComponentName.native.tsx (React Native implementation)
 *    - ComponentName.web.tsx    (Web implementation)
 *    - ComponentName.test.tsx   (tests)
 *    - ComponentName.stories.tsx (Storybook stories)
 *    - index.ts                 (exports)
 *
 * 3. Export from component's index.ts:
 *    export { ComponentName } from './ComponentName';
 *    export type { ComponentNameProps } from './ComponentName';
 *
 * 4. Export from this file:
 *    export * from './ComponentName';
 */

// Example: When you add a Button component
// export * from './Button';

// Example: When you add an Input component
// export * from './Input';

// Currently no components exported
// Add your components above this line

export * from './Button';