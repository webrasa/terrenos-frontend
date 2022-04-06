import { useEffect, useState } from 'react';

import { Auth } from 'aws-amplify';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '../button/Button';
import { FullCenterSection } from '../layout/FullCenterSection';
import { Meta } from '../layout/Meta';
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
    sessionStorage.setItem(
      'join-team-path',
      `teamId=${router.query.teamId}&verificationCode=${router.query.verificationCode}`
    );

    content = (
      <FullCenterSection title="Join team" description="Log in or sign in">
        <Link href="/login">
          <a>
            <Button full>Log in</Button>
          </a>
        </Link>
      </FullCenterSection>
    );
  } else {
    content = <div>{userInfo.email}</div>;
  }

  return (
    <div className="antialiased text-gray-900">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {content}
    </div>
  );
};

export default Join;
