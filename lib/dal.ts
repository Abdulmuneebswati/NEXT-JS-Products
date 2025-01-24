import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import newRequest from '@/config/axiosInstance';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const userCookie = (await cookies()).get('user')?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;
  if (!cookie) {
    redirect('/login');
  }
  return { isAuth: true, session: cookie, user };
});

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
