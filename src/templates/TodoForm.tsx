import { ErrorMessage } from '@hookform/error-message';
import { API } from 'aws-amplify';
import { useRouter } from 'next/dist/client/router';
import { useForm } from 'react-hook-form';

import { Button } from '../button/Button';
import { FormElement } from '../form/FormElement';
import { Label } from '../form/Label';
import { useAsync } from '../hooks/UseAsync';
import { ITodo } from '../types/ITodo';
import { setFormError } from '../utils/Forms';

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
  const router = useRouter();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodo>({
    defaultValues: props.defaultValues,
  });

  const saveAsync = useAsync(async (data) => {
    try {
      if (props.id) {
        // In EDIT mode, edit existing Todo
        await API.put('backend', `/todo/${props.id}`, {
          body: data,
        });
      } else {
        // In ADD mode, add a new Todo
        await API.post('backend', '/todo/create', {
          body: data,
        });
      }

      await router.push('/dashboard');
    } catch (ex) {
      // Retrieves error from the server and display them in the UI.
      setFormError(setError, ex);
    }
  });

  const handleSave = handleSubmit(async (data) => {
    await saveAsync.execute(data);
  });

  return (
    <form className="grid grid-cols-12 gap-y-5" onSubmit={handleSave}>
      <Label htmlFor="title" colSpanSize="col-span-2">
        Todo title *
      </Label>
      <FormElement
        colSpanSize="col-span-4"
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

      <div className="col-start-3">
        <button type="submit" disabled={saveAsync.pending}>
          <Button loading={saveAsync.pending}>Save</Button>
        </button>
      </div>
    </form>
  );
};

export { TodoForm };
