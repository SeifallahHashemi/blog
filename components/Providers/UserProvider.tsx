'use client';

import React from 'react';

interface User {
  id: string;
  userName: string;
  fullName: string;
}

const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  return children;
};

export default UserProvider;
