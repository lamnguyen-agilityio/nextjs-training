'use client';

import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Components
import { Search } from '@/app/ui/commons';

// Icons
import { NotificationIcon } from '@/app/ui/icons';

// Images
import avatar from '@/public/images/avatar.png';

// Contexts
import { useBreadcrumb } from '@/app/lib/contexts/breadcrumb';

// Constants
import { SEARCH_KEY_PARAMS } from '@/app/lib/constants';

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { breadcrumb } = useBreadcrumb();

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
      <div>
        {breadcrumb.map((item, index) => (
          <span key={index}>
            {index > 0 && ' / '}
            <Link
              className={`text-xl font-semibold ${item.active ? 'text-active-primary pointer-events-none' : 'text-fill-text-dark'}`}
              href={item.href || '/'}
            >
              {item.title}
            </Link>
          </span>
        ))}
      </div>
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
