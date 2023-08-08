import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { FormDialog } from '@/dialog/FormDialog';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import type { ISelectOption } from '@/select/Select';
import { Select } from '@/select/Select';
import { MemberRoleLabel } from '@/types/IMember';
import type { TeamMembersAction } from '@/types/TeamMembersAction';
import {
  RoleOptionList,
  TeamMembersActionType,
} from '@/types/TeamMembersAction';
import { setExceptionToFormGlobal } from '@/utils/Forms';

type IEditMemberForm = {
  roleOption: ISelectOption;
};

type IEditMemberDialogProps = {
  action: TeamMembersAction;
  handleCloseDialog: () => void;
};

const EditMemberDialog = (props: IEditMemberDialogProps) => {
  const { currentTeam } = useAuth();
  const { control, handleSubmit, reset } = useForm<IEditMemberForm>({
    defaultValues: {
      roleOption: RoleOptionList[0],
    },
  });
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  useEffect(() => {
    if (props.action.type === TeamMembersActionType.EDIT_MEMBER) {
      reset({
        roleOption: {
          id: props.action.role,
          label: MemberRoleLabel[props.action.role],
        },
      });
    }
  }, [reset, props.action]);

  const editMemberAsync = useAsync(async (data: IEditMemberForm) => {
    if (props.action.type !== TeamMembersActionType.EDIT_MEMBER) {
      throw new Error(
        'The edit dialog should only appears when the user selects one user to edit',
      );
    }

    try {
      await API.put(
        'backend',
        `/team/${currentTeam.id}/edit/${props.action.memberId}`,
        {
          body: {
            role: data.roleOption.id,
          },
        },
      );

      await mutate(`/team/${currentTeam.id}/list-members`);

      props.handleCloseDialog();
    } catch (err) {
      setExceptionToFormGlobal(setFormGlobalError, err);
    }
  });

  const handleSubmitDialog = handleSubmit(async (data) => {
    await editMemberAsync.execute(data);
  });

  return (
    <FormDialog
      show={props.action.type === TeamMembersActionType.EDIT_MEMBER}
      handleCancel={props.handleCloseDialog}
      handleSubmit={handleSubmitDialog}
      isSubmitting={editMemberAsync.pending}
      formGlobalError={formGlobalError}
      title="Edit member"
      description="Update team member role."
      submitText="Save"
    >
      <>
        <Label htmlFor="role">Role</Label>
        <Controller
          name="roleOption"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              value={value}
              currentLabel={value.label}
              handleChange={onChange}
              optionList={RoleOptionList}
            />
          )}
        />
      </>
    </FormDialog>
  );
};

export { EditMemberDialog };
