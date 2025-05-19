# Some Platform - Web Client

This is the web client for the Some Platform application. It's built with React, TypeScript, Vite, and integrates with the REST API.

## Features

- **Authentication**: User registration, login, and profile management
- **Social Feed**: View, create, like, and comment on posts
- **Groups**: Create and join groups, post in groups
- **Events**: Create, RSVP to, and manage events
- **Real-time updates**: (Coming soon)

## Tech Stack

- **React**: UI framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and development server
- **React Router**: For client-side routing
- **TanStack Query (React Query)**: For data fetching and caching
- **REST API**: API communication using fetch/axios (or your HTTP client)
- **Tailwind CSS**: For styling
- **Heroicons**: For icons

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- PNPM package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

This will start the application in development mode at http://localhost:5173.

### Building for Production

Build the application:

```bash
pnpm build
```

This will create a production-ready build in the `dist` directory.

### Environment Variables

Before running the application, create a `.env` file in the root of the web package with the following variables:

```
VITE_API_URL=http://localhost:4000/api
```

This environment variable points to your REST API server. Make sure the API server is running before starting the web client.

## Project Structure

```
packages/web/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── types/          # TypeScript definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md           # Project documentation
```

## API Integration

The application communicates with the REST API service located in `packages/api`. The API client in the services directory configures the client for making HTTP requests.
