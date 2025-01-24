import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import newRequest from '@/config/axiosInstance';

export const verifySession = async () => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    const userCookie = cookieStore.get('user')?.value;
    const user = userCookie ? JSON.parse(userCookie) : null;

    if (!session) {
      redirect('/auth/login');
    }

    return { isAuth: true, session, user };
  } catch (error) {
    console.error('Error verifying session:', error);
    return { isAuth: false, session: null, user: null };
  }
};

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  cookieStore.delete('user');
}

export const getUser = cache(async (userId: number | undefined) => {
  try {
    const session = await verifySession();
    if (!session) return null;
    const { data } = await newRequest.get(`user/${userId}/`);
    return data;
  } catch (error: unknown) {
    return error;
  }
});
