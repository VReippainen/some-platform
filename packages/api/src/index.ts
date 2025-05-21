import express from 'express';
import http from 'http';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import config from './config/config';
import swaggerSpec from './config/swagger';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import postRoutes from './routes/postRoutes';
import type { ErrorRequestHandler } from 'express';

async function startServer() {
  // Create Express application
  const app = express();
  
  // Configure middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);          
          
        if (config.corsOrigin.includes(origin)) {
          return callback(null, true);
        } else {
          return callback(new Error(`Origin ${origin} not allowed by CORS policy`), false);
        }
      },
      credentials: true,
    })
  );
  
  // Setup Swagger documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // Swagger JSON endpoint
  app.get('/swagger.json', (_, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  const router = express.Router();

  router.use('/auth', authRoutes);
  router.use('/profiles', profileRoutes);
  router.use('/posts', postRoutes);
  app.use('/', router);

  // Add a health check endpoint
  app.get('/health', (_, res) => {
    res.status(200).send('OK');
  });
  
  // Error handling middleware
  app.use(errorHandler as ErrorRequestHandler);
  
  // Create HTTP server
  const httpServer = http.createServer(app);
  
  // Start server
  await new Promise<void>((resolve) => {
    httpServer.listen({ port: config.port }, resolve);
  });
  
  console.log(`🚀 Server ready at http://localhost:${config.port}`);
  console.log(`📚 API Documentation available at http://localhost:${config.port}/api-docs`);
}

// Start the server
startServer().catch((err) => {
  console.error('Error starting server:', err);
}); 