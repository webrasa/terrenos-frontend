// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Meta } from '@/layouts/Meta';
import { ConfirmForgotPasswordForm } from '@/templates/auth/ConfirmForgotPasswordForm';
import { AppConfig } from '@/utils/AppConfig';

import { getStaticPaths, makeStaticProps } from '../../../utils/getStatic';

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps }

const ConfirmForgotPassword = () => (
  <div className="text-gray-900 antialiased">
    <Meta
      title={AppConfig.title}
      description={AppConfig.description}
      image={'imageURL'}
    />
    <ConfirmForgotPasswordForm />
  </div>
);

export default ConfirmForgotPassword;
