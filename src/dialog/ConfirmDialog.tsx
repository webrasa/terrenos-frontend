import { Dialog } from '@headlessui/react';
import type { ReactNode } from 'react';

import { FormGlobalError } from '@/templates/FormGlobalError';

import { Button } from '../button/Button';
import { BaseDialog } from './BaseDialog';

type IConfirmDialogProps = {
  title: string;
  description: string;
  formGlobalError?: string | null;
  show: boolean;
  handleCancel: () => void;
  button: ReactNode;
};

/**
 * Dialog component for confirmation before a sensitive action.
 * @component
 * @params props - Component props.
 * @param props.title - The title for the dialog.
 * @param props.description - The description for the dialog.
 * @param props.show - Show or hide the dialog.
 * @param props.handleCancel - Callback function when the dialog is close or cancelled.
 * @param props.button - The button to click when the action is confirmed.
 */
const ConfirmDialog = (props: IConfirmDialogProps) => (
  <BaseDialog show={props.show} handleClose={props.handleCancel}>
    <div className="flex">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6 stroke-current stroke-2 text-red-600"
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

        {props.formGlobalError && (
          <FormGlobalError error={props.formGlobalError} />
        )}

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
