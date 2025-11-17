# Build Guide

This guide explains how to build and publish packages in the Fleet UI monorepo.

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

## Build System

The monorepo uses:
- **tsup** - Fast TypeScript bundler
- **Turborepo** - Build orchestration and caching
- **Changesets** - Version management and publishing

## Building Packages

### Build All Packages

```bash
pnpm build
```

This runs Turborepo which:
1. Determines the dependency order
2. Builds packages in parallel (when possible)
3. Caches build outputs for speed

### Build Specific Package

```bash
pnpm --filter @fleet-ui/components build
```

### Development Mode

Watch mode for development:

```bash
pnpm dev
```

Or for a specific package:

```bash
pnpm --filter @fleet-ui/components dev
```

## Package Exports

Each package is configured with proper exports for different platforms:

```json
{
  "main": "./dist/index.js",          // CommonJS
  "module": "./dist/index.mjs",       // ES Modules
  "types": "./dist/index.d.ts",       // TypeScript types
  "react-native": "./src/index.ts",   // React Native (source)
  "exports": {
    ".": {
      "react-native": "./src/index.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

This ensures:
- **React Native** gets uncompiled source (Metro handles compilation)
- **Web/Node** gets compiled bundles
- **TypeScript** users get type definitions

## Version Management with Changesets

### Adding Changes

When you make changes to a package:

```bash
pnpm changeset
```

Follow the prompts to:
1. Select affected packages
2. Choose version bump (major/minor/patch)
3. Describe the changes

This creates a changeset file in `.changeset/`.

### Version Bump Rules

- **Major** (1.0.0 → 2.0.0): Breaking changes
  - Removed APIs
  - Changed behavior
  - Renamed exports

- **Minor** (1.0.0 → 1.1.0): New features
  - New components
  - New props (backwards compatible)
  - New utilities

- **Patch** (1.0.0 → 1.0.1): Bug fixes
  - Fix bugs
  - Improve performance
  - Update docs

### Updating Versions

When ready to release:

```bash
pnpm changeset version
```

This will:
- Update package.json versions
- Update interdependencies
- Generate CHANGELOG.md files
- Delete processed changesets

### Publishing to npm

```bash
pnpm release
```

This will:
1. Build all packages
2. Run tests
3. Publish to npm
4. Create git tags

## Build Outputs

Each package builds to a `dist/` directory:

```
packages/components/
├── src/                    # Source code
│   └── index.ts
├── dist/                   # Build output
│   ├── index.js            # CommonJS
│   ├── index.mjs           # ES Modules
│   ├── index.d.ts          # Type definitions
│   └── index.d.ts.map      # Source maps
└── package.json
```

## Cleaning Build Outputs

```bash
# Clean all packages
pnpm turbo clean

# Clean specific package
pnpm --filter @fleet-ui/components clean
```

## Type Checking

```bash
# Check all packages
pnpm typecheck

# Check specific package
pnpm --filter @fleet-ui/components typecheck
```

## Linting

```bash
# Lint all packages
pnpm lint

# Lint specific package
pnpm --filter @fleet-ui/components lint
```

## Testing Before Publishing

Before publishing, ensure everything works:

```bash
# 1. Clean build
pnpm turbo clean
pnpm build

# 2. Run tests
pnpm test

# 3. Type check
pnpm typecheck

# 4. Lint
pnpm lint

# 5. Test in playground
pnpm --filter playground start
```

## Publishing Workflow

### For Maintainers

1. **Make changes** to packages
2. **Add changeset**: `pnpm changeset`
3. **Commit changes** including changeset file
4. **Create PR** and get approval
5. **Merge to main**
6. **Update versions**: `pnpm changeset version`
7. **Commit version bumps**
8. **Publish**: `pnpm release`
9. **Push tags**: `git push --follow-tags`

### For Contributors

1. Make changes to packages
2. Add changeset: `pnpm changeset`
3. Commit changeset file with your changes
4. Create PR

Maintainers will handle versioning and publishing.

## CI/CD

The monorepo includes GitHub Actions workflows:

### On Pull Request
- Lint all packages
- Type check
- Run tests
- Build packages

### On Main Branch
- Run all checks
- Publish if version changed

## Turborepo Cache

Turborepo caches build outputs for speed:

```bash
# Clear Turborepo cache
rm -rf .turbo

# Or use the turbo command
pnpm turbo run build --force
```

## Package Resolution

### In Monorepo

Packages use workspace protocol:

```json
{
  "dependencies": {
    "@fleet-ui/tokens": "workspace:*"
  }
}
```

### After Publishing

Automatically replaced with actual versions:

```json
{
  "dependencies": {
    "@fleet-ui/tokens": "^1.0.0"
  }
}
```

## Troubleshooting

### Build Fails

```bash
# Clean and rebuild
pnpm turbo clean
rm -rf node_modules
pnpm install
pnpm build
```

### Type Errors

```bash
# Rebuild type definitions
pnpm --filter @fleet-ui/tokens build
pnpm --filter @fleet-ui/shared build
pnpm --filter @fleet-ui/components build
```

### Publishing Fails

Check:
1. Are you logged into npm? (`npm whoami`)
2. Do you have publish rights?
3. Are package names available?
4. Is the version unique?

## Best Practices

1. **Always add changesets** for user-facing changes
2. **Test in playground** before publishing
3. **Update documentation** with code changes
4. **Keep dependencies up to date**
5. **Use semantic versioning correctly**

## Links

- [tsup Documentation](https://tsup.egoist.dev/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Changesets Documentation](https://github.com/changesets/changesets)

