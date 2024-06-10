import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';

import type { CognitoUserExt, ProviderInfo } from '@/types/Auth';
import { AuthState } from '@/types/Auth';

export const useProviderInfo = () => {
  const [userInfo, setUserInfo] = useState<ProviderInfo | AuthState>(
    AuthState.AUTHENTICATING,
  );

  useEffect(() => {
    const getUserInfo = async () => {
      if (
        process.env.NEXT_PUBLIC_COGNITO_USER_ID_LOCAL &&
        process.env.NEXT_PUBLIC_COGNITO_USER_EMAIL_LOCAL
      ) {
        // Bypass AWS Cognito authentication for local development environment
        setUserInfo({
          email: process.env.NEXT_PUBLIC_COGNITO_USER_EMAIL_LOCAL,
          id: process.env.NEXT_PUBLIC_COGNITO_USER_ID_LOCAL,
        });
      } else {
        const currentUserInfo: CognitoUserExt | null =
          await Auth.currentUserInfo();

        if (currentUserInfo) {
          setUserInfo({
            email: currentUserInfo.attributes.email,
            id: currentUserInfo.attributes.sub,
            identities: currentUserInfo.attributes.identities,
            name: currentUserInfo.attributes.given_name,
            lastName: currentUserInfo.attributes.family_name,
            picture: currentUserInfo.attributes.picture,
          });
        } else {
          setUserInfo(AuthState.UNAUTHENTICATED);
        }
      }
    };

    getUserInfo();
  }, []);

  return { userInfo };
};
