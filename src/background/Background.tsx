import { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
};

/**
 * @component
 * @params {Object} props - Component props.
 * @param {ReactNode} props.children - Children components.
 * @param {string} props.color - Tailwind CSS class for background color.
 */
const Background = (props: IBackgroundProps) => (
  <div className={props.color}>{props.children}</div>
);

export { Background };
