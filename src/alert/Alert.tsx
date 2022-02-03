import { ReactNode } from 'react';

type IAlertProps = {
  text?: ReactNode;
};

const Alert = (props: IAlertProps) => (
  <div className="text-left p-4 text-sm text-red-700 bg-red-100 rounded-lg mb-2">
    {props.text}
  </div>
);

export { Alert };
