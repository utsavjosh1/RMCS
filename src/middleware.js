import { NextResponse } from "next/server";

export async function middleware(req) {
  try {
    // Log cookies for debugging
    
    // Detect which cookie name is being used
    const hasNextAuthToken = req.cookies.has('next-auth.session-token');
    const hasAuthJsToken = req.cookies.has('authjs.session-token');
    
    
    // Direct approach - check if any auth cookie exists and consider user authenticated
    const isAuthenticated = hasNextAuthToken || hasAuthJsToken;
    
    // Try to extract user info directly from cookies for more detailed logging
    let userInfo = null;
    if (hasAuthJsToken) {
      try {
        const authJsTokenValue = req.cookies.get('authjs.session-token')?.value;
        userInfo = { source: 'authjs.session-token' };
      } catch (e) {
        console.error('Middleware: Failed to process authjs token:', e.message);
      }
    }
    else if (hasNextAuthToken) {
      try {
        const nextAuthTokenValue = req.cookies.get('next-auth.session-token')?.value;
          userInfo = { source: 'next-auth.session-token' };
      } catch (e) {
        console.error('Middleware: Failed to process next-auth token:', e.message);
      }
    }
    
    const { pathname, searchParams } = req.nextUrl;
    
    
    if (userInfo) {
      console.log(`Middleware: User info source: ${userInfo.source}`);
    } else {
      console.log('Middleware: No user information found');
    }
    
    // Manage routes that require authentication
    const protectedRoutes = [
      "/profile", 
      "/stats", 
      "/settings",
      "/my-games"
    ];
    
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    // Special case for the debug page - always accessible
    if (pathname === "/debug") {
      return NextResponse.next();
    }
    
    // If the user is not signed in and is trying to access a protected route, redirect to login
    if (!isAuthenticated && isProtectedRoute) {
      const loginUrl = new URL("/login", req.url);
      // Store the page they tried to visit to redirect after login
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // If user is signed in and tries to access login page, redirect to home or callback
    if (isAuthenticated && pathname === "/login") {
      // If they were trying to access a specific page, redirect there
      const callbackUrl = searchParams.get("callbackUrl");
      if (callbackUrl && callbackUrl.startsWith('/')) {
        return NextResponse.redirect(new URL(callbackUrl, req.url));
      }
      // Otherwise go to home
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error(`Middleware Error: ${error.message}`, error);
    // Continue the request even if middleware fails
    return NextResponse.next();
  }
}

// Match all paths that we want to protect
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/auth/... (NextAuth.js API routes)
     * 2. /api/socket/... (Socket.io API routes)
     * 3. /_next/... (Next.js static files)
     * 4. /static/... (Static files)
     * 5. /favicon.ico, /robots.txt (public files)
     */
    '/((?!api/auth|api/socket|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
}; 