import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { AuthService } from '@/lib/services/authService';

export async function middleware(request: NextRequest) {
  // Only run on API routes
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Skip token refresh for auth routes
  if (request.nextUrl.pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  try {
    const token = await getToken({ req: request });
    if (!token?.sub) {
      return NextResponse.next();
    }

    // Ensure tokens are valid before proceeding
    await AuthService.ensureValidTokens(token.sub);

    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/api/:path*',
}; 