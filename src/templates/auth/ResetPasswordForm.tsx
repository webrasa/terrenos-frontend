import { Auth } from 'aws-amplify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Button } from '../../button/Button';
import { FormElement } from '../../form/FormElement';
import { Label } from '../../form/Label';
import { useAsync } from '../../hooks/UseAsync';
import { FullCenterSection } from '../../layout/FullCenterSection';

type IResetPasswordForm = {
  email: string;
};

const ResetPasswordForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IResetPasswordForm>();

  const sendAsync = useAsync(async (data: IResetPasswordForm) => {
    await Auth.forgotPassword(data.email);

    await router.push(
      {
        pathname: '/confirm-forgot-password',
        query: {
          email: data.email,
        },
      },
      '/confirm-forgot-password'
    );
  });

  const handleSend = handleSubmit(async (data) => {
    await sendAsync.execute(data);
  });

  return (
    <FullCenterSection
      title="Forgot your password?"
      description="Enter your email and we'll send you a verification code."
    >
      <form className="text-left grid gap-y-2" onSubmit={handleSend}>
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

      <div className="mt-5 text-xs">
        <Link href="/login">
          <a className="text-primary-500 hover:text-primary-600">
            Go back to login
          </a>
        </Link>
      </div>
    </FullCenterSection>
  );
};

export { ResetPasswordForm };
