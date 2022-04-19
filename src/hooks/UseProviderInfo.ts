import { useState, useEffect } from 'react';

import { Auth } from 'aws-amplify';

import { ProviderInfo, CognitoUserExt } from '../types/Auth';

export enum AuthState {
  AUTHENTICATING = 'AUTHENTICATING',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

export const useProviderInfo = () => {
  const [userInfo, setUserInfo] = useState<ProviderInfo | AuthState>(
    AuthState.AUTHENTICATING
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
