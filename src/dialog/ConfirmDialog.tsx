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
  <BaseDialog show={props.show} handleCancel={props.handleCancel}>
    <div className="flex">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-red-600 stroke-current w-6 h-6 stroke-2"
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
        <Dialog.Title className="text-gray-800 text-xl leading-6 font-medium">
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
