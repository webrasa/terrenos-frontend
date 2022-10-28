import Link from 'next/link';

import { Button } from '@/button/Button';
import { CTABanner } from '@/cta/CTABanner';
import { LandingSection } from '@/layouts/LandingSection';

const Banner = () => (
  <LandingSection yPadding="pb-16">
    <CTABanner
      title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      subtitle="Start your Free Trial."
      button={
        <Link href="/signup">
          <Button>Get Started</Button>
        </Link>
      }
    />
  </LandingSection>
);

export { Banner };
