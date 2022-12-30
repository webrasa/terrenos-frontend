import { Button } from '@/button/Button';
import type { TeamMembersAction } from '@/types/TeamMembersAction';
import { TeamMembersActionType } from '@/types/TeamMembersAction';

type ITeamTransferOwnershipType = {
  handleDialogState: (state: TeamMembersAction) => void;
};

const TeamTransferOwnership = (props: ITeamTransferOwnershipType) => (
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
    </div>
  </div>
);

export { TeamTransferOwnership };
