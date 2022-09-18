import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormDialog } from '@/dialog/FormDialog';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { UserInfoSettingsState } from '@/types/UserInfoSettingsState';
import { mapAmplifyMessageSettings } from '@/utils/AmplifyMessageMap';

type IChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
};

type IChangePasswordDialogProps = {
  show: boolean;
  handleDialogState: (displayState: UserInfoSettingsState) => void;
  handleCloseDialog: () => void;
};

const ChangePasswordDialog = (props: IChangePasswordDialogProps) => {
  const { register, handleSubmit, reset, clearErrors } =
    useForm<IChangePasswordForm>();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const clearForm = () => {
    reset(); // Clear the form for security reason
    clearErrors();
  };

  const changePasswordAsync = useAsync(async (data: IChangePasswordForm) => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      await Auth.changePassword(user, data.oldPassword, data.newPassword);

      clearForm();
      props.handleDialogState(UserInfoSettingsState.CHANGE_PASSWORD_SUCCESS);
    } catch (err) {
      setFormGlobalError(mapAmplifyMessageSettings(err));
    }
  });

  const handleSubmitDialog = handleSubmit(async (data) => {
    await changePasswordAsync.execute(data);
  });

  const handleCancelAndReset = () => {
    clearForm();
    props.handleCloseDialog();
  };

  return (
    <FormDialog
      show={props.show}
      handleCancel={handleCancelAndReset}
      handleSubmit={handleSubmitDialog}
      isSubmitting={changePasswordAsync.pending}
      error={formGlobalError}
      title="Change password"
      description="Need to change your password?"
    >
      <>
        <Label htmlFor="oldPassword">Old password</Label>
        <FormElement>
          <input
            id="oldPassword"
            type="password"
            {...register('oldPassword')}
          />
        </FormElement>

        <Label htmlFor="newPassword">New password</Label>
        <FormElement helper="Your password must be at least 8 characters with a mix of upper and lower case letters, numbers, and symbols.">
          <input
            id="newPassword"
            type="password"
            {...register('newPassword')}
          />
        </FormElement>
      </>
    </FormDialog>
  );
};

export { ChangePasswordDialog };
