import Link from 'next/link';

import { Button } from '@/button/Button';
import { LandingSection } from '@/layouts/LandingSection';

import { PricingModel } from './PricingModel';

const Pricing = () => (
  <LandingSection title="Flexible Plans" subtitle="Pricing">
    <div className="mx-4 grid grid-cols-1 gap-y-12 md:grid-cols-3 lg:mx-32">
      <PricingModel
        button={
          <Link href="/signup">
            <Button full>Get Started</Button>
          </Link>
        }
        button2={
          <Link href="/signup">
            <Button full>Get Started</Button>
          </Link>
        }
        button3={
          <Link href="/signup">
            <Button full>Get Started</Button>
          </Link>
        }
      />
    </div>
  </LandingSection>
);

export { Pricing };
