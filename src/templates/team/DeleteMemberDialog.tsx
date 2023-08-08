import { API } from 'aws-amplify';
import router from 'next/router';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import { mutate } from 'swr';

import { Button } from '@/button/Button';
import { ConfirmDialog } from '@/dialog/ConfirmDialog';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import type { TeamMembersAction } from '@/types/TeamMembersAction';
import { TeamMembersActionType } from '@/types/TeamMembersAction';
import { setExceptionToFormGlobal } from '@/utils/Forms';

type IDeleteMemberDialogProps = {
  action: TeamMembersAction;
  handleCloseDialog: () => void;
};

const DeleteMemberDialog = (props: IDeleteMemberDialogProps) => {
  const { currentTeam, providerInfo, setCurrentTeamInd } = useAuth();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const deleteAsync = useAsync(async () => {
    if (props.action.type !== TeamMembersActionType.REMOVE_MEMBER) {
      throw new Error(
        'The delete dialog should only appears when the user selects one user to delete',
      );
    }

    try {
      await API.del(
        'backend',
        `/team/${currentTeam.id}/remove/${props.action.memberId}`,
        {},
      );

      if (providerInfo.id === props.action.memberId) {
        // When the user leaves the team/when the user remove himself from the team
        await mutate(
          `/user/profile?email=${encodeURIComponent(providerInfo.email)}`,
        );
        setCurrentTeamInd(0);
        await router.push('/dashboard');
      } else {
        // When the user remove someone else, the default case
        await mutate(`/team/${currentTeam.id}/list-members`);
      }

      props.handleCloseDialog();
    } catch (err) {
      setExceptionToFormGlobal(setFormGlobalError, err);
    }
  });

  const handleDelete: MouseEventHandler = async (event) => {
    event.preventDefault();
    await deleteAsync.execute();
  };

  return (
    <ConfirmDialog
      show={props.action.type === TeamMembersActionType.REMOVE_MEMBER}
      title="Remove member"
      description="Are you sure you want to remove this user from the team?"
      handleCancel={props.handleCloseDialog}
      formGlobalError={formGlobalError}
      button={
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteAsync.pending}
        >
          <Button sm red loading={deleteAsync.pending}>
            Remove
          </Button>
        </button>
      }
    />
  );
};

export { DeleteMemberDialog };
