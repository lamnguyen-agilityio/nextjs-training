import Link from 'next/link';
import Image from 'next/image';

// Components
import { NavLinks } from '@/app/ui/commons';

// Images
import logo from '@/public/images/logo.png';

const SideNav = () => {
  return (
    <div className="flex h-full flex-col px-3 py-10 md:px-10">
      <Link href="/">
        <Image priority src={logo} width={213} height={46} alt="e-studies" />
      </Link>
      <div className="flex grow flex-row justify-between py-16 md:flex-col">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
};

export default SideNav;
