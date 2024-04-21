import Link from 'next/link';

import { LandingSection } from '@/layouts/LandingSection';
import { NavbarMenuCenter } from '@/navigation/NavbarMenuCenter';

import { Logo } from './Logo';

const Navbar = () => (
  <div className="border-b border-gray-300">
    <LandingSection yPadding="py-4">
      <NavbarMenuCenter
        logo={<Logo xl />}
        rightMenu={
          <>
            <li className="rounded-1.5xl bg-primary-600 p-2 font-medium text-white">
              <Link href="/profile">Add a property</Link>
            </li>
          </>
        }
      >
        <li>
          <Link href="/search">View listings</Link>
        </li>
      </NavbarMenuCenter>
    </LandingSection>
  </div>
);

export { Navbar };
