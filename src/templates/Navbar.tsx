import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { LandingSection } from '../layout/LandingSection';
import { NavbarMenuCenter } from '../navigation/NavbarMenuCenter';
import { Logo } from './Logo';

const Navbar = () => (
  <Background color="bg-primary-100">
    <LandingSection yPadding="py-6">
      <NavbarMenuCenter
        logo={<Logo xl />}
        rightMenu={
          <>
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a>
                  <Button>Start Free Trial</Button>
                </a>
              </Link>
            </li>
          </>
        }
      >
        <li>
          <Link href="/">
            <a>Products</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Examples</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Blog</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Contact</a>
          </Link>
        </li>
      </NavbarMenuCenter>
    </LandingSection>
  </Background>
);

export { Navbar };
