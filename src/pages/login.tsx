import { Meta } from '@/layout/Meta';
import { LoginForm } from '@/templates/auth/LoginForm';
import { AppConfig } from '@/utils/AppConfig';

const Login = () => (
  <div className="text-gray-900 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <LoginForm />
  </div>
);

export default Login;
