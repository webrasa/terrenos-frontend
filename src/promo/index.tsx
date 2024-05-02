import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/button/Button';
import { LandingSection } from '@/layouts/LandingSection';

const Promo = () => {
  return (
    <LandingSection yPadding="py-4">
      <div className="flex h-auto w-full flex-col-reverse md:flex-row md:gap-x-24">
        <div className="text-center md:justify-center md:text-left">
          <h2 className="pb-4 pt-6 font-sans text-4xl font-semibold text-black md:pt-20">
            This could be yours
          </h2>
          <p className="px-11 pb-4 font-sans text-black md:px-1 md:pb-9 md:text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation
          </p>
          <Link href="/profile">
            <Button thinFont puffy>
              For sale near me
            </Button>
          </Link>
        </div>
        <div className="relative size-auto">
          <Image
            src="/assets/images/promoNature.jpg"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            alt="Mountain view"
            className="!relative rounded-none md:rounded"
          />
        </div>
      </div>
    </LandingSection>
  );
};

export default Promo;
