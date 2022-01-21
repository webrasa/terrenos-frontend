import { Meta } from '../layout/Meta';
import { SignUpForm } from '../templates/SignUpForm';
import { AppConfig } from '../utils/AppConfig';

const SignUp = () => (
  <div className="antialiased text-gray-900">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <SignUpForm />
  </div>
);

export default SignUp;
