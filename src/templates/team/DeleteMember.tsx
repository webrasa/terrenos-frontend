import { API } from 'aws-amplify';
import router from 'next/router';
import type { MouseEventHandler } from 'react';
import { mutate } from 'swr';

import { Button } from '../../button/Button';
import { ConfirmDialog } from '../../dialog/ConfirmDialog';
import { useAsync } from '../../hooks/UseAsync';
import { useAuth } from '../../hooks/UseAuth';
import type { TeamMembersAction } from '../../types/TeamMembersAction';
import { TeamMembersActionType } from '../../types/TeamMembersAction';

type IDeleteMemberProps = {
  action: TeamMembersAction;
  handleCloseDialog: () => void;
};

const DeleteMember = (props: IDeleteMemberProps) => {
  const { currentTeam, providerInfo, setCurrentTeamInd } = useAuth();

  const deleteAsync = useAsync(async () => {
    if (props.action.type !== TeamMembersActionType.REMOVE_MEMBER) {
      throw new Error(
        'The delete dialog should only appears when the user selects one user to delete'
      );
    }

    await API.del(
      'backend',
      `/team/${currentTeam.id}/remove/${props.action.memberId}`,
      {}
    );

    if (providerInfo.id === props.action.memberId) {
      // When the user leaves the team/when the user remove himself from the team
      await mutate(`/user/profile?email=${providerInfo.email}`);
      setCurrentTeamInd(0);
      await router.push('/dashboard');
    } else {
      // When the user remove someone else, the default case
      await mutate(`/team/${currentTeam.id}/list-members`);
    }

    props.handleCloseDialog();
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

export { DeleteMember };
