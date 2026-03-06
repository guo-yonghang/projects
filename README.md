# Frontend Monorepo Project

This project is a monorepo architecture based on [Vue Vben Admin](https://github.com/vbenjs/vue-vben-admin), using Vue 3, Vite, TypeScript, and Turbo.

## Directory Structure

- `apps/admin-web`: The main admin application (ported from Vben Admin `web-ele`).
- `packages/*`: Shared packages and UI libraries.
- `internal/*`: Internal tooling and configurations.
- `scripts/*`: Build and maintenance scripts.

## Prerequisites

- Node.js >= 18
- pnpm >= 9

## Installation

```bash
# Install dependencies
pnpm install
```

## Development

```bash
# Start the admin-web application
pnpm dev:admin
```

## Build

```bash
# Build the admin-web application
pnpm build:admin
```

## Features

- **Monorepo**: Managed by pnpm workspaces and Turbo.
- **TypeScript**: Full TypeScript support.
- **ESLint & Prettier**: Configured for code quality.
- **Mock Data**: API requests are replaced with static data for standalone development.
