import { Meta } from '@/layout/Meta';
import { ConfirmSignUpForm } from '@/templates/auth/ConfirmSignUpForm';
import { AppConfig } from '@/utils/AppConfig';

const ConfirmSignUp = () => (
  <div className="text-gray-900 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <ConfirmSignUpForm />
  </div>
);

export default ConfirmSignUp;
