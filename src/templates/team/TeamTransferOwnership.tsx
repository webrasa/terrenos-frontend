import { Button } from '@/button/Button';
import { DisabledTooltip } from '@/tooltip/DisabledTooltip';
import type { TeamMembersAction } from '@/types/TeamMembersAction';
import { TeamMembersActionType } from '@/types/TeamMembersAction';

type ITeamTransferOwnershipProps = {
  enableTransfer: boolean;
  handleDialogState: (state: TeamMembersAction) => void;
};

const TeamTransferOwnership = (props: ITeamTransferOwnershipProps) => (
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

export { TeamTransferOwnership };
