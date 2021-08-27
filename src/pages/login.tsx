import { Meta } from '../layout/Meta';
import { SocialLogin } from '../templates/SocialLogin';
import { AppConfig } from '../utils/AppConfig';

const Login = () => (
  <div className="antialiased text-gray-900">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <SocialLogin />
  </div>
);

export default Login;
