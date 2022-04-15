import { useState } from 'react';

import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSessionStorage } from 'react-use';

import { Alert } from '../../alert/Alert';
import { Button } from '../../button/Button';
import { FormElement } from '../../form/FormElement';
import { Label } from '../../form/Label';
import { useAsync } from '../../hooks/UseAsync';
import { FullCenterSection } from '../../layout/FullCenterSection';
import { mapAmplifyMessage } from '../../utils/AmplifyMessageMap';

type IConfirmSignUpForm = {
  verificationCode: string;
};

const ConfirmSignUpForm = () => {
  const router = useRouter();
  const [email] = useSessionStorage('confirm-signup-email', '', true);
  const { register, handleSubmit } = useForm<IConfirmSignUpForm>();
  const [error, setError] = useState<string | null>(null);

  const verifyAsync = useAsync(async (data: IConfirmSignUpForm) => {
    try {
      await Auth.confirmSignUp(email, data.verificationCode);

      await router.push('/confirm-signup-success');
    } catch (err) {
      setError(mapAmplifyMessage(err));
    }
  });

  const handleVerify = handleSubmit(async (data) => {
    await verifyAsync.execute(data);
  });

  return (
    <FullCenterSection
      title="Verify your email"
      description="Enter the 6-digit verification code sent to your email to complete the signup."
    >
      {error && <Alert text={error} />}

      <form className="grid gap-y-2" onSubmit={handleVerify}>
        <Label htmlFor="verificationCode">Verification code</Label>
        <FormElement>
          <input
            id="verificationCode"
            type="text"
            {...register('verificationCode')}
          />
        </FormElement>

        <div className="mt-3 text-center">
          <button
            type="submit"
            className="w-full"
            disabled={verifyAsync.pending}
          >
            <Button full loading={verifyAsync.pending}>
              Confirm
            </Button>
          </button>
        </div>
      </form>
    </FullCenterSection>
  );
};

export { ConfirmSignUpForm };
