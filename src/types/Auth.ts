import { CognitoUser } from '@aws-amplify/auth';

// Non-exhaustive attribute from Authenticator provider
export type ProviderInfo = {
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
export interface CognitoUserExt extends CognitoUser {
  attributes: ProviderInfo;
}

type Team = {
  displayName: string;
  id: string;
};

// Information returned by /user/profile endpoint
export type UserProfile = {
  id: string;
  firstSignIn: string;
  teamList: Team[];
};

// User information from backend (/user/profile) and authentication provider
export type UserAuth = {
  providerInfo: ProviderInfo;
  profile: UserProfile;
  teamList: Team[];
  setCurrentTeamInd: (teamInd: number) => void;
  currentTeamInd: number;
  currentTeam: Team;
};
