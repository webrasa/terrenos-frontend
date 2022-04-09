import { ReactNode } from 'react';

type ISettingLineProps = {
  name: string;
  description?: string;
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
const SettingLine = (props: ISettingLineProps) => (
  <div className="flex items-center justify-between bg-gray-100 p-6">
    <div>
      <p className="font-bold text-gray-700">{props.name}</p>
      {props.description && <p>{props.description}</p>}
    </div>

    {props.action}
  </div>
);

export { SettingLine };
