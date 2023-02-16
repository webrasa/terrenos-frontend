export const mockCurrentUserInfo = jest.fn();
export const mockCurrentAuthenticatedUser = jest.fn();
export const mockGetPreferredMFA = jest.fn();
export const mockSetPreferredMFA = jest.fn();
export const mockSetupTOTP = jest.fn();

export const Auth = {
  currentUserInfo: mockCurrentUserInfo,
  currentAuthenticatedUser: mockCurrentAuthenticatedUser,
  getPreferredMFA: mockGetPreferredMFA,
  setPreferredMFA: mockSetPreferredMFA,
  setupTOTP: mockSetupTOTP,
};
