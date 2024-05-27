// ** Layouts

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MyGallery from '@/gallery';
import { Meta } from '@/layouts/Meta';
import { AppConfig } from '@/utils/AppConfig';
//* * Utils */

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['property'])),
    },
  };
}

const Property = () => {
  const { t } = useTranslation('index');
  return (
    <div className="text-gray-600 antialiased">
      <Meta
        title={t('general.title')}
        description={t('general.description')}
        image={AppConfig.image_url}
      />
      <MyGallery />
    </div>
  );
};

export default Property;
