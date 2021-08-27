import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import Auth, { CognitoUser } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import useSWR from 'swr';

type ProviderInfo = {
  id: string;
  email: string;
};

/*
 * The following interface extends the CognitoUser type because it has issues
 * (see github.com/aws-amplify/amplify-js/issues/4927). Eventually (when you
 * no longer get an error accessing a CognitoUser's 'attribute' property) you
 * will be able to use the CognitoUser type instead of CognitoUserExt.
 */
interface CognitoUserExt extends CognitoUser {
  attributes: ProviderInfo;
}

type UserProfile = {
  id: string;
  firstSignIn: string;
};

type UserAuth = {
  providerInfo: ProviderInfo;
  profile: UserProfile;
};

const AuthContext = createContext<UserAuth | null>(null);

type IAuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = (props: IAuthProviderProps) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<ProviderInfo | null>(null);

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
            id: currentUserInfo.attributes.id,
          });
        } else {
          await router.push('/login');
        }
      }
    };

    getUserInfo();
  }, [router]);

  const { data } = useSWR<UserProfile>(userInfo ? '/user/profile' : null);

  if (!userInfo || !data) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ providerInfo: userInfo, profile: data }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const userInfo = useContext(AuthContext);

  if (!userInfo) {
    throw new Error(
      'Auth: `useAuth` hook must be wrapped within a `AuthProvider` component'
    );
  }

  return userInfo;
};
