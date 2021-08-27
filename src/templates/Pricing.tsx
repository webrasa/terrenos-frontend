import Link from 'next/link';

import { Button } from '../button/Button';
import { LandingSection } from '../layout/LandingSection';
import { PricingModel } from './PricingModel';

const Pricing = () => (
  <LandingSection title="Flexible Plans" subtitle="Pricing">
    <div className="mx-4 lg:mx-32 grid grid-cols-1 md:grid-cols-3 gap-y-12">
      <PricingModel
        button={
          <Link href="/login">
            <a>
              <Button full>Get Started</Button>
            </a>
          </Link>
        }
        button2={
          <Link href="/login">
            <a>
              <Button full>Get Started</Button>
            </a>
          </Link>
        }
        button3={
          <Link href="/login">
            <a>
              <Button full>Get Started</Button>
            </a>
          </Link>
        }
      />
    </div>
  </LandingSection>
);

export { Pricing };
