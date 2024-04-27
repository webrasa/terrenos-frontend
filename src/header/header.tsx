import Image from 'next/image';

import AutoComplete from './search';

const Header = () => {
  return (
    <div className="container relative mx-auto h-96">
      {/* Header content */}
      <div className="relative h-auto md:flex md:flex-row">
        <div className="relative left-5 top-8 z-20 w-full md:left-10 md:top-36 md:h-40 md:w-1/2">
          <h1 className="relative bottom-4 text-3xl font-semibold text-black md:text-6xl">
            Land your dream
          </h1>
          <AutoComplete />
        </div>

        {/* Background image */}
        <div
          className="absolute top-16 h-72 w-full pl-1 md:left-96 md:top-2 md:h-80 md:w-3/4"
          style={{
            backgroundImage: `url('/assets/images/lineHeader.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            zIndex: 0,
          }}
        ></div>

        {/* Content on the right */}
        <div className="relative h-96 w-1/4 md:w-3/4">
          <div className="relative inset-0 z-10 w-96 items-center justify-center md:w-auto md:flex-row">
            <Image
              className="left-18 absolute top-12 rotate-1 md:right-40 md:top-40 md:h-44 md:w-72"
              src="/assets/images/placeHeader.png"
              width={500}
              height={500}
              alt="place"
            />
          </div>
          <div className="relative inset-0 top-12 z-10 justify-center md:left-80 md:top-44 md:flex">
            <Image
              className="h-18 absolute left-32 w-14 md:h-14 md:w-11"
              src="/assets/images/locationHeader.png"
              width={500}
              height={500}
              alt="location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Header };
