'use client';

import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Components
import Search from '@/app/ui/commons/Search';

// Icons
import { NotificationIcon } from '@/app/ui/icons';

// Images
import avatar from '@/public/images/avatar.png';

// Constants
import { SEARCH_KEY_PARAMS } from '@/app/lib/constants';

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(SEARCH_KEY_PARAMS.FILTER_FIELD, 'name');
    params.set(SEARCH_KEY_PARAMS.FILTER_VALUE, value);

    // Remove params pagination
    params.delete(SEARCH_KEY_PARAMS.START_AFTER_VALUE);
    params.delete(SEARCH_KEY_PARAMS.END_BEFORE_VALUE);

    router.push(`${pathname}?${params}`);
  };

  return (
    <header className="flex justify-between items-center h-36 pt-10 pb-14 pr-10">
      <h4 className="text-xl font-semibold text-fill-text-dark">My course</h4>
      <div className="flex items-center gap-7">
        <Search onChange={handleChange} />
        <NotificationIcon className="cursor-not-allowed" />
        <Image
          priority
          src={avatar}
          width={50}
          height={50}
          alt="avatar"
          className="cursor-not-allowed"
        />
      </div>
    </header>
  );
};

export default Header;
