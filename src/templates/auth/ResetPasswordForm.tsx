import { Auth } from 'aws-amplify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Alert } from '@/alert/Alert';
import { Button } from '@/button/Button';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { FullCenterSection } from '@/layouts/FullCenterSection';
import { mapAmplifyMessage } from '@/utils/AmplifyMessageMap';

type IResetPasswordForm = {
  email: string;
};

const ResetPasswordForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IResetPasswordForm>();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const sendAsync = useAsync(async (data: IResetPasswordForm) => {
    try {
      await Auth.forgotPassword(data.email);

      sessionStorage.setItem('confirm-forgot-password-email', data.email);

      await router.push('/confirm-forgot-password');
    } catch (err) {
      setFormGlobalError(mapAmplifyMessage(err));
    }
  });

  const handleSend = handleSubmit(async (data) => {
    await sendAsync.execute(data);
  });

  return (
    <FullCenterSection
      title="Forgot your password?"
      description="Enter your email and we'll send you a verification code."
    >
      {formGlobalError && <Alert text={formGlobalError} />}

      <form className="grid gap-y-2" onSubmit={handleSend}>
        <Label htmlFor="email">Email</Label>
        <FormElement>
          <input id="email" type="text" {...register('email')} />
        </FormElement>

        <div className="mt-3">
          <button type="submit" className="w-full" disabled={sendAsync.pending}>
            <Button full loading={sendAsync.pending}>
              Send email
            </Button>
          </button>
        </div>
      </form>

      <div className="mt-5 text-center text-xs">
        <Link href="/login" className="text-primary-500 hover:text-primary-600">
          Go back to login
        </Link>
      </div>
    </FullCenterSection>
  );
};

export { ResetPasswordForm };
