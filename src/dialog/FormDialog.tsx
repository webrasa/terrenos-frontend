import { Dialog } from '@headlessui/react';
import type { ReactNode } from 'react';

import { Alert } from '@/alert/Alert';
import { Button } from '@/button/Button';

import { BaseDialog } from './BaseDialog';

type IFormDialogProps = {
  show: boolean;
  handleCancel: () => void;
  handleSubmit: () => void;
  children: ReactNode;
  isSubmitting: boolean;
  error?: string | null;
  title: string;
  description: string;
  hideCancelButton?: boolean;
  submitText?: string;
};

/**
 * Dialog component with form.
 * @component
 * @params props - Component props.
 * @param props.show - Show or hide the dialog.
 * @param props.handleCancel - Callback function when the dialog is close or cancelled.
 * @param props.handleSubmit - Callback function when the form is submitted.
 * @param props.children - The form inputs.
 * @param props.isSubmitting - Indicates if a submit event is currently processing.
 * @param props.title - The title for the dialog.
 * @param props.description - The description for the dialog.
 * @param props.hideCancelButton - Indicates if the cancel button need to be hidden.
 * @param props.submitText - Text for the submit button.
 */
const FormDialog = (props: IFormDialogProps) => (
  <BaseDialog show={props.show} handleClose={props.handleCancel}>
    <Dialog.Title className="text-xl font-medium leading-6 text-gray-800">
      {props.title}
    </Dialog.Title>

    <div className="my-2 text-gray-600">{props.description}</div>

    {props.error && <Alert text={props.error} />}

    <form className="grid gap-y-2" onSubmit={props.handleSubmit}>
      {props.children}

      <div className="mt-4 flex justify-end space-x-2">
        {!props.hideCancelButton && (
          <button
            type="button"
            onClick={props.handleCancel}
            disabled={props.isSubmitting}
          >
            <Button sm secondary>
              Cancel
            </Button>
          </button>
        )}

        <button type="submit" disabled={props.isSubmitting}>
          <Button sm loading={props.isSubmitting}>
            {props.submitText ?? 'Save'}
          </Button>
        </button>
      </div>
    </form>
  </BaseDialog>
);

export { FormDialog };
