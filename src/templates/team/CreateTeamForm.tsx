import { ErrorMessage } from '@hookform/error-message';
import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { Button } from '@/button/Button';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import { setFormError } from '@/utils/Forms';

type ICreateTeamForm = {
  userEmail: string;
  displayName: string;
};

const CreateTeamForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTeamForm>();
  const { providerInfo, setCurrentTeamInd, teamList } = useAuth();
  const router = useRouter();

  const createTeamAsync = useAsync(async (data: ICreateTeamForm) => {
    try {
      await API.post('backend', `/team/create`, {
        body: {
          ...data,
          userEmail: providerInfo.email,
        },
      });

      await mutate(`/user/profile?email=${providerInfo.email}`);
      setCurrentTeamInd(teamList.length);
      await router.push('/dashboard');
    } catch (ex) {
      // Retrieves error from the server and display them in the UI.
      setFormError(setError, ex);
    }
  });

  const handleCreateTeam = handleSubmit(async (data) => {
    await createTeamAsync.execute(data);
  });

  return (
    <form className="grid grid-cols-1 gap-y-2" onSubmit={handleCreateTeam}>
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

      <div className="mt-4 flex justify-end">
        <button type="submit" disabled={createTeamAsync.pending}>
          <Button loading={createTeamAsync.pending}>Create</Button>
        </button>
      </div>
    </form>
  );
};

export { CreateTeamForm };
