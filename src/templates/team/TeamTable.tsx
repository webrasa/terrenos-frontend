import { useState } from 'react';

import { Button } from '@/button/Button';
import { DetailTable } from '@/table/DetailTable';
import type { IMember } from '@/types/IMember';
import { MemberRoleLabel, MemberStatusLabel } from '@/types/IMember';
import type { TeamMembersAction } from '@/types/TeamMembersAction';
import { TeamMembersActionType } from '@/types/TeamMembersAction';

import { DeleteMember } from './DeleteMember';
import { EditMemberDialog } from './EditMemberDialog';
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
            <th className="w-20 md:w-40">Role</th>
            <th className="w-20 md:w-40">Status</th>
            <th className="w-20 md:w-52">Action</th>
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
          <tr key={elt.memberId}>
            <td>{elt.email}</td>
            <td>{MemberRoleLabel[elt.role]}</td>
            <td>{MemberStatusLabel[elt.status]}</td>
            <td>
              <button
                type="button"
                onClick={() =>
                  handleDialogState({
                    type: TeamMembersActionType.EDIT_MEMBER,
                    memberId: elt.memberId,
                    role: elt.role,
                  })
                }
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() =>
                  handleDialogState({
                    type: TeamMembersActionType.REMOVE_MEMBER,
                    memberId: elt.memberId,
                    status: elt.status,
                  })
                }
              >
                Remove
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
      <EditMemberDialog
        action={dialogState}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export { TeamTable };
