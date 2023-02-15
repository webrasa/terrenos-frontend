import Link from 'next/link';

import { Button } from '@/button/Button';
import { SuccessDialog } from '@/dialog/SuccessDialog';

type IChangePasswordSuccessProps = {
  show: boolean;
  handleCloseDialog: () => void;
};

const ChangePasswordSuccess = (props: IChangePasswordSuccessProps) => (
  <SuccessDialog
    show={props.show}
    handleClose={props.handleCloseDialog}
    title="Your password has been updated"
    description="You can now use your new password to log in."
    action={
      <Link href="/dashboard">
        <Button sm>Go back to Dashboard</Button>
      </Link>
    }
  />
);

export { ChangePasswordSuccess };
