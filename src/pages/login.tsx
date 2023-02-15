import type { CognitoUser } from '@aws-amplify/auth';
import { useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { ChallengeMFAForm } from '@/templates/auth/ChallengeMFAForm';
import { LoginForm } from '@/templates/auth/LoginForm';
import { AppConfig } from '@/utils/AppConfig';

const Login = () => {
  const [challengeMfa, setChallengeMfaUser] = useState<CognitoUser | null>(
    null
  );

  return (
    <div className="text-gray-900 antialiased">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {challengeMfa ? (
        <ChallengeMFAForm user={challengeMfa} />
      ) : (
        <LoginForm setChallengeMfaUser={setChallengeMfaUser} />
      )}
    </div>
  );
};

export default Login;
