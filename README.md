# Some Platform

A social platform with posts, groups, and events functionality.

## Project Overview

This is a monorepo containing the following packages:

- `packages/api`: REST API server
- `packages/web`: React web client

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- PNPM package manager

### Installation

1. Install dependencies:

```bash
pnpm install
```

### Running the Application

Start the API server:

```bash
cd packages/api
pnpm dev
```

Start the web client:

```bash
cd packages/web
pnpm dev
```

## Architecture

The project is structured as a monorepo using PNPM workspaces:

```
some-platform/
├── packages/
│   ├── api/          # REST API server
│   └── web/          # React web client
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

### API Server (packages/api)

The API server is built with:

- Node.js
- REST (Express)
- TypeScript

### Web Client (packages/web)

The web client is built with:

- React
- TypeScript
- Vite
- React Router
- TanStack Query (React Query)
- Tailwind CSS

## Features

- **Authentication**: User registration and login
- **Social Feed**: View, create, like and comment on posts
- **Groups**: Create and join groups, post in groups
- **Events**: Create, RSVP to, and manage events

## Development Guidelines

- Follow proper TypeScript typing conventions
- Organize components and modules logically
- Keep components reusable and maintainable
- Document code with comments where necessary
- Write tests for critical functionality
