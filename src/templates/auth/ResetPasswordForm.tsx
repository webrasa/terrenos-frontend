import { Auth } from 'aws-amplify';
import Link from 'next/link';
import router from 'next/router';

import { Button } from '../../button/Button';
import { FormElement } from '../../form/FormElement';
import { Label } from '../../form/Label';
import { FullCenterSection } from '../../layout/FullCenterSection';

const ResetPasswordForm = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await Auth.forgotPassword('devops@oufnix.com');

    await router.push(
      {
        pathname: '/confirm-forgot-password',
        query: {
          email: 'devops@oufnix.com',
        },
      },
      '/confirm-forgot-password'
    );
  };

  return (
    <FullCenterSection
      title="Forgot your password?"
      description="Enter your email and we'll send you a verification code."
    >
      <form className="text-left grid gap-y-2" onSubmit={handleSubmit}>
        <Label htmlFor="email">Email</Label>
        <FormElement>
          <input id="email" type="text" />
        </FormElement>

        <div className="mt-3">
          <button type="submit" className="w-full">
            <Button full>Send email</Button>
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
