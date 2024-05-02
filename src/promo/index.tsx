import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/button/Button';

const Promo = () => {
  return (
    <div className="my-8 flex h-auto w-full flex-col-reverse md:flex-row">
      <div className="text-center md:w-1/2 md:justify-center md:pl-9 md:pr-20 md:text-left">
        <h1 className="pb-4 pt-6 font-sans text-4xl font-semibold text-black md:pt-20">
          This could be yours
        </h1>
        <p className="px-11 pb-4 font-sans text-black md:px-1 md:pb-9 md:text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation
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
  );
};

export default Promo;
