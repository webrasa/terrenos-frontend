import { API } from 'aws-amplify';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import { PropertyCard } from '@/card/Card';
import Filter from '@/filter/filter';
import AutoComplete from '@/header/search';
import { useAsync } from '@/hooks/UseAsync';
import { Meta } from '@/layouts/Meta';
import Map from '@/map';
import { useUserLocation } from '@/store/locationContext';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import type { Properties } from '@/types/IComponents';
import type { IHome } from '@/types/IHome';
import { AppConfig } from '@/utils/AppConfig';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['search', 'common', 'home'])),
    },
  };
}

const Search = () => {
  // States
  const [data, setData] = useState<IHome>({});

  // Translations
  const { t } = useTranslation('search');
  const { t: translationCommon } = useTranslation('common');

  // Context
  const { ipLocation } = useUserLocation();

  // Functions
  const getData = useAsync(async (latitude: string, longitude: string) => {
    try {
      if (Object.keys(data).length > 0 && ipLocation.source === 'IP') return;
      const homeData = await API.get(
        'backend',
        `/home/${latitude}/${longitude}`,
        {},
      );
      setData(homeData);
    } catch (err: any) {
      // handle error
      console.log(err.message);
    }
  });

  const getPropertyLocation = (item: Properties) => {
    let address = '';
    if (item.country) address = item.country.name;
    if (item.region) address = `${address}, ${item.region.name}`;
    if (item.city) address = `${address}, ${item.city.name}`;
    if (item.district) address = `${address}, ${item.district.name}`;

    return address;
  };

  // Hooks
  useEffect(() => {
    if (
      ipLocation.latitude &&
      ipLocation.latitude !== 0 &&
      ipLocation.longitude &&
      ipLocation.longitude !== 0
    ) {
      getData.execute(ipLocation.latitude, ipLocation.longitude);
    }
  }, [ipLocation]);

  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={t('general.title')}
        description={t('general.description')}
        image={AppConfig.image_url}
      />
      <Navbar translation={translationCommon} />
      <div className="mx-auto mt-3 max-w-screen-xl px-3 py-4">
        <div className="flex">
          <div className="w-1/2">
            <AutoComplete
              indexTranslations={t}
              data={data?.locations || []}
              url={`/search?countryId=&regionId=&cityId=&districtId=&userLocation=${ipLocation.latitude},${ipLocation.longitude}`}
            />
          </div>
          <Filter />
        </div>
        <div className="mt-3 flex">
          <div className="h-auto w-1/2">
            <Map />
          </div>
          <div className="relative ml-5 w-3/4">
            <span className="text-3xl font-semibold text-black">Results</span>
            <div className="custom-scroll mt-2 grid max-h-screen grid-cols-2 gap-4">
              {data && data.properties && data.properties
                ? data.properties.map((item, index) => {
                    return (
                      <PropertyCard
                        key={index}
                        id={item.id.toString()}
                        price={item.price.toString()}
                        status={index % 3}
                        surfaceArea={1.6}
                        location={getPropertyLocation(item)}
                        secondLocation={item.address}
                        images={[
                          'https://picsum.photos/200/300',
                          'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg',
                          'https://picsum.photos/200/300',
                        ]}
                      />
                    );
                  })
                : []}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
