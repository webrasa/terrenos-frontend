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

// Non-exhaustive attribute from Authenticator provider
type ProviderInfo = {
  id: string;
  email: string;
  identities?: any;
  // identities contains third party oauth information.
  // identities is emptied if the user signed up with email.
  // identities contains a stringify JSON data if the user signed up using social login.
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

// Information returned by /user/profile endpoint
type UserProfile = {
  id: string;
  firstSignIn: string;
  teamList: {
    displayName: string;
    id: string;
  }[];
};

// User information from backend (/user/profile) and authentication provider
type UserAuth = {
  providerInfo: ProviderInfo;
  profile: UserProfile;
  currentTeamId: string;
};

// React Hook Context for authentification
const AuthContext = createContext<UserAuth | null>(null);

type IAuthProviderProps = {
  children: ReactNode;
};

/**
 * The provider component of React Hook Context for authentication.
 * @component
 * @params props - Component props.
 * @param props.children -  Children components.
 */
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
            identities: currentUserInfo.attributes.identities,
          });
        } else {
          await router.push('/login');
        }
      }
    };

    getUserInfo();
  }, [router]);

  // Retrieves User information and if it's the first sign in, it creates a new data entry for the user.
  const { data } = useSWR<UserProfile>(
    userInfo ? `/user/profile?email=${userInfo.email}` : null
  );

  if (!userInfo || !data) {
    return null;
  }

  if (!data.teamList[0]) {
    throw new Error("Auth: the user don't have any team");
  }

  return (
    <AuthContext.Provider
      value={{
        providerInfo: userInfo,
        profile: data,
        currentTeamId: data.teamList[0].id,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

/**
 * Consume React Hook Context for authentication
 * @hook
 */
export const useAuth = () => {
  const userInfo = useContext(AuthContext);

  if (!userInfo) {
    throw new Error(
      'Auth: `useAuth` hook must be wrapped within a `AuthProvider` component'
    );
  }

  return userInfo;
};
