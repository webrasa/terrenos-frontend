import { ReactNode } from 'react';

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
  <div className="p-4 mb-2 text-sm text-red-700 bg-red-100 rounded-lg">
    {props.text}
  </div>
);

export { Alert };