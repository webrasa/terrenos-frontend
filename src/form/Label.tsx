import { ReactNode } from 'react';

import classNames from 'classnames';

type ILabelProps = {
  htmlFor?: string;
  children: ReactNode;
  colSpanSize?: string;
};

/**
 * @component
 * @params {Object} props - Component props.
 * @param {string} props.htmlFor - for attribute in HTML.
 * @param {ReactNode} props.children - Children components.
 * @param {string} props.colSpanSize - Tailwind CSS class to control how elements are sized in grid.
 */
const Label = (props: ILabelProps) => {
  const labelClass = classNames('text-gray-700', 'mt-2', props.colSpanSize);

  return (
    <label htmlFor={props.htmlFor} className={labelClass}>
      {props.children}
    </label>
  );
};

export { Label };
