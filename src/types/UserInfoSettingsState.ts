// Tracking state in User settings
export enum UserInfoSettingsState {
  NONE = 'NONE',
  CHANGE_EMAIL = 'CHANGE_EMAIL',
  CONFIRM_CHANGE_EMAIL = 'CONFIRM_CHANGE_EMAIL',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS',
  ENABLE_MFA = 'ENABLE_MFA',
  ENABLE_MFA_SUCCESS = 'ENABLE_MFA_SUCCESS',
  DISABLE_MFA = 'DISABLE_MFA',
}
