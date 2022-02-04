import { ReactNode } from 'react';

type IAccountSettingLineProps = {
  title: string;
  value: string;
  action: ReactNode;
};

const AccountSettingLine = (props: IAccountSettingLineProps) => (
  <div className="flex items-center justify-between bg-gray-100 p-6">
    <div>
      <p className="text-gray-700 font-bold">{props.title}</p>
      <p>{props.value}</p>
    </div>

    {props.action}
  </div>
);

export { AccountSettingLine };
