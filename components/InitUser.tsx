'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function InitUser() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const syncUserToDB = async () => {
      try {
        await fetch('/api/create-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clerkUserId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName,
            imageUrl: user.imageUrl,
          }),
        });
      } catch (error) {
        console.error('Failed to sync user to DB:', error);
      }
    };

    syncUserToDB();
  }, [user]);

  return null;
}
