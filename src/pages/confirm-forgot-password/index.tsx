import { Meta } from '@/layouts/Meta';
import { ConfirmForgotPasswordForm } from '@/templates/auth/ConfirmForgotPasswordForm';
import { AppConfig } from '@/utils/AppConfig';

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
