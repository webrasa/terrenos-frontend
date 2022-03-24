import { useState } from 'react';

import { AccountSettingLine } from '../../account/AccountSettingLine';
import { Button } from '../../button/Button';
import { useAuth } from '../../hooks/UseAuth';
import { CardSection } from '../../layout/CardSection';
import { SettingsDialogState } from '../../types/SettingsDialogState';
import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';
import { ChangePasswordSuccess } from './ChangePasswordSuccess';
import { ConfirmChangeEmail } from './ConfirmChangeEmail';

const UserInfoSettings = () => {
  const auth = useAuth();
  const [dialogState, setDialogState] = useState<SettingsDialogState>(
    SettingsDialogState.NONE
  );

  const handleDialogState = (state: SettingsDialogState) => {
    setDialogState(state);
  };

  const handleCloseDialog = () => {
    setDialogState(SettingsDialogState.NONE);
  };

  return (
    <>
      <CardSection title={<div>Your Account</div>}>
        <div className="space-y-6">
          <AccountSettingLine
            name="Email address"
            value={auth.providerInfo.email}
            action={
              <button
                type="button"
                onClick={() =>
                  handleDialogState(SettingsDialogState.CHANGE_EMAIL)
                }
              >
                <Button sm>Change</Button>
              </button>
            }
          />

          <AccountSettingLine
            name="Password"
            value="••••••••••••"
            action={
              <button
                type="button"
                onClick={() =>
                  handleDialogState(SettingsDialogState.CHANGE_PASSWORD)
                }
              >
                <Button sm>Change</Button>
              </button>
            }
          />
        </div>
      </CardSection>

      <ChangeEmail
        show={dialogState === SettingsDialogState.CHANGE_EMAIL}
        handleDialogState={handleDialogState}
        handleCloseDialog={handleCloseDialog}
      />
      <ConfirmChangeEmail
        show={dialogState === SettingsDialogState.CONFIRM_CHANGE_EMAIL}
      />
      <ChangePassword
        show={dialogState === SettingsDialogState.CHANGE_PASSWORD}
        handleDialogState={handleDialogState}
        handleCloseDialog={handleCloseDialog}
      />
      <ChangePasswordSuccess
        show={dialogState === SettingsDialogState.CHANGE_PASSWORD_SUCCESS}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export { UserInfoSettings };
