import { ReactNode } from 'react';

import { Dialog } from '@headlessui/react';

import { Button } from '../button/Button';
import { BaseDialog } from './BaseDialog';

type IConfirmDialogProps = {
  title: string;
  description: string;
  show: boolean;
  handleCancel: () => void;
  button: ReactNode;
};

const ConfirmDialog = (props: IConfirmDialogProps) => (
  <BaseDialog show={props.show} handleClose={props.handleCancel}>
    <div className="flex">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 stroke-current stroke-2 text-red-600"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 0h24v24H0z" stroke="none" />
          <path d="M12 9v2m0 4v.01M5 19h14a2 2 0 001.84-2.75L13.74 4a2 2 0 00-3.5 0l-7.1 12.25A2 2 0 004.89 19" />
        </svg>
      </div>

      <div className="ml-4">
        <Dialog.Title className="text-xl font-medium leading-6 text-gray-800">
          {props.title}
        </Dialog.Title>

        <div className="mt-2 text-sm text-gray-600">{props.description}</div>

        <div className="mt-4 flex justify-end space-x-2">
          <button type="button" onClick={props.handleCancel}>
            <Button sm secondary>
              Cancel
            </Button>
          </button>

          {props.button}
        </div>
      </div>
    </div>
  </BaseDialog>
);

export { ConfirmDialog };
