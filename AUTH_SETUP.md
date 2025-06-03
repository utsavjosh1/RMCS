# Authentication Setup Guide

This guide explains how to set up the new backend authentication system for the RMCS game.

## Overview

The authentication system has been refactored to separate frontend and backend:

- **Backend**: Node.js/Express server with Passport.js Google OAuth
- **Frontend**: Next.js app that communicates with the backend API

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd rmcs-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `rmcs-backend/` with:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Frontend Configuration
   CLIENT_URL=http://localhost:3000
   FRONTEND_URL=http://localhost:3000
   
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/rmcs_db"
   
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Session & JWT Configuration
   SESSION_SECRET=your-super-secret-session-key-change-in-production
   JWT_SECRET=your-jwt-secret-key
   NEXTAUTH_SECRET=your-nextauth-secret-for-compatibility
   
   # Redis (optional, for session storage)
   REDIS_URL=redis://localhost:6379
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend will run on http://localhost:5000

### 2. Frontend Setup

1. Navigate to the root directory and create a `.env.local` file:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

   The frontend will run on http://localhost:3000

### 3. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
5. Copy the Client ID and Client Secret to your backend `.env` file

## Architecture

### Backend (rmcs-backend/)

- **Express server** with session-based authentication
- **Passport.js** for Google OAuth strategy
- **JWT tokens** for API authentication
- **Prisma** for database operations
- **Socket.io** for real-time game features

### Frontend (src/)

- **Custom auth hook** (`useAuth`) replacing NextAuth
- **Auth service** for API communication
- **JWT token storage** in localStorage
- **OAuth success/error pages** for handling redirects

## Authentication Flow

1. User clicks "Sign in with Google" on frontend
2. Frontend redirects to backend OAuth endpoint (`/api/auth/google`)
3. Backend handles OAuth with Google using Passport.js
4. On success, backend generates JWT token and redirects to frontend success page
5. Frontend extracts token from URL and stores it
6. Frontend uses JWT token for subsequent API requests

## Guest User Flow

1. User enters name and clicks "Continue as Guest"
2. Frontend calls backend `/api/auth/guest` endpoint
3. Backend creates temporary guest user object
4. Backend returns JWT token for guest user
5. Frontend stores token and treats guest user like authenticated user

## API Endpoints

### Authentication

- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `POST /api/auth/guest` - Create guest user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/token` - Generate new JWT token (requires session)
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/health` - Health check

### Game API (existing)

- `GET /api/rooms` - List public game rooms
- `GET /api/rooms/:roomCode` - Get specific room details

## Security Features

- **CORS protection** with specific origins
- **Rate limiting** (100 requests per 15 minutes per IP)
- **Helmet.js** for security headers
- **Session security** with httpOnly cookies
- **JWT expiration** (7 days for tokens)
- **Input validation** and sanitization

## File Structure

```
rmcs-backend/
├── src/
│   ├── config/
│   │   ├── auth.config.js      # Passport.js configuration
│   │   └── index.js            # Main configuration
│   ├── controllers/
│   │   └── auth.controller.js  # Authentication logic
│   ├── middleware/
│   │   ├── auth.js             # Auth middleware
│   │   ├── errorHandler.js     # Error handling
│   │   └── notFound.handler.js # 404 handler
│   ├── routes/
│   │   └── auth.routes.js      # Auth routes
│   ├── utils/
│   │   ├── ApiError.js         # Custom error class
│   │   └── logger.js           # Winston logger
│   └── index.js                # Main server file

src/
├── hooks/
│   └── use-auth.js             # Custom auth hook
├── lib/
│   └── auth-service.js         # Auth API service
├── app/
│   ├── auth/
│   │   ├── success/page.js     # OAuth success page
│   │   └── error/page.js       # OAuth error page
│   └── login/page.js           # Login page
└── components/
    ├── auth-modal.js           # Auth modal component
    └── providers.js            # App providers
```

## Testing the Setup

1. Start both backend and frontend servers
2. Navigate to http://localhost:3000/login
3. Try Google authentication (requires OAuth setup)
4. Try guest user creation
5. Check browser dev tools for API calls
6. Verify JWT tokens are stored in localStorage

## Troubleshooting

### Backend won't start
- Check that all environment variables are set
- Ensure database is running and accessible
- Check for port conflicts (default: 5000)

### Google OAuth not working
- Verify OAuth credentials in Google Cloud Console
- Check redirect URI matches exactly
- Ensure Google+ API is enabled

### Frontend auth not working
- Check `NEXT_PUBLIC_BACKEND_URL` environment variable
- Verify backend is running and accessible
- Check browser console for error messages

### CORS errors
- Ensure `CLIENT_URL` in backend matches frontend URL
- Check that credentials are included in requests

## Next Steps

1. **Database Migration**: Set up Prisma with your database
2. **Session Storage**: Configure Redis for production session storage
3. **Environment Secrets**: Use proper secret management for production
4. **Socket.io Migration**: Move game logic from frontend to backend
5. **Production Deployment**: Configure for production environment

## Migration from NextAuth

The following files have been replaced or updated:

- ❌ `src/app/api/auth/[...nextauth]/route.js` - Removed NextAuth API route
- ✅ `src/hooks/use-auth.js` - New custom auth hook
- ✅ `src/lib/auth-service.js` - New auth service
- ✅ `src/components/providers.js` - Updated to use new auth provider
- ✅ `src/app/login/page.js` - Updated to use new auth system
- ✅ `src/components/auth-modal.js` - Updated to use new auth system

Old NextAuth-related dependencies can be removed from `package.json` once migration is complete. 