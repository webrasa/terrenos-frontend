import type { ReactNode } from 'react';

import { AuthContext } from '@/hooks/UseAuth';

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
