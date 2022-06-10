import classNames from 'classnames';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { ToggleMenuButton } from '@/button/ToggleMenuButton';
import { useMenu } from '@/hooks/UseMenu';

type INavbarMenuCenterProps = {
  logo: ReactNode;
  children: ReactNode;
  rightMenu: ReactNode;
};

const NavbarMenuCenter = (props: INavbarMenuCenterProps) => {
  const { showMenu, handleToggleMenu } = useMenu();

  const navClass = classNames('w-full', 'md:w-auto', 'md:block', {
    hidden: !showMenu,
  });

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div>
        <Link href="/">
          <a>{props.logo}</a>
        </Link>
      </div>

      <div className="md:hidden">
        <ToggleMenuButton onClick={handleToggleMenu} />
      </div>

      <nav className={`mt-2 md:mt-0 ${navClass}`}>
        <ul className="navbar rounded-t">{props.children}</ul>
      </nav>

      <div className={`border-t border-gray-200 ${navClass}`}>
        <ul className="navbar rounded-b">{props.rightMenu}</ul>
      </div>

      <style jsx>
        {`
          .navbar {
            @apply flex flex-col font-medium text-xl text-gray-700 p-5 bg-white;
          }

          .navbar :global(a) {
            @apply inline-block w-full;
          }

          .navbar :global(li:not(:first-child)) {
            @apply mt-3;
          }

          .navbar :global(a .btn) {
            @apply w-full;
          }

          .navbar :global(a:hover) {
            @apply text-primary-600;
          }

          @screen md {
            .navbar {
              @apply flex-row items-center p-0 bg-transparent;
            }

            /* Reset w-full rule */
            .navbar :global(a),
            .navbar :global(a .btn) {
              @apply w-auto;
            }

            .navbar :global(li:not(:first-child)) {
              @apply mt-0;
            }

            .navbar :global(li:not(:last-child)) {
              @apply mr-5;
            }
          }
        `}
      </style>
    </div>
  );
};

export { NavbarMenuCenter };
