import { ErrorMessage } from '@hookform/error-message';
import { API } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { FormDialog } from '@/dialog/FormDialog';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import { setFormError } from '@/utils/Forms';

type IChangeDisplayNameForm = {
  displayName: string;
};

type IChangeTeamDisplayNameProps = {
  show: boolean;
  handleCloseDialog: () => void;
};

const ChangeTeamDisplayName = (props: IChangeTeamDisplayNameProps) => {
  const { currentTeam, providerInfo } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IChangeDisplayNameForm>();

  const changeTeamDisplayNameAsync = useAsync(
    async (data: IChangeDisplayNameForm) => {
      try {
        await API.put('backend', `/team/${currentTeam.id}/name`, {
          body: data,
        });

        await mutate(
          `/user/profile?email=${encodeURIComponent(providerInfo.email)}`
        );
        props.handleCloseDialog();
      } catch (err) {
        setFormError(setError, err);
      }
    }
  );

  const handleSubmitDialog = handleSubmit(async (data) => {
    await changeTeamDisplayNameAsync.execute(data);
  });

  return (
    <FormDialog
      show={props.show}
      handleCancel={props.handleCloseDialog}
      handleSubmit={handleSubmitDialog}
      isSubmitting={changeTeamDisplayNameAsync.pending}
      title="Change display name"
      description="The display name helps you identify the right team."
    >
      <>
        <Label htmlFor="displayName">Display name</Label>
        <FormElement>
          <input id="displayName" type="text" {...register('displayName')} />

          <ErrorMessage
            errors={errors}
            name="displayName"
            render={({ message }) => {
              let text;

              if (message === 'too_small') {
                text = 'Display name is too small, please add a name';
              }

              return <div className="text-sm text-red-600">{text}</div>;
            }}
          />
        </FormElement>
      </>
    </FormDialog>
  );
};

export { ChangeTeamDisplayName };
