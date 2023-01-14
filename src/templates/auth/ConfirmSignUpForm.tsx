import { Auth, Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Alert } from '@/alert/Alert';
import { Button } from '@/button/Button';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { FullCenterSection } from '@/layouts/FullCenterSection';
import { mapAmplifyMessage } from '@/utils/AmplifyMessageMap';
import { getSessionStorage } from '@/utils/SessionStorage';

type IConfirmSignUpForm = {
  verificationCode: string;
};

const ConfirmSignUpForm = () => {
  const router = useRouter();
  const email = getSessionStorage('confirm-signup-email');
  const { register, handleSubmit } = useForm<IConfirmSignUpForm>();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload;

      if (event === 'autoSignIn') {
        router.push('/dashboard');
      } else if (event === 'autoSignIn_failure') {
        router.push('/login');
      }
    });
  }, []);

  const verifyAsync = useAsync(async (data: IConfirmSignUpForm) => {
    try {
      await Auth.confirmSignUp(email, data.verificationCode);

      await router.push('/confirm-signup-success');
    } catch (err) {
      setFormGlobalError(mapAmplifyMessage(err));
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
      {formGlobalError && <Alert text={formGlobalError} />}

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
