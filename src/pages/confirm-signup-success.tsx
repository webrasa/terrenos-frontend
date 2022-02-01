import { Meta } from '../layout/Meta';
import { ConfirmSignUpSuccess } from '../templates/auth/ConfirmSignUpSuccess';
import { AppConfig } from '../utils/AppConfig';

const ConfirmSignUp = () => (
  <div className="antialiased text-gray-900">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <ConfirmSignUpSuccess />
  </div>
);

export default ConfirmSignUp;
