import { Dialog } from '@headlessui/react';
import Link from 'next/link';

import { Button } from '@/button/Button';
import { BaseDialog } from '@/dialog/BaseDialog';

type IChangePasswordSuccessProps = {
  show: boolean;
  handleCloseDialog: () => void;
};

const ChangePasswordSuccess = (props: IChangePasswordSuccessProps) => (
  <BaseDialog show={props.show} handleClose={props.handleCloseDialog}>
    <div className="text-center">
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

      <Dialog.Title className="mt-1 text-xl font-medium leading-6 text-gray-800">
        Your password has been updated
      </Dialog.Title>

      <div className="mt-4 text-sm text-gray-600">
        You can now use your new password to log in.
      </div>

      <div className="mt-6">
        <Link href="/dashboard">
          <a>
            <Button sm>Go back to Dashboard</Button>
          </a>
        </Link>
      </div>
    </div>
  </BaseDialog>
);

export { ChangePasswordSuccess };
