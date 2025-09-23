import { cn } from '@/lib/utils';
import React from 'react';

interface SidebarProps {
  className?: string;
}

const PostSidebar = ({ className }: SidebarProps) => {
  return <div className={cn('w-full sticky top-0', className)}></div>;
};

export default PostSidebar;
