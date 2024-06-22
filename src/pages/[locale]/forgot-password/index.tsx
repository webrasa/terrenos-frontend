// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Meta } from '@/layouts/Meta';
import { ResetPasswordForm } from '@/templates/auth/ResetPasswordForm';
import { AppConfig } from '@/utils/AppConfig';

import { getStaticPaths, makeStaticProps } from '../../../utils/getStatic';

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps }

const ForgotPassword = () => (
  <div className="text-gray-900 antialiased">
    <Meta
      title={AppConfig.title}
      description={AppConfig.description}
      image={'imageURL'}
    />
    <ResetPasswordForm />
  </div>
);

export default ForgotPassword;
