import { ReactNode } from 'react';

import { Dialog } from '@headlessui/react';

import { CancelableDialog } from '../dialog/CancelableDialog';

type IAccountSettingDialogProps = {
  show: boolean;
  handleCancel: () => void;
  button: ReactNode;
};

const AccountSettingDialog = (props: IAccountSettingDialogProps) => (
  <CancelableDialog
    show={props.show}
    handleCancel={props.handleCancel}
    button={props.button}
  >
    <Dialog.Title className="text-gray-800 text-xl leading-6 font-medium">
      Change email
    </Dialog.Title>

    <div className="mt-2 text-sm text-gray-600">description</div>
  </CancelableDialog>
);

export { AccountSettingDialog };
