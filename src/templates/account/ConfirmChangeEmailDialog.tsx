import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormDialog } from '@/dialog/FormDialog';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { mapAmplifyMessageSettings } from '@/utils/AmplifyMessageMap';

type IConfirmChangeEmailForm = {
  verificationCode: string;
};

type IConfirmChangeEmailDialogProps = {
  show: boolean;
};

/**
 * When the user changes his email address, an email is automatically sent with a new verification code.
 * He needs to confirm his new email address by entering the verification code.
 * @component
 */
const ConfirmChangeEmailDialog = (props: IConfirmChangeEmailDialogProps) => {
  const { register, handleSubmit } = useForm<IConfirmChangeEmailForm>();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);
  const router = useRouter();

  const confirmChangeEmailAsync = useAsync(
    async (data: IConfirmChangeEmailForm) => {
      try {
        await Auth.verifyCurrentUserAttributeSubmit(
          'email',
          data.verificationCode,
        );

        router.reload();
      } catch (err) {
        setFormGlobalError(mapAmplifyMessageSettings(err));
      }
    },
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
      error={formGlobalError}
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

export { ConfirmChangeEmailDialog };
