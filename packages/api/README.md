# REST API for Social Platform

This is a REST API implementation of the social platform, providing endpoints for users, posts, comments, messages, groups, events, and privacy settings.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
2. Navigate to the `packages/api` directory
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```
4. Create a `.env` file in the root of the `packages/api` directory with the following variables:
   ```
   PORT=4000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=social_platform
   JWT_SECRET=your-secret-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=http://localhost:3000,http://localhost:5173
   ```
5. Start the server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

## API Endpoints

The API follows RESTful conventions and returns responses in JSON format.

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current authenticated user
- `PATCH /api/auth/profile` - Update user profile
- `POST /api/auth/reset-password` - Request password reset
- `POST /api/auth/reset-password-confirm` - Confirm password reset
- `POST /api/auth/logout` - Logout user

### Users

- `GET /api/users/:id` - Get user by ID
- `GET /api/users/search` - Search users

### Posts

- `GET /api/posts/feed` - Get feed
- `GET /api/posts/user/:userId` - Get user posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create text post
- `POST /api/posts/image` - Create image post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post

### Comments

- `GET /api/comments/post/:postId` - Get post comments
- `POST /api/comments/post/:postId` - Add comment to post
- `POST /api/comments/:commentId/reply` - Reply to comment
- `DELETE /api/comments/:id` - Delete comment

### Messages

- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/conversations/:conversationId` - Get messages in conversation
- `POST /api/messages/send` - Send message
- `PATCH /api/messages/conversations/:conversationId/read` - Mark messages as read

### Groups

- `GET /api/groups` - Get all groups
- `GET /api/groups/:id` - Get group by ID
- `POST /api/groups` - Create group
- `GET /api/groups/:id/posts` - Get group posts
- `GET /api/groups/:id/members` - Get group members
- `POST /api/groups/:id/join` - Join group
- `POST /api/groups/:id/leave` - Leave group
- `POST /api/groups/:id/posts` - Post to group
- `POST /api/groups/:id/invite` - Invite user to group

### Events

- `GET /api/events` - Get events with filters
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event
- `PATCH /api/events/:id` - Update event
- `POST /api/events/:id/respond` - Respond to event
- `GET /api/events/:id/attendees` - Get event attendees

### Privacy

- `GET /api/privacy/settings` - Get privacy settings
- `PATCH /api/privacy/settings` - Update privacy settings
- `POST /api/privacy/report` - Report content

## Response Format

All API responses follow a consistent format:

```json
{
  "status": "success",
  "data": {
    // Response data here
  }
}
```

Error responses:

```json
{
  "status": "error",
  "message": "Error message here"
}
```

## Authentication

Most endpoints require authentication. Include the JWT token in the request headers:

```
Authorization: Bearer <token>
```

You can obtain a token by registering or logging in.

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## API Documentation

The API is documented using Swagger/OpenAPI with automatic generation via swagger-autogen. Once the server is running, you can access the interactive documentation at:

```
http://localhost:4000/api-docs
```

This provides a user-friendly interface to:
- Explore available endpoints
- View request/response schemas
- Test API calls directly from the browser
- Understand authentication requirements

You can also access the raw Swagger JSON at:

```
http://localhost:4000/swagger.json
```

### Automatic Documentation Generation

The Swagger documentation is automatically generated from annotations in the route files. To regenerate the documentation after making changes to routes, run:

```
npm run swagger:generate
```

or

```
yarn swagger:generate
```

or

```
pnpm swagger:generate
```

For more details on how the Swagger auto-generation is implemented, see the [Swagger Auto-Generation Documentation](./docs/swagger-autogen-implementation.md).

## Development

This API is a RESTful service for the social platform, providing all required functionality for the web client and other consumers. 