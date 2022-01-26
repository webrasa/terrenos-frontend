import { Auth } from 'aws-amplify';
import Link from 'next/link';

import { Button } from '../button/Button';
import { FormElement } from '../form/FormElement';
import { Label } from '../form/Label';
import { FullCenterSection } from '../layout/FullCenterSection';

const SignUpForm = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await Auth.signUp({
      username: 'devops@oufnix.com',
      password: 'Test123@123123',
    });
  };

  return (
    <FullCenterSection
      title="Create your account"
      description="Sign up with your email address and password."
    >
      <form className="text-left grid gap-y-2" onSubmit={handleSubmit}>
        <Label htmlFor="email">Email</Label>
        <FormElement>
          <input id="email" type="text" />
        </FormElement>

        <Label htmlFor="password">Password</Label>
        <FormElement>
          <input id="password" type="text" />
        </FormElement>

        <div className="mt-3">
          <button type="submit" className="w-full">
            <Button full>Sign up</Button>
          </button>
        </div>
      </form>

      <div className="mt-5 text-xs">
        Already have an account?{' '}
        <Link href="/login">
          <a className="text-primary-500 hover:text-primary-600">Log in now</a>
        </Link>
        .
      </div>
    </FullCenterSection>
  );
};

export { SignUpForm };
