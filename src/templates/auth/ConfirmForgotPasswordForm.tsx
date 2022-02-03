import { useState } from 'react';

import { Auth } from 'aws-amplify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Alert } from '../../alert/Alert';
import { Button } from '../../button/Button';
import { FormElement } from '../../form/FormElement';
import { Label } from '../../form/Label';
import { useAsync } from '../../hooks/UseAsync';
import { FullCenterSection } from '../../layout/FullCenterSection';
import { mapAmplifyMessage } from '../../utils/AmplifyMessageMap';
import { getSessionItem } from '../../utils/Session';

type IConfirmForgotPasswordForm = {
  verificationCode: string;
  password: string;
};

const ConfirmForgotPasswordForm = () => {
  const router = useRouter();
  const email = getSessionItem('confirm-forgot-password-email');
  const { register, handleSubmit } = useForm<IConfirmForgotPasswordForm>();
  const [error, setError] = useState<string | null>(null);

  const verifyAsync = useAsync(async (data: IConfirmForgotPasswordForm) => {
    try {
      await Auth.forgotPasswordSubmit(
        email,
        data.verificationCode,
        data.password
      );

      await Auth.signIn({
        username: email,
        password: data.password,
      });

      await router.push('/dashboard');
    } catch (err) {
      setError(mapAmplifyMessage(err));
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
      {error && <Alert text={error} />}

      <form className="text-left grid gap-y-2" onSubmit={handleVerify}>
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

      <div className="mt-5 text-xs text-center">
        Didn&apos;t receive the email?{' '}
        <Link href="/forgot-password">
          <a className="text-primary-500 hover:text-primary-600">
            Resend a new code
          </a>
        </Link>
        .
      </div>
    </FullCenterSection>
  );
};

export { ConfirmForgotPasswordForm };
