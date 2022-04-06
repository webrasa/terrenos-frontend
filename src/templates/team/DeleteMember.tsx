import { MouseEventHandler } from 'react';

import { API } from 'aws-amplify';
import router from 'next/router';
import { mutate } from 'swr';

import { Button } from '../../button/Button';
import { ConfirmDialog } from '../../dialog/ConfirmDialog';
import { useAsync } from '../../hooks/UseAsync';
import { useAuth } from '../../hooks/UseAuth';
import { MemberStatus } from '../../types/IMember';
import {
  TeamMembersAction,
  TeamMembersActionType,
} from '../../types/TeamMembersAction';

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

    const queryParams =
      props.action.status === MemberStatus.PENDING ? '?isPending=true' : '';

    await API.del(
      'backend',
      `/team/${currentTeam.id}/remove/${props.action.memberId}${queryParams}`,
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
      title="Your title here"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu consectetur purus. In laoreet tincidunt libero vitae sagittis."
      handleCancel={props.handleCloseDialog}
      button={
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteAsync.pending}
        >
          <Button sm red loading={deleteAsync.pending}>
            Delete
          </Button>
        </button>
      }
    />
  );
};

export { DeleteMember };
