import DockAnimation from '@/components/Animation/DockAnimation';
import Footer from '@/components/Global/Footer';
import Header from '@/components/Global/Header';
import UserProvider from '@/components/Providers/UserProvider';
import { getClientQuery } from '@/lib/get-client-query';
import { getUser, getUserProfile } from '@/utils/supabase/queries';
import { userOptions, userProfileOptions } from '@/utils/supabase/user';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import React from 'react';

const DashboardLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const queryClient = getClientQuery();

  await queryClient.prefetchQuery(userOptions);

  const user = await getUser();

  await queryClient.prefetchQuery(userProfileOptions(user.id));

  const profile = await getUserProfile();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserProvider
        user={{
          name: profile.username,
          id: profile.user_id,
          fullName: profile.full_name,
        }}
      />
      <Header />
      <DockAnimation />
      {children}
      <Footer />
    </HydrationBoundary>
  );
};

export default DashboardLayout;
