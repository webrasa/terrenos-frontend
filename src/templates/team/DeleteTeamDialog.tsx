import { MouseEventHandler } from 'react';

import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

import { Button } from '../../button/Button';
import { ConfirmDialog } from '../../dialog/ConfirmDialog';
import { useAsync } from '../../hooks/UseAsync';
import { useAuth } from '../../hooks/UseAuth';

type IDeleteTeamDialogProps = {
  show: boolean;
  handleCloseDialog: () => void;
};

const DeleteTeamDialog = (props: IDeleteTeamDialogProps) => {
  const { currentTeam, setCurrentTeamInd, providerInfo } = useAuth();
  const router = useRouter();

  const deleteTeamAsync = useAsync(async () => {
    await API.del('backend', `/team/${currentTeam.id}`, {});

    await mutate(`/user/profile?email=${providerInfo.email}`);
    setCurrentTeamInd(0);
    await router.push('/dashboard');
  });

  const handleDeleteTeam: MouseEventHandler = async (event) => {
    event.preventDefault();
    await deleteTeamAsync.execute();
  };

  return (
    <ConfirmDialog
      show={props.show}
      title="Your title here"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu consectetur purus. In laoreet tincidunt libero vitae sagittis."
      handleCancel={props.handleCloseDialog}
      button={
        <button
          type="button"
          onClick={handleDeleteTeam}
          disabled={deleteTeamAsync.pending}
        >
          <Button sm red loading={deleteTeamAsync.pending}>
            Delete
          </Button>
        </button>
      }
    />
  );
};

export { DeleteTeamDialog };
