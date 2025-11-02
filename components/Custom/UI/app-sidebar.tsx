'use client';

import { NavMain } from '@/components/Custom/UI/nav-main';
import { NavUser } from '@/components/Custom/UI/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import * as React from 'react';
import {
  Bookmark,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  UserRoundPen,
} from 'lucide-react';
import AccountAvatar from '../../Common/AccountAvatar';

const data = {
  navMain: [
    {
      title: 'نشان ها',
      icon: Bookmark,
      isActive: false,
      items: [
        {
          title: 'پست های محبوب',
          url: '/dashboard/favorites-posts',
        },
        {
          title: 'نظرات',
          url: '/dashboard/my-comments',
        },
      ],
    },
    {
      title: 'پروفایل',
      icon: UserRoundPen,
      items: [
        {
          title: 'تنظیمات',
          url: '/dashboard/settings',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <AccountAvatar />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavProjects projects={data.projects} />*/}
        {/*<NavSecondary items={data.navSecondary} className="mt-auto" />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
