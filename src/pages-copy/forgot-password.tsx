import { Meta } from '@/layouts/Meta';
import { ResetPasswordForm } from '@/templates/auth/ResetPasswordForm';
import { AppConfig } from '@/utils/AppConfig';

const ForgotPassword = () => (
  <div className="text-gray-900 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <ResetPasswordForm />
  </div>
);

export default ForgotPassword;
