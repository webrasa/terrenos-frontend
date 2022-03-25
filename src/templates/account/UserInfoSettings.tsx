import { useState } from 'react';

import { Button } from '../../button/Button';
import { useAuth } from '../../hooks/UseAuth';
import { CardSection } from '../../layout/CardSection';
import { SettingLine } from '../../settings/SettingLine';
import { UserInfoSettingsState } from '../../types/UserInfoSettingsState';
import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';
import { ChangePasswordSuccess } from './ChangePasswordSuccess';
import { ConfirmChangeEmail } from './ConfirmChangeEmail';

const UserInfoSettings = () => {
  const auth = useAuth();
  const [dialogState, setDialogState] = useState<UserInfoSettingsState>(
    UserInfoSettingsState.NONE
  );

  const handleDialogState = (state: UserInfoSettingsState) => {
    setDialogState(state);
  };

  const handleCloseDialog = () => {
    setDialogState(UserInfoSettingsState.NONE);
  };

  return (
    <>
      <CardSection title="Your Account">
        <div className="space-y-6">
          <SettingLine
            name="Email address"
            description={auth.providerInfo.email}
            action={
              <button
                type="button"
                onClick={() =>
                  handleDialogState(UserInfoSettingsState.CHANGE_EMAIL)
                }
              >
                <Button sm>Change</Button>
              </button>
            }
          />

          <SettingLine
            name="Password"
            description="••••••••••••"
            action={
              <button
                type="button"
                onClick={() =>
                  handleDialogState(UserInfoSettingsState.CHANGE_PASSWORD)
                }
              >
                <Button sm>Change</Button>
              </button>
            }
          />
        </div>
      </CardSection>

      <ChangeEmail
        show={dialogState === UserInfoSettingsState.CHANGE_EMAIL}
        handleDialogState={handleDialogState}
        handleCloseDialog={handleCloseDialog}
      />
      <ConfirmChangeEmail
        show={dialogState === UserInfoSettingsState.CONFIRM_CHANGE_EMAIL}
      />
      <ChangePassword
        show={dialogState === UserInfoSettingsState.CHANGE_PASSWORD}
        handleDialogState={handleDialogState}
        handleCloseDialog={handleCloseDialog}
      />
      <ChangePasswordSuccess
        show={dialogState === UserInfoSettingsState.CHANGE_PASSWORD_SUCCESS}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export { UserInfoSettings };
