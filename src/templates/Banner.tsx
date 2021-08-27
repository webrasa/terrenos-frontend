import Link from 'next/link';

import { Button } from '../button/Button';
import { CTABanner } from '../cta/CTABanner';
import { LandingSection } from '../layout/LandingSection';

const Banner = () => (
  <LandingSection yPadding="pb-16">
    <CTABanner
      title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      subtitle="Start your Free Trial."
      button={
        <Link href="/">
          <a>
            <Button>Get Started</Button>
          </a>
        </Link>
      }
    />
  </LandingSection>
);

export { Banner };
