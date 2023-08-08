import { useState } from 'react';

import { Button } from '@/button/Button';
import { DetailTable } from '@/table/DetailTable';
import type { IMember } from '@/types/IMember';
import { MemberRole, MemberRoleLabel } from '@/types/IMember';
import type { TeamMembersAction } from '@/types/TeamMembersAction';
import { TeamMembersActionType } from '@/types/TeamMembersAction';
import { requiredRoles } from '@/utils/Auth';

import { DeleteMemberDialog } from './DeleteMemberDialog';
import { EditMemberDialog } from './EditMemberDialog';
import { InviteMemberDialog } from './InviteMemberDialog';
import { TeamTableAction } from './TeamTableAction';
import { TeamTransferOwnership } from './TeamTransferOwnership';
import { TransferOwnershipDialog } from './TransferOwnershipDialog';

type ITeamTableProps = {
  list: IMember[];
  inviteList: IMember[];
  role: MemberRole;
};

const TeamTable = (props: ITeamTableProps) => {
  const [dialogState, setDialogState] = useState<TeamMembersAction>({
    type: TeamMembersActionType.NONE,
  });
  const canTransferOwnership =
    requiredRoles([MemberRole.OWNER], props.role) && props.list.length >= 2; // It should have at least to 2 team members to perform a transfer

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
      <div className="space-y-12">
        <DetailTable
          title="Team members"
          head={
            <tr>
              <th>Email</th>
              <th className="w-20 md:w-40">Role</th>
              {requiredRoles(
                [MemberRole.OWNER, MemberRole.ADMIN],
                props.role,
              ) && <th className="w-20 md:w-52">Action</th>}
            </tr>
          }
        >
          {props.list.map((elt) => (
            <tr key={elt.memberId}>
              <td className="font-semibold text-gray-800">{elt.email}</td>
              <td>{MemberRoleLabel[elt.role]}</td>
              {requiredRoles(
                [MemberRole.OWNER, MemberRole.ADMIN],
                props.role,
              ) && (
                <td>
                  {elt.role !== MemberRole.OWNER && (
                    <TeamTableAction
                      handleDialogState={handleDialogState}
                      elt={elt}
                    />
                  )}
                </td>
              )}
            </tr>
          ))}
        </DetailTable>
        <DetailTable
          title="Pending invites"
          head={
            <tr>
              <th>Email</th>
              <th className="w-20 md:w-40">Role</th>
              {requiredRoles(
                [MemberRole.OWNER, MemberRole.ADMIN],
                props.role,
              ) && <th className="w-20 md:w-52">Action</th>}
            </tr>
          }
          buttons={
            <>
              {requiredRoles(
                [MemberRole.OWNER, MemberRole.ADMIN],
                props.role,
              ) && (
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
              )}
            </>
          }
          emptyDataText="There are no pending invitation."
        >
          {props.inviteList.map((elt) => (
            <tr key={elt.memberId}>
              <td className="font-semibold text-gray-800">{elt.email}</td>
              <td>{MemberRoleLabel[elt.role]}</td>
              {requiredRoles(
                [MemberRole.OWNER, MemberRole.ADMIN],
                props.role,
              ) && (
                <td>
                  <TeamTableAction
                    handleDialogState={handleDialogState}
                    elt={elt}
                  />
                </td>
              )}
            </tr>
          ))}
        </DetailTable>

        <TeamTransferOwnership
          enableTransfer={canTransferOwnership}
          handleDialogState={handleDialogState}
          role={props.role}
        />
      </div>

      <InviteMemberDialog
        show={dialogState.type === TeamMembersActionType.INVITE_MEMBER}
        handleCloseDialog={handleCloseDialog}
      />
      <DeleteMemberDialog
        action={dialogState}
        handleCloseDialog={handleCloseDialog}
      />
      <EditMemberDialog
        action={dialogState}
        handleCloseDialog={handleCloseDialog}
      />
      {canTransferOwnership && (
        <TransferOwnershipDialog
          list={props.list}
          show={dialogState.type === TeamMembersActionType.TRANSFER_OWNERSHIP}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </>
  );
};

export { TeamTable };
