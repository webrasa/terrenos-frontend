import { Meta } from '@/layouts/Meta';
import { ConfirmSignUpSuccess } from '@/templates/auth/ConfirmSignUpSuccess';
import { AppConfig } from '@/utils/AppConfig';

const ConfirmSignUp = () => (
  <div className="text-gray-900 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <ConfirmSignUpSuccess />
  </div>
);

export default ConfirmSignUp;
