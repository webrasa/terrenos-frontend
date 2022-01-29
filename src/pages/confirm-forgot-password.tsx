import { Meta } from '../layout/Meta';
import { ConfirmForgotPasswordForm } from '../templates/ConfirmForgotPasswordForm';
import { AppConfig } from '../utils/AppConfig';

const ConfirmForgotPassword = () => (
  <div className="antialiased text-gray-900">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <ConfirmForgotPasswordForm />
  </div>
);

export default ConfirmForgotPassword;
