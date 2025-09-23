import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { MouseEventHandler } from 'react';

interface ButtonProps {
  year: number;
  currentYear: number | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const FilteredYearButton = ({ year, currentYear, onClick }: ButtonProps) => {
  return (
    <Button
      variant={'ghost'}
      onClick={onClick}
      className={cn(
        'font-mono cursor-pointer text-zinc-800 dark:text-zinc-200 bg-white dark:bg-neutral-900 border border-transparent transition-colors duration-300 hover:border-zinc-200 dark:hover:border-zinc-800',
        currentYear === year && 'dark:!bg-teal-900 bg-teal-500'
      )}
      title={`سال فعالیت ${year}`}
    >
      {year}
    </Button>
  );
};

export default FilteredYearButton;
