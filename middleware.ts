import { NextRequest, NextResponse } from 'next/server';
import { getUser, verifySession } from './lib/dal';

const PROTECTED_ROUTES = ['/dashboard', '/'];
const PUBLIC_ROUTES = ['/auth/login'];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  try {
    const { user } = await verifySession();

    const myUser = await getUser(user?.id);

    if (isProtectedRoute && !myUser?.success) {
      return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
    }

    if (isPublicRoute && myUser?.success) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  } catch (error) {
    console.error('Middleware Error:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
