# Changesets

This folder contains changesets - files that describe changes to the packages in this monorepo.

## What is a changeset?

A changeset is a piece of information about changes made in a branch or commit. It holds three key pieces of information:

1. What packages need to be released
2. What version bump (major, minor, or patch) each package needs
3. A summary of the changes made

## How to add a changeset

When you make changes to packages, add a changeset to describe them:

```bash
pnpm changeset
```

This will prompt you to:
1. Select which packages have changed
2. Choose the version bump type (major/minor/patch)
3. Write a summary of the changes

## Version bumps

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features (backwards compatible)
- **Patch** (1.0.0 → 1.0.1): Bug fixes

## Applying changesets

To update package versions and generate changelogs:

```bash
pnpm changeset version
```

This will:
- Update package.json versions
- Update dependencies
- Generate CHANGELOG.md files
- Delete applied changeset files

## Publishing

To publish packages to npm:

```bash
pnpm release
```

This will:
- Build all packages
- Publish to npm
- Create git tags

## Workflow

1. Make changes to packages
2. Add changeset: `pnpm changeset`
3. Commit changeset file
4. When ready to release:
   - Run `pnpm changeset version`
   - Commit version changes
   - Run `pnpm release`

## Example changeset

```md
---
"@my-sdk/components": minor
"@my-sdk/tokens": patch
---

Added new Button component with improved accessibility features.
Fixed color contrast issues in design tokens.
```
