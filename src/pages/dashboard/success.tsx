import Link from 'next/link';

import { Button } from '@/button/Button';
import { getShell } from '@/layouts/Shell';
import { MessageState } from '@/message/MessageState';
import type { NextPageWithLayout } from '@/utils/NextLayout';

const Success: NextPageWithLayout = () => (
  <MessageState
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
    title="Payment successful"
    description="Thank you for your subscription, you can now enjoy your new plan."
    cta={
      <Link href="/dashboard/settings">
        <Button>Go back to Settings</Button>
      </Link>
    }
  />
);

Success.getLayout = getShell('Payment');

export default Success;
