// ** Layouts

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PropertyCard } from '@/card/Card';
import Filter from '@/filter/filter';
import AutoComplete from '@/header/autoComplete';
import { Meta } from '@/layouts/Meta';
import Map from '@/map';
import { Footer } from '@/templates/Footer';
import { Navbar } from '@/templates/Navbar';
import { AppConfig } from '@/utils/AppConfig';

//* * Utils */

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['search'])),
    },
  };
}

const Search = () => {
  const { t } = useTranslation();
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={t('general.title')}
        description={t('general.description')}
        image={AppConfig.image_url}
      />
      <Navbar />
      <div className="mx-auto mt-3 max-w-screen-xl px-3 py-4">
        <div className="flex">
          <div className="w-1/2">
            <AutoComplete />
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
              {array.map((item, index) => {
                return (
                  <PropertyCard
                    key={index}
                    id={index.toString()}
                    price={'$55,000'}
                    sizeMeters={1.6}
                    sizeAcres={2.6}
                    location={'Alajuela provincia, Alajuela, Carrizal Costa'}
                    secondLocation={'Rica, Alajuela provincia'}
                    images={[
                      'https://picsum.photos/200/300',
                      'https://umetnickagalerija.rs/slike/dva-drveta-jesen.jpg',
                      'https://picsum.photos/200/300',
                    ]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
