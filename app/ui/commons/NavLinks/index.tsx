'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Icons
import {
  HomeIcon,
  EBookIcon,
  MyCoursesIcon,
  PurchaseCoursesIcon,
  CompletedCourseIcon,
  CodeChallengesIcon,
  CommunityIcon,
  ProfileIcon,
  SettingIcon,
  LogoutIcon,
} from '@/app/ui/icons';

const sidebar = [
  {
    title: 'main menu',
    links: [
      { name: 'Dashboard', href: '/', icon: HomeIcon },
      {
        name: 'eBook',
        href: '/ebook',
        icon: EBookIcon,
      },
      { name: 'My courses', href: '/courses', icon: MyCoursesIcon },
      {
        name: 'Purchase Course',
        href: '/purchase-course',
        icon: PurchaseCoursesIcon,
      },
      {
        name: 'Completed Courses',
        href: '/completed-courses',
        icon: CompletedCourseIcon,
      },
      {
        name: 'Code Challenges',
        href: '/code-challenges',
        icon: CodeChallengesIcon,
      },
      { name: 'Community', href: '/community', icon: CommunityIcon },
    ],
  },
  {
    title: 'settings',
    links: [
      { name: 'Profile', href: '/profile', icon: ProfileIcon },
      {
        name: 'Setting',
        href: '/setting',
        icon: SettingIcon,
      },
      { name: 'Logout', href: '/logout', icon: LogoutIcon },
    ],
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return sidebar.map((item) => (
    <Fragment key={item.title}>
      <p className="text-base font-semibold capitalize text-outline-text-dark">
        {item.title}
      </p>
      <div className="py-7">
        {item.links.map((link) => {
          const Icon = link.icon;

          return (
            <div
              key={link.name}
              className={clsx({
                'cursor-not-allowed': pathname !== link.href,
              })}
            >
              <Link
                href={link.href}
                className={clsx(
                  'flex h-14 grow items-center justify-center gap-5 p-3 rounded-md pointer-events-none',
                  'md:flex-none md:justify-start md:p-2 md:px-7',
                  {
                    'bg-active-primary text-background fill-background':
                      pathname === link.href,
                  },
                  {
                    'text-fill-link fill-fill-link': pathname !== link.href,
                  }
                )}
              >
                <Icon />
                <span className="hidden text-sm md:block">{link.name}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </Fragment>
  ));
}
