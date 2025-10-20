import ViewTransitionLink from '@/components/Animation/ViewTransitionLink';
import MobileMenu from '@/components/Global/MobileMenu';
import { ThemeModeToggle } from '@/components/Theme/ThemeModeToggle';
import Logo from '@/public/img/logo.webp';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import ProfileButton from '../Profile/ProfileButton';

interface Data {
  title: string;
  link: string;
}

const data: Data[] = [
  {
    title: 'درباره من',
    link: '/about',
  },
  {
    title: 'پروژه ها',
    link: '/projects',
  },
  {
    title: 'بلاگ',
    link: '/blog',
  },
];

const Header = () => {
  return (
    <header
      className={
        'px-6 py-6 border-b dark:border-b-zinc-900 border-b-zinc-200 text-sm z-40 font-iranSans md:mb-20 mb-10 md:px-16 transition-colors'
      }
    >
      <div
        className={
          'max-w-6xl mx-auto flex flex-row-reverse justify-between items-center'
        }
      >
        <Link href={'/'} className={'rounded-full overflow-clip'}>
          <Image
            src={Logo}
            alt={'Logo'}
            priority
            placeholder={'blur'}
            width={75}
            height={75}
          />
        </Link>
        <nav className={'md:block hidden'}>
          <ul className={'flex items-center gap-x-8'}>
            {data.map((item, index) => (
              <li key={'navigation-' + index}>
                <ViewTransitionLink link={item.link}>
                  {item.title}
                </ViewTransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={'flex items-center gap-x-4'}>
          <ThemeModeToggle />
          <ProfileButton />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
