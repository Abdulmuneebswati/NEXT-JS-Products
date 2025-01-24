'use client';
import React from 'react';
import { Button } from './ui/button';
import { logout } from '@/app/actions/auth';

const Logout = () => {
  return (
    <Button
      variant='secondary'
      className='hidden md:block px-2'
      onClick={logout}
    >
      Logout
    </Button>
  );
};

export default Logout;
