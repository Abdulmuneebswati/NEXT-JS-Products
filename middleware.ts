import { NextRequest, NextResponse } from 'next/server';
import { getUser, verifySession } from './lib/dal';

const protectedRoutes = ['/dashboard', '/'];
const publicRoutes = ['/login'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  try {
    const { user } = await verifySession();
    const myUser = await getUser(user?.id);

    if (!myUser?.success && isProtectedRoute) {
      return NextResponse.redirect(new URL('auth/login', req.nextUrl));
    }
    if (
      myUser?.success &&
      isPublicRoute &&
      !req.nextUrl.pathname.startsWith('/')
    ) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  } catch (error) {
    console.error('Error parsing user cookie:', error);
  }
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
