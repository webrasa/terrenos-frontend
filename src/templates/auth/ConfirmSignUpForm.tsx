import { MouseEventHandler } from 'react';

import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Button } from '../../button/Button';
import { FormElement } from '../../form/FormElement';
import { Label } from '../../form/Label';
import { useAsync } from '../../hooks/UseAsync';
import { FullCenterSection } from '../../layout/FullCenterSection';

type IConfirmSignUpForm = {
  verificationCode: string;
};

const ConfirmSignUpForm = () => {
  const router = useRouter();
  const email = sessionStorage.getItem('confirm-signup-email') || '';
  const { register, handleSubmit } = useForm<IConfirmSignUpForm>();

  const handleResend: MouseEventHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await Auth.resendSignUp(email);
  };

  const verifyAsync = useAsync(async (data: IConfirmSignUpForm) => {
    await Auth.confirmSignUp(email, data.verificationCode);

    await router.push('/login');
  });

  const handleVerify = handleSubmit(async (data) => {
    await verifyAsync.execute(data);
  });

  return (
    <FullCenterSection
      title="Verify your email"
      description="Enter the 6-digit verification code sent to your email to complete the signup."
    >
      <form className="text-left grid gap-y-2" onSubmit={handleVerify}>
        <Label htmlFor="verificationCode">Verification code</Label>
        <FormElement>
          <input
            id="verificationCode"
            type="text"
            {...register('verificationCode')}
          />
        </FormElement>

        <div className="mt-3">
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

      <div className="mt-5 text-xs">
        Didn&apos;t receive the email?{' '}
        <button
          className="text-primary-500 hover:text-primary-600"
          type="button"
          onClick={handleResend}
        >
          Resend a new code
        </button>
        .
      </div>
    </FullCenterSection>
  );
};

export { ConfirmSignUpForm };
