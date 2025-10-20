import AnimateSection from '@/components/Animation/AnimateSection';
import Marquee from '@/components/Animation/Marquee';
import ParallaxLogo from '@/components/Animation/ParallaxLogo';

const InfiniteMarquee = () => {
  return (
    <section
      className={
        'space-y-10 w-full xl:max-w-6xl mx-auto overflow-x-clip mask-gradient'
      }
    >
      <AnimateSection delay={0.9}>
        <h2
          className={
            'font-bold text-lg text-center font-iranYWL text-zinc-800 dark:text-white'
          }
        >
          مهارت ها
        </h2>
      </AnimateSection>
      <AnimateSection
        delay={1}
        className={'hidden md:flex w-full'}
        cClassName={'w-full max-w-full'}
      >
        <ParallaxLogo baseVelocity={-6} />
      </AnimateSection>
      <AnimateSection delay={1} className={'w-full flex md:hidden'}>
        <Marquee />
      </AnimateSection>
    </section>
  );
};

export default InfiniteMarquee;
