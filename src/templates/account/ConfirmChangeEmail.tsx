import { useState } from 'react';

import { API, Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { FormDialog } from '../../dialog/FormDialog';
import { FormElement } from '../../form/FormElement';
import { Label } from '../../form/Label';
import { useAsync } from '../../hooks/UseAsync';
import { mapAmplifyMessageSettings } from '../../utils/AmplifyMessageMap';
import { getSessionStorage } from '../../utils/SessionStorage';

type IConfirmChangeEmailForm = {
  verificationCode: string;
};

type IConfirmChangeEmailProps = {
  show: boolean;
};

const ConfirmChangeEmail = (props: IConfirmChangeEmailProps) => {
  const { register, handleSubmit } = useForm<IConfirmChangeEmailForm>();
  const [error, setError] = useState<string | null>(null);
  const email = getSessionStorage('confirm-change-email');
  const router = useRouter();

  const confirmChangeEmailAsync = useAsync(
    async (data: IConfirmChangeEmailForm) => {
      try {
        await Auth.verifyCurrentUserAttributeSubmit(
          'email',
          data.verificationCode
        );

        await API.put('backend', '/user/email-update', {
          body: {
            email,
          },
        });

        router.reload();
      } catch (err) {
        setError(mapAmplifyMessageSettings(err));
      }
    }
  );

  const handleSubmitDialog = handleSubmit(async (data) => {
    await confirmChangeEmailAsync.execute(data);
  });

  // Don't let the user to close the dialog
  const handleCancelDisabled = () => {};

  return (
    <FormDialog
      show={props.show}
      handleCancel={handleCancelDisabled}
      handleSubmit={handleSubmitDialog}
      isSubmitting={confirmChangeEmailAsync.pending}
      error={error}
      hideCancelButton={true}
      title="Verify your email"
      description="Enter the 6-digit verification code sent to your new email to verify it."
    >
      <>
        <Label htmlFor="verificationCode">Verification code</Label>
        <FormElement>
          <input
            id="verificationCode"
            type="text"
            {...register('verificationCode')}
          />
        </FormElement>
      </>
    </FormDialog>
  );
};

export { ConfirmChangeEmail };
