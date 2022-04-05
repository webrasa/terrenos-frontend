import { useState } from 'react';

import { Button } from '../../button/Button';
import { DetailTable } from '../../table/DetailTable';
import { IMember } from '../../types/IMember';
import { TeamMembersState } from '../../types/TeamMembersState';
import { InviteMemberDialog } from './InviteMemberDialog';

type ITeamTableProps = {
  list: IMember[];
};

const TeamTable = (props: ITeamTableProps) => {
  const [dialogState, setDialogState] = useState<TeamMembersState>(
    TeamMembersState.NONE
  );

  const handleDialogState = (state: TeamMembersState) => {
    setDialogState(state);
  };

  const handleCloseDialog = () => {
    setDialogState(TeamMembersState.NONE);
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
              onClick={() => handleDialogState(TeamMembersState.INVITE_MEMBER)}
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
              <button type="button">Delete</button>
            </td>
          </tr>
        ))}
      </DetailTable>

      <InviteMemberDialog
        show={dialogState === TeamMembersState.INVITE_MEMBER}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export { TeamTable };
