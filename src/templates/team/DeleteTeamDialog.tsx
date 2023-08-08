import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import { mutate } from 'swr';

import { Button } from '@/button/Button';
import { ConfirmDialog } from '@/dialog/ConfirmDialog';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import { AppConfig } from '@/utils/AppConfig';
import { setExceptionToFormGlobal } from '@/utils/Forms';

type IDeleteTeamDialogProps = {
  show: boolean;
  handleCloseDialog: () => void;
};

const DeleteTeamDialog = (props: IDeleteTeamDialogProps) => {
  const { currentTeam, setCurrentTeamInd, providerInfo } = useAuth();
  const router = useRouter();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const deleteTeamAsync = useAsync(async () => {
    try {
      await API.del('backend', `/team/${currentTeam.id}`, {});

      await mutate(
        `/user/profile?email=${encodeURIComponent(providerInfo.email)}`,
      );
      setCurrentTeamInd(0);
      await router.push('/dashboard');
    } catch (err) {
      setExceptionToFormGlobal(setFormGlobalError, err);
    }
  });

  const handleDeleteTeam: MouseEventHandler = async (event) => {
    event.preventDefault();
    await deleteTeamAsync.execute();
  };

  return (
    <ConfirmDialog
      show={props.show}
      title="Delete team"
      description={`Permanently delete team and all its data stored on ${AppConfig.site_name}. Team deletion cannot be undone. Please be certain.`}
      handleCancel={props.handleCloseDialog}
      formGlobalError={formGlobalError}
      button={
        <button
          type="button"
          onClick={handleDeleteTeam}
          disabled={deleteTeamAsync.pending}
        >
          <Button sm red loading={deleteTeamAsync.pending}>
            Delete forever
          </Button>
        </button>
      }
    />
  );
};

export { DeleteTeamDialog };
