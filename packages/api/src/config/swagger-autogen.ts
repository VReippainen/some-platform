import swaggerAutogen from 'swagger-autogen';
import path from 'path';
import { version } from '../../package.json';

const doc = {
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
  // Define tags for API grouping
  tags: [
    {
      name: 'Authentication',
      description: 'Authentication related operations'
    },
    {
      name: 'Profiles',
      description: 'Profile management operations'
    },
    {
      name: 'Posts',
      description: 'Post operations'
    },
    {
      name: 'Feed',
      description: 'Feed operations'
    },
   /* {
      name: 'Posts',
      description: 'Post operations'
    },
    {
      name: 'Comments',
      description: 'Comment operations'
    },
    {
      name: 'Messages',
      description: 'Messaging operations'
    },
    {
      name: 'Groups',
      description: 'Group operations'
    },
    {
      name: 'Events',
      description: 'Event operations'
    },
    {
      name: 'Privacy',
      description: 'Privacy and settings operations'
    }*/
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
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');
const routeFiles = [
  path.resolve(__dirname, '../routes/authRoutes.ts'),
  path.resolve(__dirname, '../routes/profileRoutes.ts'),
  path.resolve(__dirname, '../routes/postRoutes.ts'),
  path.resolve(__dirname, '../routes/feedRoutes.ts'),
  /*path.resolve(__dirname, '../routes/postRoutes.ts'),
  path.resolve(__dirname, '../routes/commentRoutes.ts'),
  path.resolve(__dirname, '../routes/messageRoutes.ts'),
  path.resolve(__dirname, '../routes/groupRoutes.ts'),
  path.resolve(__dirname, '../routes/eventRoutes.ts'),
  path.resolve(__dirname, '../routes/privacyRoutes.ts'),*/
];

// Generate Swagger documentation with additional options
const options = { 
  openapi: '3.0.0',
  autoTags: true, // Automatically assign tags based on file names
  autoQuery: true, // Automatically detect query parameters
  autoBody: true, // Automatically detect body parameters
  autoPath: true // Automatically detect path parameters
};

swaggerAutogen(options)(outputFile, routeFiles, doc); 