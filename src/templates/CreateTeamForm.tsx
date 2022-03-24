import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { Button } from '../button/Button';
import { FormElement } from '../form/FormElement';
import { Label } from '../form/Label';
import { useAsync } from '../hooks/UseAsync';
import { useAuth } from '../hooks/UseAuth';
import { setFormError } from '../utils/Forms';

type ICreateTeamForm = {
  userEmail: string;
  displayName: string;
};

const CreateTeamForm = () => {
  const { register, setError, handleSubmit } = useForm<ICreateTeamForm>();
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

      mutate(`/user/profile?email=${providerInfo.email}`);
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
      <Label htmlFor="displayName">Display name *</Label>

      <FormElement>
        <input id="displayName" type="text" {...register('displayName')} />
      </FormElement>

      <div className="flex justify-end mt-4">
        <button type="submit" disabled={createTeamAsync.pending}>
          <Button loading={createTeamAsync.pending}>Save</Button>
        </button>
      </div>
    </form>
  );
};

export { CreateTeamForm };
