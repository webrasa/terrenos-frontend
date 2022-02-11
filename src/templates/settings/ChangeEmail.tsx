import { useState } from 'react';

import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';

import { FormDialog } from '../../dialog/FormDialog';
import { FormElement } from '../../form/FormElement';
import { Label } from '../../form/Label';
import { useAsync } from '../../hooks/UseAsync';
import { SettingsDialogState } from '../../types/SettingsDialogState';
import { mapAmplifyMessageSettings } from '../../utils/AmplifyMessageMap';

type IChangeEmailForm = {
  email: string;
};

type IChangeEmailProps = {
  show: boolean;
  handleDialogState: (displayState: SettingsDialogState) => void;
  handleCloseDialog: () => void;
};

const ChangeEmail = (props: IChangeEmailProps) => {
  const { register, handleSubmit } = useForm<IChangeEmailForm>();
  const [error, setError] = useState<string | null>(null);

  const changeEmailAsync = useAsync(async (data: IChangeEmailForm) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: data.email });

      props.handleDialogState(SettingsDialogState.CONFIRM_CHANGE_EMAIL);
    } catch (err) {
      setError(mapAmplifyMessageSettings(err));
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
      error={error}
      title="Change email"
      description="Update your new email and we'll send you a verification code to
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

export { ChangeEmail };