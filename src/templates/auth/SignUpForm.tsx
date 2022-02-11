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

type ISignUpForm = {
  email: string;
  password: string;
};

const SignUpForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ISignUpForm>();
  const [error, setError] = useState<string | null>(null);

  const signUpAsync = useAsync(async (data: ISignUpForm) => {
    try {
      await Auth.signUp({
        username: data.email,
        password: data.password,
      });

      sessionStorage.setItem('confirm-signup-email', data.email);

      await router.push('/confirm-signup');
    } catch (err) {
      setError(mapAmplifyMessage(err));
    }
  });

  const handleSignUp = handleSubmit(async (data) => {
    await signUpAsync.execute(data);
  });

  return (
    <FullCenterSection
      title="Create your account"
      description="Sign up with your email address and password."
    >
      {error && <Alert text={error} />}

      <form className="grid gap-y-2" onSubmit={handleSignUp}>
        <Label htmlFor="email">Email</Label>
        <FormElement>
          <input id="email" type="text" {...register('email')} />
        </FormElement>

        <Label htmlFor="password">Password</Label>
        <FormElement helper="Your password must be at least 8 characters with a mix of upper and lower case letters, numbers, and symbols.">
          <input id="password" type="password" {...register('password')} />
        </FormElement>

        <div className="mt-3">
          <button
            type="submit"
            className="w-full"
            disabled={signUpAsync.pending}
          >
            <Button full loading={signUpAsync.pending}>
              Sign up
            </Button>
          </button>
        </div>
      </form>

      <div className="mt-5 text-xs text-center">
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