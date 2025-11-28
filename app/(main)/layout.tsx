import DockAnimation from '@/components/Animation/DockAnimation';
import Footer from '@/components/Global/Footer';
import Header from '@/components/Global/Header';
import { getClientQuery } from '@/lib/get-client-query';
import { getUser } from '@/utils/supabase/queries';
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <DockAnimation />
      {children}
      <Footer />
    </HydrationBoundary>
  );
};

export default DashboardLayout;
