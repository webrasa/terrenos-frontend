// ** Layouts

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Filter from '@/filter/filter';
import AutoComplete from '@/header/autoComplete';
import { Meta } from '@/layouts/Meta';
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
          <div className="w-1/2"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
