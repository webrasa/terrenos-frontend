import { Button } from '@/button/Button';
import { DisabledTooltip } from '@/tooltip/DisabledTooltip';
import { MemberRole } from '@/types/IMember';
import type { TeamMembersAction } from '@/types/TeamMembersAction';
import { TeamMembersActionType } from '@/types/TeamMembersAction';
import { requiredRoles } from '@/utils/Auth';

type ITeamTransferOwnershipProps = {
  enableTransfer: boolean;
  handleDialogState: (state: TeamMembersAction) => void;
  role: MemberRole;
};

const TeamTransferOwnership = (props: ITeamTransferOwnershipProps) => {
  if (!requiredRoles([MemberRole.OWNER], props.role)) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-lg font-semibold text-gray-800">
          Transfer ownership
        </div>

        <div className="mt-1">
          Transfer the owner role of this account to a different team member.
        </div>
      </div>

      <div>
        <DisabledTooltip
          hideLabel={props.enableTransfer}
          label="Please add another team member before transferring ownership"
          placement="left"
        >
          <button
            type="button"
            onClick={() =>
              props.handleDialogState({
                type: TeamMembersActionType.TRANSFER_OWNERSHIP,
              })
            }
          >
            <Button sm>Transfer ownership</Button>
          </button>
        </DisabledTooltip>
      </div>
    </div>
  );
};

export { TeamTransferOwnership };
