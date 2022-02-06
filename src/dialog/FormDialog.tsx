import { ReactNode } from 'react';

import { Dialog } from '@headlessui/react';

import { CancelableDialog } from './CancelableDialog';

type IFormDialogProps = {
  show: boolean;
  handleCancel: () => void;
  button: ReactNode;
  children: ReactNode;
};

const FormDialog = (props: IFormDialogProps) => (
  <CancelableDialog
    show={props.show}
    handleCancel={props.handleCancel}
    button={props.button}
  >
    <Dialog.Title className="text-gray-800 text-xl leading-6 font-medium">
      Change email
    </Dialog.Title>

    <div className="mt-2 text-gray-600">description</div>

    <div className="mt-4">{props.children}</div>
  </CancelableDialog>
);

export { FormDialog };
