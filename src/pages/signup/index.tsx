import { Meta } from '@/layouts/Meta';
import { SignUpForm } from '@/templates/auth/SignUpForm';
import { AppConfig } from '@/utils/AppConfig';

const SignUp = () => (
  <div className="text-gray-900 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <SignUpForm />
  </div>
);

export default SignUp;
