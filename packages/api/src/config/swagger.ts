import path from 'path';
import fs from 'fs';

// Define type for Swagger spec
export interface SwaggerSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
    [key: string]: unknown;
  };
  paths: Record<string, unknown>;
  components?: Record<string, unknown>;
  security?: Array<Record<string, unknown>>;
  servers?: Array<{url: string; description?: string}>;
  [key: string]: unknown;
}

// Import the auto-generated Swagger JSON file
const swaggerOutputPath = path.resolve(__dirname, './swagger-output.json');

// Check if the file exists, if not provide a default empty schema
let swaggerSpec: SwaggerSpec;
try {
  const swaggerJson = fs.readFileSync(swaggerOutputPath, 'utf8');
  swaggerSpec = JSON.parse(swaggerJson);
} catch (error) {
  console.error('Error loading Swagger JSON file:', error);
  // Provide default empty schema if file doesn't exist
  swaggerSpec = {
    openapi: '3.0.0',
    info: {
      title: 'Social Platform API',
      version: '0.1.0',
      description: 'REST API documentation for the Social Platform',
    },
    paths: {},
  };
}

export default swaggerSpec; 