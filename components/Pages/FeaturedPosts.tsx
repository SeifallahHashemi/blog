import AnimateSection from '@/components/Animation/AnimateSection';
import SpotlightGlowingCard from '@/components/Pages/SpotlightGlowingCard';
import React from 'react';

const FeaturedPosts = () => {
  return (
    <section
      className={
        'my-40 w-full xl:max-w-6xl mx-auto flex flex-col justify-center items-center gap-y-10'
      }
    >
      <AnimateSection
        delay={1.1}
        className={'w-full xl:max-w-6xl mx-auto text-center'}
        cClassName={
          'font-bold text-lg text-center font-iranYWL text-zinc-800 dark:text-white leading-relaxed'
        }
      >
        پست های ویژه
      </AnimateSection>
      <AnimateSection delay={1.2} className={'w-full xl:max-w-6xl mx-auto'}>
        <SpotlightGlowingCard />
      </AnimateSection>
    </section>
  );
};

export default FeaturedPosts;
