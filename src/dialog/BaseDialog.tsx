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
    className="overflow-y-auto fixed inset-0 z-50"
    open={props.show}
    onClose={props.handleClose}
  >
    <div className="flex justify-center items-center min-h-screen">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="relative p-6 my-8 w-full max-w-md bg-white rounded-lg shadow-xl">
        {props.children}
      </div>
    </div>
  </Dialog>
);

export { BaseDialog };
