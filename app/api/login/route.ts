import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const secretKey = process.env.SESSION_SECRET;
console.log(process.env.SESSION_SECRET);

const encodedKey = new TextEncoder().encode(secretKey);

async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return new SignJWT({ token, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Authenticate user
    const response = await fetch('http://127.0.0.1:8000/api/user/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { errors: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const { access, refresh, user } = await response.json();

    const session = await createSession(access);
    const refreshSession = await createSession(refresh);
    const userId = await createSession(user.id);
    
    const responseHeaders = new Headers();
    responseHeaders.append(
      'Set-Cookie',
      `session=${session}; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Lax`
    );
    responseHeaders.append(
      'Set-Cookie',
      `refreshSession=${refreshSession}; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Lax`
    );
    responseHeaders.append(
      'Set-Cookie',
      `userId=${userId}; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Lax`
    );
    return NextResponse.json(
      { message: 'Login successful' },
      { headers: responseHeaders }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ errors: 'An error occurred' }, { status: 500 });
  }
}
