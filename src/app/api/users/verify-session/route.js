import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get cookies from the request
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = cookieHeader.split(';')
      .map(cookie => cookie.trim().split('='))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
      
    // Try to get the session using getServerSession
    const session = await getServerSession(authOptions);
    
    // Format cookies in a readable way
    const formattedCookies = Object.keys(cookies).map(name => ({
      name,
      value: cookies[name]?.substring(0, 10) + '...' // Show truncated values for security
    }));
    
    // Return detailed diagnostic info
    return NextResponse.json({
      authenticated: !!session,
      sessionFound: !!session,
      cookiesPresent: Object.keys(cookies).length > 0,
      hasCookieHeader: !!request.headers.get('cookie'),
      foundSessionCookie: Object.keys(cookies).some(name => 
        name.includes('next-auth.session-token') || 
        name.includes('__Secure-next-auth.session-token')
      ),
      cookieNames: Object.keys(cookies),
      formattedCookies,
      sessionData: session ? {
        user: {
          name: session.user?.name,
          email: session.user?.email,
          id: session.user?.id,
          image: session.user?.image ? 'present' : 'absent'
        },
        expires: session.expires
      } : null,
      time: new Date().toISOString(),
      message: session 
        ? "Session is valid" 
        : "No valid session found, may need to re-authenticate"
    });
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : null,
      authenticated: false,
      message: "Error verifying session"
    }, { status: 500 });
  }
} 