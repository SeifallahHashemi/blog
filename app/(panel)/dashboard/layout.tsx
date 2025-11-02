import { AppSidebar } from '@/components/Custom/UI/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { getClientQuery } from '@/lib/get-client-query';
import { getUser } from '@/utils/supabase/queries';
import { userOptions, userProfileOptions } from '@/utils/supabase/user';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import React from 'react';
import { redirect } from 'next/navigation';

const DashboardLayout = async ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const queryClient = getClientQuery();

  await queryClient.prefetchQuery(userOptions);

  const user = await getUser();

  await queryClient.prefetchQuery(userProfileOptions(user.id));

  if (!user) {
    redirect('/auth/login');
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider>
        <AppSidebar side="right" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/*<div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>*/}
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-lg md:min-h-min">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  );
};

export default DashboardLayout;
