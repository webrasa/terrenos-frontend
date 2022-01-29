import { Auth } from 'aws-amplify';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '../../button/Button';
import { FormElement } from '../../form/FormElement';
import { Label } from '../../form/Label';
import { FullCenterSection } from '../../layout/FullCenterSection';

const SignUpForm = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await Auth.signUp({
      username: 'devops@oufnix.com',
      password: 'Test@123123',
    });

    await router.push(
      {
        pathname: '/confirm-signup',
        query: {
          email: 'devops@oufnix.com',
        },
      },
      '/confirm-signup'
    );
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
        <FormElement helper="Your password must be at least 8 characters with a mix of upper and lower case letters, numbers, and symbols.">
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
