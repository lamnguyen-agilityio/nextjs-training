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
      { name: 'Dashboard', href: '/home', icon: HomeIcon },
      {
        name: 'Categories',
        href: '/categories',
        icon: EBookIcon,
        active: true,
      },
      {
        name: 'My courses',
        href: '/courses',
        icon: MyCoursesIcon,
        active: true,
      },
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
                'cursor-not-allowed': pathname !== link.href && !link.active,
              })}
            >
              <Link
                href={link.href}
                className={clsx(
                  'flex h-14 grow items-center justify-center gap-5 p-3 rounded-md',
                  'md:flex-none md:justify-start md:p-2 md:px-7',
                  {
                    'bg-active-primary text-background fill-background':
                      pathname.includes(link.href),
                  },
                  {
                    'text-fill-link fill-fill-link': !pathname.includes(
                      link.href
                    ),
                  },
                  {
                    'pointer-events-none':
                      !pathname.includes(link.href) && !link.active,
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
