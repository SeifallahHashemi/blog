// import CodeTypingLoop from '@/components/Animation/CodeTypingLoop';
import TwistCard from '@/components/Animation/TwistCard';
import ScrollPresenceAnimator from '@/components/Pages/ScrollPresenceAnimator';
import React from 'react';

const AboutPage = () => {
  return (
    <main className={'flex flex-col'}>
      <ScrollPresenceAnimator>
        <TwistCard />
      </ScrollPresenceAnimator>
      {/*<CodeTypingLoop />*/}
    </main>
  );
};

export default AboutPage;
