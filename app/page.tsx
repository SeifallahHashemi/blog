import AnimateSection from '@/components/Animation/AnimateSection';
import BlurIn from '@/components/Animation/BlurIn';
import InfiniteMarquee from '@/components/Animation/InfiniteMarquee';
import HeroSvg from '@/components/Icons/HeroSvg';
import HeroSvgComplete from '@/components/Icons/HeroSvgComplete';
import FeaturedPosts from '@/components/Pages/FeaturedPosts';
import GithubContributionGraph from '@/components/Pages/GithubContributionGraph';
import Social from '@/components/Shared/Social';

export default function Home() {
  return (
    <section className={'w-full lg:max-w-6xl mx-auto text-center'}>
      {/*<BlurIn text={'سلام! اسم من سپهره 👋'} className={'text-2xl font-bold'} />
      <BlurIn
        text={'برنامه نویس ارشد فرانت اند'}
        className={'text-2xl font-bold'}
        delay={0.1}
      />*/}
      <AnimateSection className={'w-full xl:max-w-6xl mx-auto text-center'}>
        <p className={'font-iranYWR text-2xl font-semibold leading-20'}>
          سلام! اسم من سپهره <span className={'text-3xl'}>👋</span>
        </p>
      </AnimateSection>
      <AnimateSection
        className={'w-full xl:max-w-6xl mx-auto text-center'}
        delay={0.1}
      >
        <p
          className={
            'font-iranYWR text-base font-normal leading-relaxed text-pretty sm:text-balance text-zinc-400 dark:text-zinc-600'
          }
        >
          من سپهر هاشمی هستم، یک توسعه دهنده باتجربه که مشتاق یادگیری و ساختن
          نرم افزار های خلاقانه و مدرن است.
        </p>
      </AnimateSection>
      <AnimateSection
        delay={0.3}
        className={
          'w-full xl:max-w-6xl mx-auto hidden sm:flex justify-center items-center my-10 relative'
        }
      >
        <div
          className={
            'w-fit h-fit absolute top-0 left-1/2 -translate-x-1/2 opacity-40 dark:opacity-15'
          }
        >
          <HeroSvgComplete />
        </div>
        <HeroSvg />
      </AnimateSection>
      <div
        className={
          'flex flex-col gap-y-6 justify-center items-center my-10 w-full xl:max-w-6xl mx-auto'
        }
      >
        <BlurIn
          className={
            'font-iranYWL text-base font-bold leading-relaxed text-center text-black/80 dark:text-white'
          }
          delay={0.5}
          text={'شبکه های اجتماعی'}
        />
        <Social />
        <GithubContributionGraph />
        <InfiniteMarquee />
        <FeaturedPosts />
      </div>
    </section>
  );
}
