import { useRouter } from 'next/router';

import { AuthProvider } from '@/hooks/UseAuth';
import { AuthState, useProviderInfo } from '@/hooks/UseProviderInfo';
import { Meta } from '@/layout/Meta';
import { Authenticated } from '@/templates/invite/Authenticated';
import { Unauthenticated } from '@/templates/invite/Unauthenticated';
import { AppConfig } from '@/utils/AppConfig';

const Join = () => {
  const router = useRouter();
  const { userInfo } = useProviderInfo();

  let content;

  if (userInfo === AuthState.AUTHENTICATING) {
    content = null;
  } else if (userInfo === AuthState.UNAUTHENTICATED) {
    if (router.query.teamId && router.query.verificationCode) {
      sessionStorage.setItem(
        'join-team-path',
        `teamId=${router.query.teamId}&verificationCode=${router.query.verificationCode}`
      );
    }

    content = <Unauthenticated />;
  } else {
    sessionStorage.removeItem('join-team-path');

    content = (
      <AuthProvider>
        <Authenticated userInfo={userInfo} />
      </AuthProvider>
    );
  }

  return (
    <div className="text-gray-900 antialiased">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {content}
    </div>
  );
};

export default Join;
