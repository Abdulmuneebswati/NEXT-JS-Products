import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';
import newRequest from '@/config/axiosInstance';
// import { redirect } from 'next/navigation';

export const verifySession = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  
  const userCookie = cookieStore.get('user')?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  if (!session && !user?.id) {
    return { isAuth: false, user: null };
  }

  return { isAuth: true, user };
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
