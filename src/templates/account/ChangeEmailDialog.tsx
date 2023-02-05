import { API, Auth } from 'aws-amplify';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormDialog } from '@/dialog/FormDialog';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { UserInfoSettingsState } from '@/types/UserInfoSettingsState';
import { mapAmplifyMessageSettings } from '@/utils/AmplifyMessageMap';

type IChangeEmailForm = {
  email: string;
};

type IChangeEmailDialogProps = {
  show: boolean;
  handleDialogState: (displayState: UserInfoSettingsState) => void;
  handleCloseDialog: () => void;
};

const ChangeEmailDialog = (props: IChangeEmailDialogProps) => {
  const { register, handleSubmit } = useForm<IChangeEmailForm>();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const changeEmailAsync = useAsync(async (data: IChangeEmailForm) => {
    try {
      if (data.email === '') {
        throw new Error('Invalid email address format.');
      }

      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: data.email });

      await API.put('backend', '/user/email-update', {
        body: {
          email: data.email,
        },
      });

      props.handleDialogState(UserInfoSettingsState.CONFIRM_CHANGE_EMAIL);
    } catch (err) {
      setFormGlobalError(mapAmplifyMessageSettings(err));
    }
  });

  const handleSubmitDialog = handleSubmit(async (data) => {
    await changeEmailAsync.execute(data);
  });

  return (
    <FormDialog
      show={props.show}
      handleCancel={props.handleCloseDialog}
      handleSubmit={handleSubmitDialog}
      isSubmitting={changeEmailAsync.pending}
      error={formGlobalError}
      title="Change email"
      description="Update your new email and we will send you a verification code to
      verify it."
    >
      <>
        <Label htmlFor="email">New email</Label>
        <FormElement>
          <input id="email" type="text" {...register('email')} />
        </FormElement>
      </>
    </FormDialog>
  );
};

export { ChangeEmailDialog };
