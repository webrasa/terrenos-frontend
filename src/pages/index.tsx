// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-horizontal-scrolling-menu/dist/styles.css';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

import { PropertyCard } from '@/card/Card';
import CardSlider from '@/card-slider/CardSlider';
import Discover from '@/discover';
import { Header } from '@/header/header';
import { UseLocation } from '@/hooks/UseLocation';
import { Meta } from '@/layouts/Meta';
import Promo from '@/promo';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import type { Properties } from '@/types/IComponents';
import type { IHome } from '@/types/IHome';
import { AppConfig } from '@/utils/AppConfig';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['index', 'common', 'home'])),
    },
  };
}

const Index = () => {
  const { t } = useTranslation('index');
  const { t: translationCommon } = useTranslation('common');

  const { userLocation } = UseLocation();

  const { data, error, isLoading, mutate } = useSWR<IHome>(
    `/home/${userLocation?.latitude}/${userLocation?.longitude}`,
  );

  const getPropertyLocation = (item: Properties) => {
    let address = '';
    if (item.country) address = item.country.name;
    if (item.region) address = `${address}, ${item.region.name}`;
    if (item.city) address = `${address}, ${item.city.name}`;
    if (item.district) address = `${address}, ${item.district.name}`;

    return address;
  };

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
        url={`/search?countryId=&regionId=&cityId=&districtId=&userLocation=${userLocation.latitude},${userLocation.longitude}`}
      />
      <CardSlider translation={t}>
        {data && data.properties
          ? data.properties.map((item, index) => {
              return (
                <PropertyCard
                  key={index}
                  id={item.id.toString()}
                  price={item.price.toString()}
                  sizeMeters={1.6}
                  sizeAcres={2.6}
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
      </CardSlider>
      <Promo
        url={`/search?countryId=&regionId=&cityId=&districtId=&userLocation=${userLocation.latitude},${userLocation.longitude}`}
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
