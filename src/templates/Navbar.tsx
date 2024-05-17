import Link from 'next/link';

import { LandingSection } from '@/layouts/LandingSection';
import { NavbarMenuCenter } from '@/navigation/NavbarMenuCenter';

import { Logo } from './Logo';

type INavbarProps = {
  translation: Function;
};

const Navbar = (props: INavbarProps) => (
  <div className="border-b border-gray-300">
    <LandingSection yPadding="py-4">
      <NavbarMenuCenter
        logo={<Logo xl />}
        rightMenu={
          <>
            <li className="rounded-1.5xl bg-primary-600 p-2 text-center font-medium text-white md:px-10">
              <Link href="/profile">
                {props.translation('navbarSection.ctaAddPropertyButtonTitle')}
              </Link>
            </li>
          </>
        }
      >
        <li>
          <Link href="/search">
            {props.translation('navbarSection.viewListingsTitle')}
          </Link>
        </li>
      </NavbarMenuCenter>
    </LandingSection>
  </div>
);

export { Navbar };
