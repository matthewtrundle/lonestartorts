import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body; // Username is actually email

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate against database
    const result = await validateCredentials(username, password);

    if (!result) {
      return NextResponse.json(
        { error: 'Invalid credentials or insufficient permissions' },
        { status: 401 }
      );
    }

    // Create response with auth cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: result.userId,
        role: result.role,
      }
    });

    setAuthCookie(response, result.userId, result.role);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
