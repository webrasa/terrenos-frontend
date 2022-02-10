import { Meta } from '../layout/Meta';
import { ResetPasswordForm } from '../templates/auth/ResetPasswordForm';
import { AppConfig } from '../utils/AppConfig';

const ForgotPassword = () => (
  <div className="antialiased text-gray-900">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <ResetPasswordForm />
  </div>
);

export default ForgotPassword;
