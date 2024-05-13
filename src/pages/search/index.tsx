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
  const array = [1, 2, 3, 4, 5, 6];
  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={t('general.title')}
        description={t('general.description')}
        image={AppConfig.image_url}
      />
      <Navbar />
      <div className="m-10">
        <div className="flex">
          <AutoComplete />
          <Filter />
        </div>
        <div className="flex">
          <Map />
          <div className="relative ml-5 mt-5 w-1/2">
            <span className="text-3xl font-semibold text-black">Results</span>
            <div className="mt-2 grid grid-cols-2 gap-x-12 gap-y-4 ">
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
