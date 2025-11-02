'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { logout } from '@/lib/auth';
import { userOptions, userProfileOptions } from '@/utils/supabase/user';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPowerOff } from 'react-icons/fa';

export function NavUser() {
  const { isMobile } = useSidebar();
  // user info from database (supabase)
  const { data } = useSuspenseQuery(userOptions);
  const { data: user } = useSuspenseQuery(userProfileOptions(data.id));
  // router
  const router = useRouter();

  const logoutHandler = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="rounded-lg font-sans">
                  {String(user.username).slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div
                className="grid flex-1 text-left text-sm leading-tight font-sans"
                style={{
                  direction: 'ltr',
                  unicodeBidi: 'bidi-override',
                  textAlign: 'left',
                }}
              >
                <span className="truncate font-medium" title={user.username}>
                  {user.username}
                </span>
                <span className="truncate text-xs" title={data.email}>
                  {data.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="rounded-lg font-sans">
                    {String(user.username).slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.username}</span>
                  <span className="truncate text-xs">{data.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup dir={'rtl'}>
              <DropdownMenuItem className={'font-iranSans text-xs'}>
                <Sparkles size={20} />
                {user['is_premium'] ? (
                  'کاربر ویژه'
                ) : (
                  <Link href={'/account/buy'} className={'flex-1 w-full'}>
                    خرید اشتراک
                  </Link>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup dir={'rtl'}>
              <DropdownMenuItem disabled className={'font-iranSans text-xs'}>
                <BadgeCheck size={20} />
                به زودی ...
              </DropdownMenuItem>
              <DropdownMenuItem disabled className={'font-iranSans text-xs'}>
                <CreditCard size={20} />
                به زودی ...
              </DropdownMenuItem>
              <DropdownMenuItem disabled className={'font-iranSans text-xs'}>
                <Bell size={20} />
                به زودی ...
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              dir={'rtl'}
              className={'font-iranSans text-xs cursor-pointer'}
              onSelect={logoutHandler}
            >
              <FaPowerOff />
              خروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
