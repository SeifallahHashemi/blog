'use client';

import ToggleThemeAnimation from '@/components/Animation/ToggleThemeAnimation';
import TruncateTooltip from '@/components/Custom/UI/TruncateTooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { userOptions, userProfileOptions } from '@/utils/supabase/user';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { User } from 'lucide-react';

export default function AccountAvatar() {
  const { data } = useSuspenseQuery(userOptions);
  const { data: userData } = useSuspenseQuery(userProfileOptions(data.id));
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  console.log(data);
  console.log(userData);

  const isDefaultAvatar =
    userData['avatar_url'] === 'https://example.com/default-avatar.png';
  const avatarUrl = isDefaultAvatar ? undefined : userData['avatar_url'];

  return (
    <>
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
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowNewDialog(true)}>
              New File...
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowShareDialog(true)}>
              Share...
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Download</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              Provide a name for your new file. Click create when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="pb-3">
            <Field>
              <FieldLabel htmlFor="filename">File Name</FieldLabel>
              <Input id="filename" name="filename" placeholder="document.txt" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>
              Anyone with the link will be able to view this file.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-3">
            <Field>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="shadcn@vercel.com"
                autoComplete="off"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
              <Textarea
                id="message"
                name="message"
                placeholder="Check out this file"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
