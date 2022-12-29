import { ErrorMessage } from '@hookform/error-message';
import { API } from 'aws-amplify';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { Button } from '@/button/Button';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { useAsync } from '@/hooks/UseAsync';
import { useAuth } from '@/hooks/UseAuth';
import type { ITodo } from '@/types/ITodo';
import { setFormError } from '@/utils/Forms';

import { FormGlobalError } from './FormGlobalError';

type ITodoFormProps = {
  id?: string;
  defaultValues?: ITodo;
};

/**
 * An example form to add a new Todo or edit an existing one.
 * @component
 * @params props - Component props.
 * @param props.id - The Todo ID to edit. In `add` mode, the value is undefined
 * @param props.defaultValues - Default value to initialized in edit mode.
 */
const TodoForm = (props: ITodoFormProps) => {
  const { currentTeam } = useAuth();
  const router = useRouter();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodo>({
    values: props.defaultValues, // Here we use `values` instead of `defaultValues` because we don't want the cache
  });
  const handleGlobalError = useErrorHandler();
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const saveAsync = useAsync(async (data) => {
    try {
      if (props.id) {
        // In EDIT mode, edit existing Todo
        await API.put('backend', `/${currentTeam.id}/todo/${props.id}`, {
          body: data,
        });
      } else {
        // In ADD mode, add a new Todo
        await API.post('backend', `/${currentTeam.id}/todo/create`, {
          body: data,
        });
      }

      await mutate(`/${currentTeam.id}/todo/list`);

      await router.push('/dashboard');
    } catch (ex: any) {
      // Retrieves error from the server and display them in the UI.
      setFormError(setError, ex, setFormGlobalError, handleGlobalError);
    }
  });

  const handleSave = handleSubmit(async (data) => {
    await saveAsync.execute(data);
  });

  return (
    <form
      className="grid grid-cols-1 gap-y-2 sm:grid-cols-6 sm:gap-y-5 lg:grid-cols-8"
      onSubmit={handleSave}
    >
      <div className="col-span-full">
        <FormGlobalError error={formGlobalError} />
      </div>

      <Label htmlFor="title" colSpanSize="sm:col-span-2">
        Todo title *
      </Label>
      <FormElement
        colSpanSize="sm:col-span-4"
        helper="Random helper text - Todo title should not be empty"
      >
        <input id="title" type="text" {...register('title')} />

        <ErrorMessage
          errors={errors}
          name="title"
          render={({ message }) => {
            let text;

            if (message === 'too_small') {
              text = 'Todo title is too small, please add a Todo title';
            }
            // Example with another message type:
            //
            // else if (message === 'other_error_type') {
            //   text = 'Other text message';
            // }

            return <div className="text-sm text-red-600">{text}</div>;
          }}
        />
      </FormElement>

      <div className="sm:col-start-3">
        <button type="submit" disabled={saveAsync.pending}>
          <Button loading={saveAsync.pending}>Save</Button>
        </button>
      </div>
    </form>
  );
};

export { TodoForm };
