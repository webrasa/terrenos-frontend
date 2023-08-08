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
import { getSessionStorage } from '@/utils/SessionStorage';

type IConfirmForgotPasswordForm = {
  verificationCode: string;
  password: string;
};

const ConfirmForgotPasswordForm = () => {
  const router = useRouter();
  const email = getSessionStorage('confirm-forgot-password-email');
  const { register, handleSubmit } = useForm<IConfirmForgotPasswordForm>();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const verifyAsync = useAsync(async (data: IConfirmForgotPasswordForm) => {
    try {
      await Auth.forgotPasswordSubmit(
        email,
        data.verificationCode,
        data.password,
      );

      await Auth.signIn({
        username: email,
        password: data.password,
      });

      await router.push('/dashboard');
    } catch (err) {
      setFormGlobalError(mapAmplifyMessage(err));
    }
  });

  const handleVerify = handleSubmit(async (data) => {
    await verifyAsync.execute(data);
  });

  return (
    <FullCenterSection
      title="Reset your password"
      description="Enter the 6-digit verification code sent to your email and set your new password."
    >
      {formGlobalError && <Alert text={formGlobalError} />}

      <form className="grid gap-y-2 text-left" onSubmit={handleVerify}>
        <Label htmlFor="verificationCode">Verification code</Label>
        <FormElement>
          <input
            id="verificationCode"
            type="text"
            {...register('verificationCode')}
          />
        </FormElement>
        <Label htmlFor="password">New password</Label>
        <FormElement helper="Your password must be at least 8 characters with a mix of upper and lower case letters, numbers, and symbols.">
          <input id="password" type="password" {...register('password')} />
        </FormElement>

        <div className="mt-3">
          <button
            type="submit"
            className="w-full"
            disabled={verifyAsync.pending}
          >
            <Button full loading={verifyAsync.pending}>
              Reset password
            </Button>
          </button>
        </div>
      </form>

      <div className="mt-5 text-center text-xs">
        Didn&apos;t receive the email?{' '}
        <Link
          href="/forgot-password"
          className="text-primary-500 hover:text-primary-600"
        >
          Resend a new code
        </Link>
        .
      </div>
    </FullCenterSection>
  );
};

export { ConfirmForgotPasswordForm };
