import Link from 'next/link';

import { LandingSection } from '@/layouts/LandingSection';
import { Pill } from '@/pill/Pill';
import type { Attributes, Countries } from '@/types/IComponents';

type IDiscoverProps = {
  attributes: Array<Attributes>;
  countries: Array<Countries>;
  translationCommon: Function;
  translation: Function;
};

const Discover = (props: IDiscoverProps) => {
  return (
    <LandingSection yPadding="py-4">
      <h2 className="pb-10 pt-6 text-center font-sans text-4xl font-semibold text-black">
        {props.translation('searchSection.title')}
      </h2>
      <div className="flex flex-wrap justify-evenly gap-4">
        {props.attributes &&
          props.attributes.map((item, index) => {
            return (
              <Pill
                key={index}
                translation={props.translationCommon}
                base
                greenBorder
                name={item.name}
                id={item.id}
              ></Pill>
            );
          })}
      </div>
      <div className="m-auto mt-10 flex flex-wrap justify-evenly md:justify-start">
        {props.countries &&
          props.countries.map((item, index) => {
            return (
              <Link
                className="w-1/2 text-black md:w-3/12"
                key={index}
                href={`/search?countryId=${item.id}&regionId=&cityId=&districtId=&userLocation=`}
              >
                {`${props.translation('sliderSection.title')} ${item.name}`}
              </Link>
            );
          })}
      </div>
    </LandingSection>
  );
};

export default Discover;
