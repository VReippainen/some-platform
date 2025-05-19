# Swagger Auto-Generation Implementation

This document explains how we use swagger-autogen to automatically generate Swagger/OpenAPI documentation for our REST API.

## Overview

We've implemented an automated approach to Swagger documentation using `swagger-autogen` instead of the manual JSDoc annotations used previously. This allows for:

- Easier maintenance of API documentation
- Automatic generation of Swagger JSON file
- Interactive API documentation through Swagger UI

## Implementation Details

### 1. Dependencies Added

We installed the following package:

```bash
pnpm add -D swagger-autogen
```

### 2. Configuration

We created a configuration file at `src/config/swagger-autogen.ts` that sets up the Swagger documentation specifications and generates the Swagger JSON file:

```typescript
import swaggerAutogen from 'swagger-autogen';
import path from 'path';
import { version } from '../../package.json';

const doc = {
  // Swagger document configuration
  // ... schemas, security, etc. 
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');
const routeFiles = [
  // Array of route files to process
];

// Generate Swagger documentation
swaggerAutogen({ openapi: '3.0.0' })(outputFile, routeFiles, doc);
```

### 3. Integration with Express

We updated the Express app to use the auto-generated Swagger JSON file at `src/config/swagger.ts`:

```typescript
import path from 'path';
import fs from 'fs';

// Import the auto-generated Swagger JSON file
const swaggerOutputPath = path.resolve(__dirname, './swagger-output.json');

// Check if the file exists, if not provide default empty schema
let swaggerSpec;
try {
  const swaggerJson = fs.readFileSync(swaggerOutputPath, 'utf8');
  swaggerSpec = JSON.parse(swaggerJson);
} catch (error) {
  // Fallback if file doesn't exist
  // ...
}

export default swaggerSpec;
```

### 4. Route Annotations

Instead of using JSDoc style annotations, we now use swagger-autogen's inline comment syntax:

```typescript
router.get('/example', (req, res) => {
  // #swagger.tags = ['Example']
  // #swagger.summary = 'Example endpoint'
  /* #swagger.parameters['param'] = {
    in: 'query',
    description: 'Example parameter',
    required: true,
    type: 'string'
  } */
  /* #swagger.responses[200] = {
    description: 'Success response',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ExampleResponse' }
      }
    }
  } */
  
  // Implementation...
});
```

### 5. NPM Script

We added an npm script in `package.json` to run the Swagger generation:

```json
"scripts": {
  "swagger:generate": "tsx src/config/swagger-autogen.ts"
}
```

## How to Use

### Generating Documentation

Run the following command to generate the Swagger documentation:

```bash
pnpm swagger:generate
```

This will create or update the `swagger-output.json` file based on the current routes.

### Documenting New Endpoints

When creating new endpoints, add swagger-autogen annotations as shown in the examples in `authRoutes.ts` and `userRoutes.ts`.

### Viewing Documentation

The Swagger UI is available at:

```
http://localhost:4000/api-docs
```

And the raw Swagger JSON at:

```
http://localhost:4000/swagger.json
```

## Schema Definitions

Common schemas like `User`, `AuthPayload`, and `Error` are defined in the `swagger-autogen.ts` configuration file under the `components.schemas` section. These can be referenced in endpoint annotations using `$ref: '#/components/schemas/SchemaName'`.

## Benefits Over Previous Implementation

- **Reduced Duplication**: Schemas defined once, referenced everywhere
- **Simpler Syntax**: More concise annotation format
- **Automatic Generation**: No need to manually update the Swagger spec
- **Better Performance**: No parsing of JSDoc comments at runtime 