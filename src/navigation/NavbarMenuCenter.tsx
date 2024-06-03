import Link from 'next/link';
import type { ReactNode } from 'react';

import DropdownMenu from './Menu';

type INavbarMenuCenterProps = {
  logo: ReactNode;
  children: ReactNode;
  rightMenu: ReactNode;
};

/**
 * A navbar with 3 columns. One column for the logo, another in the center for a list of links.
 * Another one on the right also for a list of links.
 * @component
 */
const NavbarMenuCenter = (props: INavbarMenuCenterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="navbarLeft inline-flex w-3/12  items-center md:w-1/2">
        <Link className="md:w-1/2" href="/">
          {props.logo}
        </Link>

        <nav className="mt-2 hidden md:mt-0 md:block md:w-1/2">
          <ul className="navbar rounded-t">{props.children}</ul>
        </nav>
      </div>
      <div className="navbarRight inline-flex w-7/12 items-center md:w-1/2 ">
        <div className={`mr-5 md:ml-auto`}>
          <ul className="navbar rounded-b">{props.rightMenu}</ul>
        </div>
        <DropdownMenu></DropdownMenu>
      </div>

      <style jsx>
        {`
          .navbar {
            @apply flex flex-col font-medium text-xl text-black;
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
