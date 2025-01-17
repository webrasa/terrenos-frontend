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
              <Link
                href={`/search?countryId=&regionId=&cityId=&districtId=&userLocation=&attributes=${item.id}`}
                key={index}
              >
                <Pill
                  base
                  greenBorder
                  name={props.translationCommon(`attributes.${item.name}`)}
                ></Pill>
              </Link>
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
                {`${props.translation('searchSection.countryText')} ${item.name}`}
              </Link>
            );
          })}
      </div>
    </LandingSection>
  );
};

export default Discover;
