import Link from 'next/link';

import { LandingSection } from '@/layouts/LandingSection';
import { Pill } from '@/pill/Pill';

const Discover = () => {
  const array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <LandingSection yPadding="py-4">
      <h2 className="pb-10 pt-6 text-center font-sans text-4xl font-semibold text-black">
        Search by attributes or by country
      </h2>
      <div className="flex flex-wrap justify-evenly gap-4">
        {array.map((item, index) => {
          return <Pill key={index} base greenBorder></Pill>;
        })}
      </div>
      <div className="m-auto mt-10 flex flex-wrap justify-evenly md:justify-start">
        {array.map((item, index) => {
          return (
            <Link
              className="w-1/2 text-black md:w-3/12"
              key={index}
              href="/profile"
            >
              Land for sale in Serbia {item}
            </Link>
          );
        })}
      </div>
    </LandingSection>
  );
};

export default Discover;
