import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useSessionStorage } from 'react-use';
import useSWR from 'swr';

import {
  CognitoUserExt,
  ProviderInfo,
  UserAuth,
  UserProfile,
} from '../types/Auth';

// React Hook Context for authentification
const AuthContext = createContext<UserAuth | null>(null);

type IAuthProviderProps = {
  children: ReactNode;
};

/**
 * The provider component of React Hook Context for authentication.
 * @hook
 * @params props - Component props.
 * @param props.children -  Children components.
 */
export const AuthProvider = (props: IAuthProviderProps) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<ProviderInfo | null>(null);
  const [currentTeamInd, setCurrentTeamInd] = useSessionStorage('team-ind', 0);

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
  }, []);

  // Retrieves User information and if it's the first sign in, it creates a new data entry for the user.
  const { data } = useSWR<UserProfile>(
    userInfo ? `/user/profile?email=${userInfo.email}` : null
  );

  if (!userInfo || !data) {
    return null;
  }

  const currentTeam = data.teamList[currentTeamInd];

  if (!currentTeam) {
    setCurrentTeamInd(0);
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        providerInfo: userInfo,
        profile: data,
        teamList: data.teamList,
        setCurrentTeamInd,
        currentTeamInd,
        currentTeam,
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
