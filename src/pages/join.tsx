import { useEffect, useState } from 'react';

import { Auth } from 'aws-amplify';

import { CognitoUserExt, ProviderInfo } from '../types/Auth';

const Join = () => {
  const [userInfo, setUserInfo] = useState<ProviderInfo | null>(null);

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
      }
    };

    getUserInfo();
  }, []);

  if (!userInfo) {
    return null;
  }

  return <div>{userInfo.email}</div>;
};

export default Join;
