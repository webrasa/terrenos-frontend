// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-horizontal-scrolling-menu/dist/styles.css';

import { API } from 'aws-amplify';
import { useTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

import { PropertyCard } from '@/card/Card';
import CardSlider from '@/card-slider/CardSlider';
import Discover from '@/discover';
import { Header } from '@/header/header';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import { Meta } from '@/layouts/Meta';
import Promo from '@/promo';
import { useUserLocation } from '@/store/locationContext';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import type { Properties } from '@/types/IComponents';
import type { IHome } from '@/types/IHome';
import { AppConfig } from '@/utils/AppConfig';

import { getStaticPaths, makeStaticProps } from '../../utils/getStatic';


const getStaticProps = makeStaticProps(['index', 'common', 'home']);
export { getStaticPaths, getStaticProps }

const Index = () => {
  const { profile, providerInfo } = useAuth();

  // States
  const [data, setData] = useState<IHome>({});

  // Translations
  const { t } = useTranslation('index');
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
      <Header
        indexTranslations={t}
        data={data?.locations || []}
        url={`/search?countryId=&regionId=&cityId=&districtId=&userLocation=${ipLocation.latitude},${ipLocation.longitude}`}
      />
      <CardSlider translation={t}>
        {data && data.properties && data.properties
          ? data.properties.map((item, index) => {
              return (
                <PropertyCard
                  key={index}
                  id={item.id.toString()}
                  price={item.price.toString()}
                  status={item.status}
                  surfaceArea={item.surface}
                  location={getPropertyLocation(item)}
                  secondLocation={item.address}
                  images={item.medias.map((image) => image.url)}
                />
              );
            })
          : []}
      </CardSlider>
      <Promo
        url={`/search?countryId=&regionId=&cityId=&districtId=&userLocation=${ipLocation.latitude},${ipLocation.longitude}`}
        translation={t}
      />
      <Discover
        attributes={data?.attributes || []}
        countries={data?.countries || []}
        translationCommon={translationCommon}
        translation={t}
      ></Discover>
      <Footer />
    </div>
  );
};

export default Index;
