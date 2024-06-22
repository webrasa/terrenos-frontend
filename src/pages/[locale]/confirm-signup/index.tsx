// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Meta } from '@/layouts/Meta';
import { ConfirmSignUpForm } from '@/templates/auth/ConfirmSignUpForm';
import { AppConfig } from '@/utils/AppConfig';

import { getStaticPaths, makeStaticProps } from '../../../utils/getStatic';

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps }

const ConfirmSignUp = () => (
  <div className="text-gray-900 antialiased">
    <Meta
      title={AppConfig.title}
      description={AppConfig.description}
      image={'imageURL'}
    />
    <ConfirmSignUpForm />
  </div>
);

export default ConfirmSignUp;
