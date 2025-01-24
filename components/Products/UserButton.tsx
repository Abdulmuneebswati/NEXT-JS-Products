'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const UserButton = ({
  ownerId,
  ownerName,
}: {
  ownerId: number;
  ownerName: string;
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        router.push(`/user/${ownerId}`);
      }}
    >
      Owner: {ownerName ?? ''}
    </Button>
  );
};

export default UserButton;
