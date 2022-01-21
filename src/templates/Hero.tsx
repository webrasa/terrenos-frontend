import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { LandingSection } from '../layout/LandingSection';

const Hero = () => (
  <Background color="bg-primary-100">
    <LandingSection yPadding="py-24">
      <HeroOneButton
        title={
          <>
            Build your SaaS faster with{'\n'}
            <span className="text-primary-500">Nextless.js</span>
          </>
        }
        description={
          <>
            Lorem ipsum dolor sit amet,{' '}
            <span className="font-bold">consectetur adipiscing</span> elit.
            Donec quis rutrum urna, ut ultricies lorem.{'\n'}
            Quisque scelerisque tincidunt velit, consectetur vehicula lectus
            convallis ut.
          </>
        }
        button={
          <Link href="/signup">
            <a>
              <Button xl>Get Started for Free</Button>
            </a>
          </Link>
        }
        image={{
          src: '/assets/images/hero-image.png',
          alt: 'Screenshot title',
        }}
      />
    </LandingSection>
  </Background>
);

export { Hero };
