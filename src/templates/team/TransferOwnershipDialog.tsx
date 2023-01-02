import { API } from 'aws-amplify';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { FormDialog } from '@/dialog/FormDialog';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import type { ISelectOption } from '@/select/Select';
import { Select } from '@/select/Select';
import type { IMember } from '@/types/IMember';
import { MemberRole } from '@/types/IMember';
import { setExceptionToFormGlobal } from '@/utils/Forms';

type ITransferOwnershipDialogProps = {
  list: IMember[];
  show: boolean;
  handleCloseDialog: () => void;
};

type ITransferOwnershipForm = {
  member: ISelectOption;
};

const TransferOwnershipDialog = (props: ITransferOwnershipDialogProps) => {
  const { currentTeam } = useAuth();
  const optionList = props.list
    .filter((elt) => elt.role !== MemberRole.OWNER)
    .map((elt) => ({
      id: elt.memberId,
      label: elt.email,
    }));
  const { control, handleSubmit } = useForm<ITransferOwnershipForm>({
    defaultValues: {
      member: optionList[0],
    },
  });
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const transferOwnershipAsync = useAsync(
    async (data: ITransferOwnershipForm) => {
      try {
        await API.put(
          'backend',
          `/team/${currentTeam.id}/transfer-ownership/${data.member.id}`,
          {}
        );

        await mutate(`/team/${currentTeam.id}/list-members`);

        props.handleCloseDialog();
      } catch (err) {
        setExceptionToFormGlobal(setFormGlobalError, err);
      }
    }
  );

  const handleSubmitDialog = handleSubmit(async (data) => {
    await transferOwnershipAsync.execute(data);
  });

  return (
    <FormDialog
      show={props.show}
      handleCancel={props.handleCloseDialog}
      handleSubmit={handleSubmitDialog}
      isSubmitting={transferOwnershipAsync.pending}
      formGlobalError={formGlobalError}
      title="Edit member"
      description="Update team member role."
      submitText="Save"
    >
      <>
        <Label htmlFor="role">Role</Label>
        <Controller
          name="member"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              value={value}
              currentLabel={value.label}
              handleChange={onChange}
              optionList={optionList}
            />
          )}
        />
      </>
    </FormDialog>
  );
};

export { TransferOwnershipDialog };
