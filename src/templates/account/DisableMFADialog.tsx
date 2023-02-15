import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';

import { Button } from '@/button/Button';
import { ConfirmDialog } from '@/dialog/ConfirmDialog';
import { useAsync } from '@/hooks/UseAsync';
import { mapAmplifyMessageSettings } from '@/utils/AmplifyMessageMap';

type IDisableMFADialogProps = {
  show: boolean;
  handleCloseDialog: () => void;
};

const DisableMFADialog = (props: IDisableMFADialogProps) => {
  const router = useRouter();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const disableMFAAsync = useAsync(async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      await Auth.setPreferredMFA(user, 'NOMFA');

      router.reload();
    } catch (err) {
      setFormGlobalError(mapAmplifyMessageSettings(err));
    }
  });

  const handleDisableMFA: MouseEventHandler = async (event) => {
    event.preventDefault();
    await disableMFAAsync.execute();
  };

  return (
    <ConfirmDialog
      show={props.show}
      title="Disable Two-Factor Authentication"
      description="Are you sure you want to disable Two-Factor Authentication? This will decrease the security of your account and we highly recommend keeping it enabled."
      handleCancel={props.handleCloseDialog}
      formGlobalError={formGlobalError}
      button={
        <button
          type="button"
          onClick={handleDisableMFA}
          disabled={disableMFAAsync.pending}
        >
          <Button sm red loading={disableMFAAsync.pending}>
            Disable
          </Button>
        </button>
      }
    />
  );
};

export { DisableMFADialog };
