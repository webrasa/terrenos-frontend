import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useSessionStorage } from 'react-use';
import useSWR from 'swr';

import type { UserAuth, UserProfile } from '@/types/Auth';

import { AuthState, useProviderInfo } from './UseProviderInfo';

// React Hook Context for authentification
const AuthContext = createContext<UserAuth | null>(null);

export type IAuthProviderProps = {
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
  const { userInfo } = useProviderInfo();
  const [currentTeamInd, setCurrentTeamInd] = useSessionStorage('team-ind', 0);

  // Retrieves User information and if it's the first sign in, it creates a new data entry for the user.
  const { data } = useSWR<UserProfile>(
    userInfo !== AuthState.UNAUTHENTICATED &&
      userInfo !== AuthState.AUTHENTICATING
      ? `/user/profile?email=${userInfo.email}`
      : null
  );

  if (
    userInfo === AuthState.AUTHENTICATING ||
    userInfo === AuthState.UNAUTHENTICATED ||
    !data
  ) {
    if (userInfo === AuthState.UNAUTHENTICATED) {
      router.push('/login');
    }

    return null;
  }

  const currentTeam = data.teamList?.[currentTeamInd];

  if (!currentTeam) {
    if (currentTeamInd !== 0) {
      setCurrentTeamInd(0);
    }

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

// --------------- BELOW ONLY USED IN TESTING ---------------
export type ITestingAuthProviderProps = {
  children: ReactNode;
  identities?: string;
};

// Mocked team list data used in testing
const testingMockedTeamList = [
  {
    displayName: 'RANDOM_TEAM_DISPLAY_NAME',
    id: 'RANDOM_TEAM_ID',
  },
  {
    displayName: 'RANDOM_TEAM_DISPLAY_NAME2',
    id: 'RANDOM_TEAM_ID2',
  },
  {
    displayName: 'RANDOM_TEAM_DISPLAY_NAME3',
    id: 'RANDOM_TEAM_ID3',
  },
];

export const mockSetCurrentTeamInd = jest.fn();

/**
 * The Authentication provider component used in testing with mocked data.
 * @hook
 * @params props - Component props.
 * @param props.children -  Children components.
 */
export const TestingAuthProvider = (props: ITestingAuthProviderProps) => (
  <AuthContext.Provider
    value={{
      providerInfo: {
        email: 'RANDOM_EMAIL@gmail.com',
        id: 'RANDOM_PROFILE_INFO_ID',
        identities: props.identities,
      },
      profile: {
        firstSignIn: 'RANDOM_FIRST_SIGN_IN',
        id: 'RANDOM_PROFILE_ID',
        teamList: testingMockedTeamList,
      },
      teamList: testingMockedTeamList,
      setCurrentTeamInd: mockSetCurrentTeamInd,
      currentTeamInd: 0,
      currentTeam: {
        displayName: 'RANDOM_DISPLAY_NAME',
        id: 'RANDOM_TEAM_ID',
      },
    }}
  >
    {props.children}
  </AuthContext.Provider>
);
