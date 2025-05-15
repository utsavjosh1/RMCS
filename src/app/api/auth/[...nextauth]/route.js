import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/db/prisma";

// Determine which cookie name is being used by the latest version of NextAuth
// This is important because some versions use 'next-auth.session-token' and newer ones use 'authjs.session-token'
const tokenName = process.env.NODE_ENV === "production" 
  ? "__Secure-next-auth.session-token" 
  : "next-auth.session-token";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.sub;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Only include accessToken if it exists on the token
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      
      // Use the database user id if it exists
      if (user?.id) {
        session.user.id = user.id;
        
        // Create game stats if they don't exist
        try {
          const stats = await prisma.gameStats.findUnique({
            where: { userId: user.id }
          });
          
          if (!stats) {
            await prisma.gameStats.create({
              data: {
                userId: user.id,
                gamesPlayed: 0,
                gamesWon: 0,
                roomsCreated: 0,
                totalScore: 0
              }
            });
          }
        } catch (error) {
          console.error("Error creating user stats:", error);
        }
      }
      
      return session;
    },
    // Add debug callback to help diagnose authentication issues
    async redirect({ url, baseUrl }) {
      console.log(`NextAuth redirect - URL: ${url}, BaseURL: ${baseUrl}`);
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  // Improve cookie handling
  cookies: {
    sessionToken: {
      name: tokenName,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  // Enable debug in development
  debug: process.env.NODE_ENV !== "production",
  // Add logger to track auth related issues
  logger: {
    error(code, metadata) {
      console.error(`NextAuth Error: ${code}`, metadata);
    },
    warn(code) {
      console.warn(`NextAuth Warning: ${code}`);
    },
    debug(code, metadata) {
      console.log(`NextAuth Debug: ${code}`, metadata);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 