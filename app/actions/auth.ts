'use server';
import { LoginFormSchema, FormState } from '@/app/lib/definitions';
import { deleteSession } from '@/lib/dal';
import axios from 'axios';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;
  let redirectPath: string | null = null;
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      username,
      password,
    });
    const { refresh, access, user } = response?.data?.response;
    if (response.status === 200) {
      const cookieStore = await cookies();
      cookieStore.set('session', access, {
        httpOnly: true,
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
      });
      cookieStore.set('refresh_session', refresh, {
        httpOnly: true,
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
      });
      cookieStore.set('user', JSON.stringify(user), {
        httpOnly: true,
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
      });
      redirectPath = '/';
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        errors: {
          username: [error.response?.data?.errors],
          password: [''],
        },
      };
    } else {
      return {
        errors: {
          username: ['An unknown error occurred.'],
          password: [''],
        },
      };
    }
  } finally {
    if (redirectPath !== null) {
      redirect(redirectPath);
    }
  }
}

export async function logout() {
  deleteSession();
  redirect('/auth/login');
}
