import { ReactNode } from 'react';

type IAccountSettingLineProps = {
  name: string;
  value: string;
  action: ReactNode;
};

/**
 * Display a setting with the curent name and value. Add an action to update the value of the setting.
 * @component
 * @params props - Component props.
 * @param props.name - Name of the setting.
 * @param props.value - Current value of the setting.
 * @param props.action - Action can be performed to update the setting.
 */
const AccountSettingLine = (props: IAccountSettingLineProps) => (
  <div className="flex justify-between items-center p-6 bg-gray-100">
    <div>
      <p className="font-bold text-gray-700">{props.name}</p>
      <p>{props.value}</p>
    </div>

    {props.action}
  </div>
);

export { AccountSettingLine };