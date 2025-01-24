

import LoginForm from '@/components/LoginForm';
import React from 'react';

export default function LoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white shadow-md rounded-lg'>
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>
          Login
        </h1>
        <LoginForm />
        <div className='mt-4 text-center'>
          <p className='text-sm text-gray-600'>
            Don’t have an account?{' '}
            <a
              href='/signup'
              className='text-indigo-600 hover:text-indigo-700'
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
