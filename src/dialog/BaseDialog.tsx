import { ReactNode } from 'react';

import { Dialog } from '@headlessui/react';

type IBaseDialogProps = {
  show: boolean;
  handleCancel: () => void;
  children: ReactNode;
};

const BaseDialog = (props: IBaseDialogProps) => (
  <Dialog
    className="fixed z-50 inset-0 overflow-y-auto"
    open={props.show}
    onClose={props.handleCancel}
  >
    <div className="flex items-center justify-center min-h-screen">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <span className="inline-block h-screen align-middle" aria-hidden="true">
        &#8203;
      </span>
      <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden bg-white transition-all transform shadow-xl rounded-lg">
        {props.children}
      </div>
    </div>
  </Dialog>
);

export { BaseDialog };
