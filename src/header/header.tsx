import Image from 'next/image';

import { LandingSection } from '@/layouts/LandingSection';
import type { ISearchHome } from '@/types/IHome';

import AutoComplete from './search';

type IHeaderProps = {
  indexTranslations: Function;
  data: Array<ISearchHome>;
  url: string;
};

const Header = (props: IHeaderProps) => {
  return (
    <LandingSection yPadding="py-4">
      <div className="">
        {/* Header content */}
        <div className="relative h-auto md:flex md:flex-row">
          <div className="relative top-8 z-20 w-full md:top-36 md:h-40 md:w-1/2">
            <h1 className="relative bottom-4 text-3xl font-semibold text-black md:text-6xl">
              {props.indexTranslations('heroSection.title')}
            </h1>
            <AutoComplete
              indexTranslations={props.indexTranslations}
              data={props.data}
              url={props.url}
            />
          </div>

          {/* Background image */}
          <div
            className="absolute top-16 h-72 w-full pl-1 md:left-80 md:top-1 md:h-80 md:w-3/4"
            style={{
              backgroundImage: `url('/assets/images/lineHeader.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'right center',
              zIndex: 0,
            }}
          ></div>

          {/* Content on the right */}
          <div className="relative h-64 w-1/4 md:h-96 md:w-3/4">
            <div className="relative inset-0 z-10 w-96 items-center justify-center md:w-auto md:flex-row">
              <Image
                className="left-18 absolute top-12 rotate-1 md:right-40 md:top-40 md:h-44 md:w-72"
                src="/assets/images/placeHeader.png"
                width={500}
                height={500}
                alt="place"
              />
            </div>
            <div className="relative inset-0 top-12 z-10 justify-center md:top-44 md:flex">
              <Image
                className="h-18 relative left-32 w-14 md:h-14 md:w-11"
                src="/assets/images/locationHeader.png"
                width={500}
                height={500}
                alt="location"
              />
            </div>
          </div>
        </div>
      </div>
    </LandingSection>
  );
};

export { Header };
