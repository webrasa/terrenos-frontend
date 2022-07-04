import type { ReactNode } from 'react';

type ISettingLineProps = {
  name: string;
  description?: string;
  action: ReactNode;
};

/**
 * Display one setting with the name and description.
 * It also shows the current value of the setting.
 * @component
 * @params props - Component props.
 * @param props.name - Name of the setting.
 * @param props.value - Current value of the setting.
 * @param props.action - Action to perform for updating the setting.
 */
const SettingLine = (props: ISettingLineProps) => (
  <div
    className="flex flex-col items-start gap-2 bg-gray-100 p-6 sm:flex-row sm:items-center sm:justify-between"
    data-testid="setting-line"
  >
    <div>
      <p className="font-bold text-gray-700">{props.name}</p>
      {props.description && <p>{props.description}</p>}
    </div>

    {props.action}
  </div>
);

export { SettingLine };
