'use client';

import Image from 'next/image';

// Icons
import { NotificationIcon } from '@/app/ui/icons';

// Images
import avatar from '@/public/images/avatar.png';
import Search from '../Search';

const Header = () => {
  // TODO: Handle search courses
  const handleChange = (value: string) => {
    console.log(value);
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
