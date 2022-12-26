import { useRouter } from 'next/router';

import { AuthProvider } from '@/hooks/UseAuth';
import { useProviderInfo } from '@/hooks/UseProviderInfo';
import { Meta } from '@/layouts/Meta';
import { Authenticated } from '@/templates/invite/Authenticated';
import { Unauthenticated } from '@/templates/invite/Unauthenticated';
import { AuthState } from '@/types/Auth';
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
        <Authenticated />
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
