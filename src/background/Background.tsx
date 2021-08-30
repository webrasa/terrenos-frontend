import { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
};

/**
 * @component
 * @params props - Component props.
 * @param props.children - Children components.
 * @param props.color - Tailwind CSS class for background color.
 */
const Background = (props: IBackgroundProps) => (
  <div className={props.color}>{props.children}</div>
);

export { Background };
