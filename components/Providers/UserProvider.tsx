'use client';

import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

interface User {
  id: string;
  name: string;
  fullName: string;
}

const UserProvider = ({ user }: { user: User }) => {
  const updateUserInformation = useUserStore(
    (state) => state.updateUserInformation
  );
  const storedUser = useUserStore((state) => state.user);

  useEffect(() => {
    if (
      !storedUser ||
      storedUser.id !== user.id ||
      storedUser.name !== user.name ||
      storedUser.fullName !== user.fullName
    ) {
      updateUserInformation(user);
    }
  }, [user, storedUser, updateUserInformation]);

  return null;
};

export default UserProvider;
