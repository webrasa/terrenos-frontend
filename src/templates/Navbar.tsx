import Link from 'next/link';

import { Background } from '@/background/Background';
import { Button } from '@/button/Button';
import { LandingSection } from '@/layouts/LandingSection';
import { NavbarMenuCenter } from '@/navigation/NavbarMenuCenter';

import { Logo } from './Logo';

const Navbar = () => (
  <Background color="bg-primary-100">
    <LandingSection yPadding="py-6">
      <NavbarMenuCenter
        logo={<Logo xl />}
        rightMenu={
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">
                <Button>Start Free Trial</Button>
              </Link>
            </li>
          </>
        }
      >
        <li>
          <Link href="/login">Products</Link>
        </li>
        <li>
          <Link href="/login">Examples</Link>
        </li>
        <li>
          <Link href="/login">Blog</Link>
        </li>
        <li>
          <Link href="/login">Contact</Link>
        </li>
      </NavbarMenuCenter>
    </LandingSection>
  </Background>
);

export { Navbar };
