// ** Layouts

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Section } from '@/layouts/Section';
import { getShell } from '@/layouts/Shell';
//* * Utils */
import type { NextPageWithLayout } from '@/utils/NextLayout';

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['property'])),
    },
  };
}

const Index: NextPageWithLayout = () => {
  const { t } = useTranslation('property');
  return <Section title={t('general.title')}>{t('general.title')}</Section>;
};

Index.getLayout = getShell({
  title: 'Property',
  description: 'This is property description',
  image: 'imageURL',
});

export default Index;
