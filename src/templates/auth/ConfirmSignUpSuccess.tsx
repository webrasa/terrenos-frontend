import Link from 'next/link';

import { Button } from '../../button/Button';
import { FullCenterSection } from '../../layout/FullCenterSection';

const ConfirmSignUpSuccess = () => (
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
    description="You can now log into your account with your email."
  >
    <div className="mt-6 text-center">
      <Link href="/login">
        <a>
          <Button>Go to login</Button>
        </a>
      </Link>
    </div>
  </FullCenterSection>
);

export { ConfirmSignUpSuccess };
