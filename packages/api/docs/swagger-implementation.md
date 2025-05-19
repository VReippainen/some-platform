# Swagger Documentation Implementation

This document explains how Swagger/OpenAPI documentation has been implemented in the REST API.

## Overview

We've added Swagger documentation to provide interactive API documentation for the REST API. This allows developers to:

- Explore available endpoints
- View request/response schemas
- Test API calls directly from the browser
- Understand authentication requirements

## Implementation Details

### 1. Dependencies Added

We installed the following packages:

```bash
pnpm add swagger-ui-express swagger-jsdoc
pnpm add -D @types/swagger-jsdoc @types/swagger-ui-express
```

### 2. Configuration

We created a configuration file at `src/config/swagger.ts` that sets up the Swagger documentation:

```typescript
import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Platform API',
      version,
      description: 'REST API documentation for the Social Platform',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: [
    path.join(__dirname, '../routes/*.ts'),
    path.join(__dirname, '../db/models/*.ts'),
  ],
};

export default swaggerJsdoc(options);
```

### 3. Integration into Express App

We integrated Swagger UI into the Express app in `src/index.ts`:

```typescript
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

// ...

// Setup Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger JSON endpoint
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
```

### 4. JSDoc Annotations

We added JSDoc annotations to route files to document the API. For example, in `authRoutes.ts`:

```typescript
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         // ... other properties
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     // ... request body, responses, etc.
 */
router.post('/register', async (req, res, next) => {
  // Implementation
});
```

We've documented the following routes:

- Authentication routes:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/auth/me
  - PATCH /api/auth/profile
  - POST /api/auth/reset-password
  - POST /api/auth/reset-password-confirm
  - POST /api/auth/logout

- User routes:
  - GET /api/users/search
  - GET /api/users/:id

## Accessing the Documentation

The Swagger documentation is available at:

```
http://localhost:4000/api-docs
```

And the raw Swagger JSON is available at:

```
http://localhost:4000/swagger.json
```

## Further Development

To complete the documentation, we need to add JSDoc annotations to the remaining route files:

- postRoutes.ts
- commentRoutes.ts
- messageRoutes.ts
- groupRoutes.ts
- eventRoutes.ts
- privacyRoutes.ts

The annotation pattern used in `authRoutes.ts` and `userRoutes.ts` can be followed for consistency.

## Benefits

- **Interactive documentation**: Users can try out API requests directly in the browser
- **Self-documentation**: The API documents itself through code annotations
- **Standards-based**: Uses OpenAPI Specification (OAS) for documentation
- **TypeScript integration**: Takes advantage of TypeScript types for accurate schema documentation 