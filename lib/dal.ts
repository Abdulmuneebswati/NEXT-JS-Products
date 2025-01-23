import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import newRequest from '@/config/axiosInstance';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const userId = (await cookies()).get('userId')?.value;

  if (!cookie) {
    redirect('/login');
  }

  return { isAuth: true, session: cookie, userId };
});

export const getUser = cache(async () => {
  try {
    const session = await verifySession();
    if (!session) return null;
    const { data } = await newRequest.get(`user/2/`);
    return data;
  } catch (error: unknown) {
    return error;
  }
});
