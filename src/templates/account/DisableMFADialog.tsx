import { Button } from '@/button/Button';
import { ConfirmDialog } from '@/dialog/ConfirmDialog';

type IDisableMFADialogProps = {
  show: boolean;
  handleCloseDialog: () => void;
};

const DisableMFADialog = (props: IDisableMFADialogProps) => (
  <ConfirmDialog
    show={props.show}
    title="Disable Two-Factor Authentication"
    description="Are you sure you want to disable Two-Factor Authentication? This will decrease the security of your account and we highly recommend keeping it enabled."
    handleCancel={props.handleCloseDialog}
    // formGlobalError={formGlobalError}
    button={
      <button
        type="button"
        // onClick={handleDeleteTeam}
        // disabled={deleteTeamAsync.pending}
      >
        <Button sm red>
          Disable
        </Button>
      </button>
    }
  />
);

export { DisableMFADialog };
