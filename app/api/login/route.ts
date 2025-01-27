import 'server-only';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const response = await fetch(`${process.env.BACKEND_URL}/api/user/login/`, {
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

    const data = await response.json();
    return NextResponse.json({ message: 'Login successful', response: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ errors: 'An error occurred' }, { status: 500 });
  }
}
