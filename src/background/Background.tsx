import type { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
};

/**
 * Add a background color around the children component.
 * @component
 * @params props - Component props.
 * @param props.children - Children components.
 * @param props.color - Tailwind CSS class for background color.
 */
const Background = (props: IBackgroundProps) => (
  <div className={props.color}>{props.children}</div>
);

export { Background };
