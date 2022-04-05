import { useState } from 'react';

import { Button } from '../../button/Button';
import { DetailTable } from '../../table/DetailTable';
import { IMember } from '../../types/IMember';
import {
  TeamMembersActionType,
  TeamMembersAction,
} from '../../types/TeamMembersAction';
import { DeleteMember } from './DeleteMember';
import { InviteMemberDialog } from './InviteMemberDialog';

type ITeamTableProps = {
  list: IMember[];
};

const TeamTable = (props: ITeamTableProps) => {
  const [dialogState, setDialogState] = useState<TeamMembersAction>({
    type: TeamMembersActionType.NONE,
  });

  const handleDialogState = (state: TeamMembersAction) => {
    setDialogState(state);
  };

  const handleCloseDialog = () => {
    setDialogState({
      type: TeamMembersActionType.NONE,
    });
  };

  return (
    <>
      <DetailTable
        title="Team members"
        head={
          <tr>
            <th>Email</th>
            <th className="w-60">Status</th>
            <th className="w-60">Action</th>
          </tr>
        }
        buttons={
          <>
            <button
              type="button"
              onClick={() =>
                handleDialogState({
                  type: TeamMembersActionType.INVITE_MEMBER,
                })
              }
            >
              <Button sm>Invite member</Button>
            </button>
          </>
        }
      >
        {props.list.map((elt) => (
          <tr key={elt.userId}>
            <td>{elt.email}</td>
            <td>{elt.status}</td>
            <td>
              <button
                type="button"
                onClick={() =>
                  handleDialogState({
                    type: TeamMembersActionType.REMOVE_MEMBER,
                    userId: elt.userId,
                  })
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </DetailTable>

      <InviteMemberDialog
        show={dialogState.type === TeamMembersActionType.INVITE_MEMBER}
        handleCloseDialog={handleCloseDialog}
      />
      <DeleteMember
        action={dialogState}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export { TeamTable };
