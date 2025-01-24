'use client';


import { login } from '@/app/actions/auth';
import { Key, useActionState } from 'react';

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  console.log(state);

  return (
    <form
      action={action}
      className='space-y-6'
    >
      {/* Name Input */}
      <div>
        <label
          htmlFor='username'
          className='block text-sm font-medium text-gray-700 mb-2'
        >
          Name
        </label>
        <input
          id='username'
          name='username'
          placeholder='Enter your username'
          className='w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
        />
        {state?.errors?.username && (
          <p className='text-red-500 text-sm'>{state.errors.username}</p>
        )}
      </div>

      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700 mb-2'
        >
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          placeholder='Enter your password'
          className='w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
        />
        {state?.errors?.password && (
          <div>
            <p className='text-red-500 text-sm font-medium'>Password must:</p>
            <ul className='list-disc list-inside'>
              {state.errors.password.map((error: Key | null | undefined) => (
                <li
                  key={error}
                  className='text-red-500 text-sm'
                >{`- ${error}`}</li>
              ))}
            </ul>
          </div>
        )}
        {/* {state.errors?.message && <p>{error?.message ?? ''}</p>} */}
      </div>
      <button
        type='submit'
        disabled={pending}
        className='w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300'
      >
        {pending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
