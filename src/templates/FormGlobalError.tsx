import { Alert } from '@/alert/Alert';

type IFormGlobalErrorProps = {
  error: string | null;
};

const FormGlobalError = (props: IFormGlobalErrorProps) => {
  if (!props.error) {
    return null;
  }

  let text;

  if (props.error === 'incorrect_todo_id') {
    text = "You can't perform this action, the Todo doesn't exist";
  } else if (props.error === 'incorrect_member_id') {
    text = "You can't perform this action, the member doesn't exist";
  } else {
    text = 'Unexpected error occurred, please try again';
  }

  return <Alert text={text} />;
};

export { FormGlobalError };
