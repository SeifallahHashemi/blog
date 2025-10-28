'use client';

import ToggleThemeAnimation from '@/components/Animation/ToggleThemeAnimation';
import TruncateTooltip from '@/components/Custom/UI/TruncateTooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { userOptions, userProfileOptions } from '@/utils/supabase/user';
import { useSuspenseQuery } from '@tanstack/react-query';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { RiQuillPenAiLine } from 'react-icons/ri';

export default function AccountAvatar() {
  const { data } = useSuspenseQuery(userOptions);
  const { data: userData } = useSuspenseQuery(userProfileOptions(data.id));
  const router = useRouter();

  console.log(data);
  console.log(userData);

  const isDefaultAvatar =
    userData['avatar_url'] === 'https://example.com/default-avatar.png';
  const avatarUrl = isDefaultAvatar ? undefined : userData['avatar_url'];

  const linkHandler = (path: string) => {
    router.push(path);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Open menu"
          size="icon-lg"
          className="cursor-pointer"
        >
          <User size={32} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="grid grid-cols-[50px_1fr_50px] gap-x-1">
          <ToggleThemeAnimation />
          <div dir={'rtl'}>
            <p
              className={
                'font-iranYWR font-medium tracking-tighter leading-relaxed'
              }
            >
              {userData['full_name']}
            </p>
            <div
              dir={'ltr'}
              className={'font-sans overflow-clip relative group'}
              style={{ width: '12ch' }}
            >
              <TruncateTooltip text={userData.username} />
              <p className={'truncate w-full'}>{userData.username}</p>
            </div>
          </div>
          <Avatar
            className={
              'inline-flex justify-center items-center self-center size-10 mx-auto'
            }
          >
            <AvatarImage
              src={avatarUrl}
              alt={'@sepehr'}
              className={'rounded-full'}
            />
            <AvatarFallback className={'font-sans'}>
              {String(userData.username).slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup dir={'rtl'}>
          <DropdownMenuItem
            onSelect={() => linkHandler('/profile')}
            className={'cursor-pointer'}
          >
            <HiOutlineHomeModern
              className={'text-zinc-800 dark:text-zinc-200'}
            />
            <span
              className={
                'font-iranYWL text-base font-normal leading-relaxed tracking-tight'
              }
            >
              صفحه اصلی
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={linkHandler.bind(null, '/blog')}>
            <RiQuillPenAiLine className={'text-zinc-800 dark:text-zinc-200'} />
            <span
              className={
                'font-iranYWL text-base font-normal leading-relaxed tracking-tight'
              }
            >
              وبلاگ
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Download</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
