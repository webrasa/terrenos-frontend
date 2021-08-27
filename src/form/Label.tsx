import { ReactNode } from 'react';

import classNames from 'classnames';

type ILabelProps = {
  htmlFor?: string;
  children: ReactNode;
  colSpanSize?: string;
};

const Label = (props: ILabelProps) => {
  const labelClass = classNames('text-gray-700', 'mt-2', props.colSpanSize);

  return (
    <label htmlFor={props.htmlFor} className={labelClass}>
      {props.children}
    </label>
  );
};

export { Label };
