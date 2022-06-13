import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Alert } from '@/alert/Alert';
import { Button } from '@/button/Button';
import { SocialButton } from '@/button/SocialButton';
import { Divider } from '@/divider/Divider';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { FullCenterSection } from '@/layout/FullCenterSection';
import { mapAmplifyMessage } from '@/utils/AmplifyMessageMap';

type ILoginForm = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ILoginForm>();
  const [error, setError] = useState<string | null>(null);

  const handleSignInGoogle = () => {
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  };

  const handleSignInFacebook = () => {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Facebook,
    });
  };

  const resendVerificationCode = async (data: ILoginForm) => {
    try {
      await Auth.resendSignUp(data.email);

      sessionStorage.setItem('confirm-signup-email', data.email);

      await router.push('/confirm-signup');
    } catch (err: any) {
      setError(mapAmplifyMessage(err));
    }
  };

  const loginAsync = useAsync(async (data: ILoginForm) => {
    try {
      await Auth.signIn({
        username: data.email,
        password: data.password,
      });

      await router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'UserNotConfirmedException') {
        await resendVerificationCode(data);
      } else {
        setError(mapAmplifyMessage(err));
      }
    }
  });

  const handleLogin = handleSubmit(async (data) => {
    await loginAsync.execute(data);
  });

  return (
    <FullCenterSection title="Sign in to your account">
      <div className="mt-5 space-y-4">
        <button className="w-full" type="button" onClick={handleSignInGoogle}>
          <SocialButton
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="b">
                  <use xlinkHref="#a" overflow="visible" />
                </clipPath>
                <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                <path
                  clipPath="url(#b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                />
              </svg>
            }
          >
            Sign in with Google
          </SocialButton>
        </button>
        <button className="w-full" type="button" onClick={handleSignInFacebook}>
          <SocialButton
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14222 14222">
                <circle cx="7111" cy="7112" r="7111" fill="#1977f3" />
                <path
                  d="M9879 9168l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4969c362 57 733 86 1111 86s749-30 1111-86V9168z"
                  fill="#fff"
                />
              </svg>
            }
          >
            Sign in with Facebook
          </SocialButton>
        </button>
      </div>
      <Divider>Or continue with</Divider>

      {error && <Alert text={error} />}
      <form className="grid gap-y-2" onSubmit={handleLogin}>
        <Label htmlFor="email">Email</Label>
        <FormElement>
          <input id="email" type="text" {...register('email')} />
        </FormElement>

        <Label htmlFor="password">Password</Label>
        <FormElement>
          <input id="password" type="password" {...register('password')} />
        </FormElement>

        <div className="mt-3">
          <button
            type="submit"
            className="w-full"
            disabled={loginAsync.pending}
          >
            <Button full loading={loginAsync.pending}>
              Sign in
            </Button>
          </button>
        </div>
      </form>

      <div className="mt-5 text-center text-xs">
        <div>
          <Link href="/forgot-password">
            <a className="text-primary-500 hover:text-primary-600">
              Forgot your password?
            </a>
          </Link>
        </div>
        <div>
          Don&apos;t have an account?{' '}
          <Link href="/signup">
            <a className="text-primary-500 hover:text-primary-600">
              Sign up now
            </a>
          </Link>
          .
        </div>
      </div>
    </FullCenterSection>
  );
};

export { LoginForm };
