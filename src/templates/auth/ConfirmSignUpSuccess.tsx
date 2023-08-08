import { Hub } from 'aws-amplify';
import Link from 'next/link';
import router from 'next/router';
import { useEffect } from 'react';

import { Button } from '../../button/Button';
import { FullCenterSection } from '../../layouts/FullCenterSection';

const ConfirmSignUpSuccess = () => {
  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      const { event } = payload;

      if (event === 'autoSignIn') {
        router.push('/dashboard');
      } else if (event === 'autoSignIn_failure') {
        router.push('/login');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <FullCenterSection
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block h-16 w-16 stroke-current text-primary-500"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 0h24v24H0z" stroke="none" />
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      }
      title="Your email has been verified"
      description="Please wait while you will be redirected to your dashboard."
    >
      <div className="mt-6 text-center">
        <Link href="/dashboard">
          <Button>Go to dashboard</Button>
        </Link>
      </div>
    </FullCenterSection>
  );
};

export { ConfirmSignUpSuccess };
