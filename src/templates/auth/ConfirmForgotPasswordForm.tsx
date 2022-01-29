import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

import { Button } from '../../button/Button';
import { FormElement } from '../../form/FormElement';
import { Label } from '../../form/Label';
import { FullCenterSection } from '../../layout/FullCenterSection';

const ConfirmForgotPasswordForm = () => {
  const router = useRouter();
  const email = `${router.query.email}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await Auth.forgotPasswordSubmit(email, '', '');

    await router.push(
      {
        pathname: '/login',
        query: {
          email: 'devops@oufnix.com',
        },
      },
      '/login'
    );
  };

  return (
    <FullCenterSection
      title="Reset your password"
      description="Enter the 6-digit verification code sent to your email and set your new password."
    >
      <form className="text-left grid gap-y-2" onSubmit={handleSubmit}>
        <Label htmlFor="code">Verification code</Label>
        <FormElement>
          <input id="code" type="text" />
        </FormElement>
        <Label htmlFor="password">New password</Label>
        <FormElement helper="Your password must be at least 8 characters with a mix of upper and lower case letters, numbers, and symbols.">
          <input id="password" type="text" />
        </FormElement>

        <div className="mt-3">
          <button type="submit" className="w-full">
            <Button full>Reset password</Button>
          </button>
        </div>
      </form>
    </FullCenterSection>
  );
};

export { ConfirmForgotPasswordForm };
