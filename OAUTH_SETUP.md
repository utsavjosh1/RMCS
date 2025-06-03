# Google OAuth Setup Guide

## 🔧 Environment Configuration

### Backend (.env in rmcs-backend/)
```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID="your-google-client-id-from-console"
GOOGLE_CLIENT_SECRET="your-google-client-secret-from-console"

# URLs (adjust for your environment)
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:8000"

# Required for auth
SESSION_SECRET="your-super-secret-session-key-change-in-production"
JWT_SECRET="your-jwt-secret-key"

# Database
DATABASE_URL="your-database-connection-string"

# Server
PORT=8000
NODE_ENV="development"
```

### Frontend (.env.local in root/)
```env
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

## 🚀 Google Developer Console Setup

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**

2. **Create or select a project**

3. **Enable Google+ API:**
   - APIs & Services → Library
   - Search for "Google+ API" 
   - Click Enable

4. **Create OAuth 2.0 Credentials:**
   - APIs & Services → Credentials
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Name: "RMCS Game Auth"

5. **Configure URLs:**
   - **Authorized JavaScript origins:**
     - `http://localhost:3000` (frontend)
     - `http://localhost:8000` (backend)
   
   - **Authorized redirect URIs:**
     - `http://localhost:8000/api/auth/google/callback`

6. **Copy credentials to your .env file**

## 🧪 Testing the Setup

1. **Check configuration:**
   ```bash
   curl http://localhost:8000/api/auth/debug
   ```

2. **Test OAuth flow:**
   - Visit your frontend
   - Click "Continue with Google"
   - Should redirect to Google login
   - After login, should redirect back to your app

## 🔍 Troubleshooting

### Error: "redirect_uri_mismatch"
- Check that `http://localhost:8000/api/auth/google/callback` is in your Google Console
- Verify BACKEND_URL matches your actual backend URL
- Restart backend after changing environment variables

### Error: "OAuth not configured properly"
- Ensure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set
- Check that credentials are valid (not empty/test values)

### localStorage issues
- The auth system now only updates localStorage AFTER successful OAuth
- Failed logins will automatically clear stale auth data
- Check browser console for detailed error messages

## 🔒 Production Setup

For production, update your environment variables:

```env
NODE_ENV="production"
FRONTEND_URL="https://your-domain.com"
BACKEND_URL="https://api.your-domain.com"
```

And add production URLs to Google Console:
- Authorized origins: `https://your-domain.com`, `https://api.your-domain.com`
- Redirect URI: `https://api.your-domain.com/api/auth/google/callback` 