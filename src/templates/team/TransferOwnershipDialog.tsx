import { Controller, useForm } from 'react-hook-form';

import { FormDialog } from '@/dialog/FormDialog';
import { Label } from '@/form/Label';
import { Select } from '@/select/Select';
import type { IMember } from '@/types/IMember';

type ITransferOwnershipDialogProps = {
  show: boolean;
  handleCloseDialog: () => void;
};

type ITransferOwnershipForm = {
  member: IMember;
};

const TransferOwnershipDialog = (props: ITransferOwnershipDialogProps) => {
  const { control } = useForm<ITransferOwnershipForm>();

  const handleSubmitDialog = () => {};

  return (
    <FormDialog
      show={props.show}
      handleCancel={props.handleCloseDialog}
      handleSubmit={handleSubmitDialog}
      isSubmitting={false}
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
              currentLabel={'Random'}
              handleChange={onChange}
              optionList={[]}
            />
          )}
        />
      </>
    </FormDialog>
  );
};

export { TransferOwnershipDialog };
