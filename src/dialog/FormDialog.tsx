import { ReactNode } from 'react';

import { Dialog } from '@headlessui/react';

import { Alert } from '../alert/Alert';
import { Button } from '../button/Button';
import { BaseDialog } from './BaseDialog';

type IFormDialogProps = {
  show: boolean;
  handleCancel: () => void;
  handleSubmit: () => void;
  children: ReactNode;
  isSubmitting: boolean;
  error: string | null;
  title: string;
  description: string;
  hideCancelButton?: boolean;
};

const FormDialog = (props: IFormDialogProps) => (
  <BaseDialog show={props.show} handleCancel={props.handleCancel}>
    <Dialog.Title className="text-gray-800 text-xl leading-6 font-medium">
      {props.title}
    </Dialog.Title>

    <div className="mt-2 text-gray-600 mb-2">{props.description}</div>

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
            Save
          </Button>
        </button>
      </div>
    </form>
  </BaseDialog>
);

export { FormDialog };
