import { useEffect, useState } from 'react';

import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Authenticated } from '../templates/invite/Authenticated';
import { Unauthenticated } from '../templates/invite/Unauthenticated';
import { CognitoUserExt, ProviderInfo } from '../types/Auth';
import { AppConfig } from '../utils/AppConfig';

enum AuthState {
  AUTHENTICATING = 'AUTHENTICATING',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

const Join = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<ProviderInfo | AuthState>(
    AuthState.AUTHENTICATING
  );

  useEffect(() => {
    const getUserInfo = async () => {
      const currentUserInfo: CognitoUserExt | null =
        await Auth.currentUserInfo();

      if (currentUserInfo) {
        setUserInfo({
          email: currentUserInfo.attributes.email,
          id: currentUserInfo.attributes.id,
          identities: currentUserInfo.attributes.identities,
        });
      } else {
        setUserInfo(AuthState.UNAUTHENTICATED);
      }
    };

    getUserInfo();
  }, []);

  if (userInfo === AuthState.AUTHENTICATING) {
    return null;
  }

  let content;

  if (userInfo === AuthState.UNAUTHENTICATED) {
    if (router.query.teamId && router.query.verificationCode) {
      sessionStorage.setItem(
        'join-team-path',
        `teamId=${router.query.teamId}&verificationCode=${router.query.verificationCode}`
      );
    }

    content = <Unauthenticated />;
  } else {
    sessionStorage.removeItem('join-team-path');

    content = <Authenticated userInfo={userInfo} />;
  }

  return (
    <div className="text-gray-900 antialiased">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {content}
    </div>
  );
};

export default Join;
