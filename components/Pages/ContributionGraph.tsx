'use client';

import { github } from '@/components/Data/contribution-graph-theme';
import FilteredYearButton from '@/components/Shared/FilteredYearButton';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const GitHubCalendar = dynamic(() => import('react-github-calendar'), {
  ssr: false,
});

const ContributionGraph = () => {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const currentYear = new Date().getFullYear();
  const startYear = 2021;
  const duration = currentYear - startYear;
  const thisYear = new Date().getFullYear();

  const { theme, systemTheme } = useTheme();
  const [uniqueTheme, setUniqueTheme] = useState<'light' | 'dark' | undefined>(
    theme as 'light' | 'dark'
  );
  const [calendarYear, setCalendarYear] = useState<number | undefined>(
    undefined
  );

  const scheme =
    theme === 'light' ? 'light' : theme === 'dark' ? 'dark' : systemTheme;

  useEffect(() => {
    setUniqueTheme(scheme);
  }, [scheme]);

  if (!username) {
    return (
      <div
        className={
          'flex justify-center items-center text-base font-bold font-mono'
        }
      >
        Error
      </div>
    );
  }

  return (
    <div className={'flex flex-col xl:flex-row-reverse gap-4'}>
      <div
        className={
          '!font-mono border border-zinc-200 dark:border-zinc-800 rounded-lg dark:bg-slate-900/10 backdrop-blur-lg bg-white/30 p-6 max-w-fit max-h-fit'
        }
        style={{
          direction: 'ltr',
        }}
      >
        <GitHubCalendar
          theme={github}
          colorScheme={uniqueTheme}
          username={username}
          blockSize={13}
          year={calendarYear ?? thisYear}
          hideTotalCount={true}
        />
      </div>
      <div
        className={'flex justify-start xl:flex-col flex-row flex-wrap gap-2'}
      >
        {Array.from({ length: duration }, (_y, i) => currentYear - i).map(
          (year) => (
            <FilteredYearButton
              year={year}
              currentYear={calendarYear ?? thisYear}
              key={year}
              onClick={() =>
                setCalendarYear(year === calendarYear ? undefined : year)
              }
            />
          )
        )}
      </div>
    </div>
  );
};

export default ContributionGraph;
