import { ReactNode } from 'react';

import { Dialog } from '@headlessui/react';

import { Button } from '../button/Button';

type ICancelableDialogProps = {
  show: boolean;
  handleCancel: () => void;
  children: ReactNode;
  button: ReactNode;
};

const CancelableDialog = (props: ICancelableDialogProps) => (
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
  </Dialog>
);

export { CancelableDialog };
