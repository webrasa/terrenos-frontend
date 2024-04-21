// ** Layouts
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Section } from '@/layouts/Section';
import { getShell } from '@/layouts/Shell';
import { AppConfig } from '@/utils/AppConfig';
//* * Utils */
import type { NextPageWithLayout } from '@/utils/NextLayout';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['search'])),
    },
  };
}

const Index: NextPageWithLayout = () => {
  const { t } = useTranslation('search');

  return <Section title={t('general.title')}>{t('general.title')}</Section>;
};

Index.getLayout = getShell({
  title: 'Search',
  description: 'This is search description',
  image: AppConfig.image_url,
});

export default Index;
