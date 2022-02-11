import Link from 'next/link';

import { Button } from '../button/Button';
import { LandingSection } from '../layout/LandingSection';
import { PricingModel } from './PricingModel';

const Pricing = () => (
  <LandingSection title="Flexible Plans" subtitle="Pricing">
    <div className="grid grid-cols-1 gap-y-12 mx-4 md:grid-cols-3 lg:mx-32">
      <PricingModel
        button={
          <Link href="/signup">
            <a>
              <Button full>Get Started</Button>
            </a>
          </Link>
        }
        button2={
          <Link href="/signup">
            <a>
              <Button full>Get Started</Button>
            </a>
          </Link>
        }
        button3={
          <Link href="/signup">
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
