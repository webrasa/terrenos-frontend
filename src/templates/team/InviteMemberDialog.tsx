import { ErrorMessage } from '@hookform/error-message';
import { API } from 'aws-amplify';
import { useErrorHandler } from 'react-error-boundary';
import { Controller, useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { FormDialog } from '@/dialog/FormDialog';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import type { ISelectOption } from '@/select/Select';
import { Select } from '@/select/Select';
import { RoleOptionList } from '@/types/TeamMembersAction';
import { setFormError } from '@/utils/Forms';

type IInviteMemberForm = {
  email: string;
  roleOption: ISelectOption;
};

type IInviteMemberProps = {
  show: boolean;
  handleCloseDialog: () => void;
};

const InviteMemberDialog = (props: IInviteMemberProps) => {
  const { currentTeam } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm<IInviteMemberForm>({
    defaultValues: {
      roleOption: RoleOptionList[0],
    },
  });
  const handleGlobalError = useErrorHandler();

  const inviteMemberAsync = useAsync(async (data: IInviteMemberForm) => {
    try {
      await API.post('backend', `/team/${currentTeam.id}/invite`, {
        body: {
          email: data.email,
          role: data.roleOption.id,
        },
      });

      await mutate(`/team/${currentTeam.id}/list-members`);

      reset();
      props.handleCloseDialog();
    } catch (err) {
      setFormError(setError, err, handleGlobalError);
    }
  });

  const handleSubmitDialog = handleSubmit(async (data) => {
    await inviteMemberAsync.execute(data);
  });

  return (
    <FormDialog
      show={props.show}
      handleCancel={props.handleCloseDialog}
      handleSubmit={handleSubmitDialog}
      isSubmitting={inviteMemberAsync.pending}
      title="Invite member"
      description="Enter new member email address and we'll send him an email with a link to join your team."
      submitText="Send"
    >
      <>
        <Label htmlFor="email">Email</Label>
        <FormElement>
          <input id="email" type="text" {...register('email')} />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => {
              let text;

              if (message === 'too_small' || message === 'invalid_string') {
                text = 'Incorrect email address';
              }

              return <div className="text-sm text-red-600">{text}</div>;
            }}
          />
        </FormElement>

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

export { InviteMemberDialog };
