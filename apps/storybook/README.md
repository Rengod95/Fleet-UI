# Storybook Documentation

Interactive documentation for Fleet UI components and animations.

## Quick Start

```bash
# Start Storybook development server
pnpm --filter storybook-app storybook

# Build static Storybook
pnpm --filter storybook-app build-storybook

# Serve built Storybook
pnpm --filter storybook-app serve-storybook
```

## Viewing on Mobile Devices

### Local Network Access

1. Start the Storybook server:
   ```bash
   pnpm --filter storybook-app storybook
   ```

2. Find your local IP address:
   
   **macOS/Linux:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
   
   **Windows:**
   ```bash
   ipconfig
   ```

3. Open on your mobile device:
   ```
   http://YOUR_IP_ADDRESS:6006
   ```
   
   Example: `http://192.168.1.100:6006`

### Requirements

- Your computer and mobile device must be on the same network
- Your firewall must allow connections on port 6006

## Responsive Viewports

Storybook includes pre-configured viewports for common devices:

### Mobile
- iPhone 12 (390x844)
- iPhone 12 Pro (390x844)
- iPhone 14 Pro Max (430x932)
- Galaxy S21 (360x800)
- Pixel 5 (393x851)

### Tablet
- iPad Mini (768x1024)
- iPad Pro (1024x1366)

### Desktop
- Desktop (1440x900)

Switch between viewports using the viewport toolbar button.

## Adding New Stories

### Component Story

Create a `.stories.tsx` file next to your component:

```typescript
// MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    children: 'My Component',
    variant: 'primary',
  },
};
```

### Documentation Pages

Create `.mdx` files in the `stories/` directory:

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Guides/My Guide" />

# My Guide

Content here...
```

## Deployment

### Build Static Files

```bash
pnpm --filter storybook-app build-storybook
```

This creates a `storybook-static` directory that can be deployed to:
- GitHub Pages
- Vercel
- Netlify
- Any static hosting service

### GitHub Pages Example

```bash
# Build
pnpm --filter storybook-app build-storybook

# Deploy (if using gh-pages package)
npx gh-pages -d apps/storybook/storybook-static
```

## Features

### Interactive Controls

- Change component props in real-time
- Test different states and variants
- Explore component behavior

### Dark Mode

Toggle dark mode using the toolbar to see how components adapt.

### Accessibility Testing

Use the A11y addon to check accessibility issues:
- Color contrast
- ARIA labels
- Keyboard navigation

### Documentation

Auto-generated documentation from:
- TypeScript types
- JSDoc comments
- Component props

## Troubleshooting

### Port Already in Use

If port 6006 is already in use:

```bash
pnpm --filter storybook-app storybook -- -p 6007
```

### Mobile Device Can't Connect

Check:
1. Both devices are on the same network
2. Firewall allows connections on port 6006
3. Using the correct IP address (not 127.0.0.1 or localhost)

### Components Not Loading

Ensure all peer dependencies are installed:

```bash
pnpm install
```

## Best Practices

1. **One Story per Use Case**: Create separate stories for different component states
2. **Use Args**: Make stories interactive with argTypes
3. **Add Documentation**: Include descriptions and examples
4. **Test Responsiveness**: Check stories on multiple viewport sizes
5. **Accessibility**: Ensure components are accessible across platforms

## Links

- [Storybook Documentation](https://storybook.js.org/)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [Component Guidelines](../../packages/components/README.md)

