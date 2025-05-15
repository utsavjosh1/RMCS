# Raja Mantri Chor Sipahi

A multiplayer implementation of the classic Indian card game "Raja Mantri Chor Sipahi" with real-time gameplay, chat, and Google authentication.

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

### Setting up Google Authentication

1. Run the setup script to generate a `.env.local` file with a secure NEXTAUTH_SECRET:

```bash
node setup-auth.js
```

2. Go to [Google Cloud Console](https://console.cloud.google.com/) and create a new project
3. Set up OAuth consent screen (External)
4. Navigate to "Credentials" and create OAuth credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local` file

### Running the Development Server

Start both the Next.js app and the Socket.io server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Real-time multiplayer gameplay with Socket.io
- Google Authentication with NextAuth.js
- Room creation and management
- Live chat during gameplay
- Responsive design for mobile and desktop
- Role assignment and game state management

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Socket.io Documentation](https://socket.io/docs/v4)

## Deployment

For deployment, you'll need to:

1. Set up a production-ready database
2. Update the Google OAuth redirect URIs to include your production domain
3. Configure environment variables on your hosting platform

The app can be deployed to Vercel, Netlify, or any other platform supporting Next.js apps.
