import type { IMember } from '@/types/IMember';
import type { TeamMembersAction } from '@/types/TeamMembersAction';
import { TeamMembersActionType } from '@/types/TeamMembersAction';

type ITeamTableActionProps = {
  handleDialogState: (state: TeamMembersAction) => void;
  elt: IMember;
};

const TeamTableAction = (props: ITeamTableActionProps) => (
  <>
    <button
      type="button"
      onClick={() =>
        props.handleDialogState({
          type: TeamMembersActionType.EDIT_MEMBER,
          memberId: props.elt.memberId,
          role: props.elt.role,
        })
      }
    >
      Edit
    </button>
    <button
      type="button"
      onClick={() =>
        props.handleDialogState({
          type: TeamMembersActionType.REMOVE_MEMBER,
          memberId: props.elt.memberId,
        })
      }
    >
      Remove
    </button>
  </>
);

export { TeamTableAction };
