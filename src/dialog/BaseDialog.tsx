import { ReactNode } from 'react';

import { Dialog } from '@headlessui/react';

type IBaseDialogProps = {
  show: boolean;
  handleClose: () => void;
  children: ReactNode;
};

/**
 * The Dialog (Modal) component, a floating layer over the current page.
 * @component
 * @params props - Component props.
 * @param props.show - Indicates if the Dialog needs be open or not.
 * @param props.handleClose - Called when the Dialog is dismissed.
 * @param props.children - The Dialog content, the content to display inside the Modal.
 */
const BaseDialog = (props: IBaseDialogProps) => (
  <Dialog
    className="fixed inset-0 z-50 overflow-y-auto"
    open={props.show}
    onClose={props.handleClose}
  >
    <div className="flex min-h-screen items-center justify-center">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="relative my-8 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {props.children}
      </div>
    </div>
  </Dialog>
);

export { BaseDialog };
