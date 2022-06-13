import type { ReactNode } from 'react';

type IAlertProps = {
  text?: ReactNode;
};

/**
 * Alert shows message as feedback to the users.
 * @component
 * @params props - Component props.
 * @param props.text - Text message to display.
 */
const Alert = (props: IAlertProps) => (
  <div className="mb-2 rounded-lg bg-red-100 p-4 text-sm text-red-700">
    {props.text}
  </div>
);

export { Alert };
