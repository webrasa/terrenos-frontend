import { ReactNode } from 'react';

type ISocialButtonProps = {
  icon: ReactNode;
  children: string;
};

/**
 * @component
 * @params props - Component props.
 * @param props.icon - SVG icon or image for styling.
 * @param props.children - Children components.
 */
const SocialButton = (props: ISocialButtonProps) => (
  <div className="flex items-center justify-center py-3 px-5 border-2 border-gray-300 hover:border-primary-400 rounded-md">
    <span className="w-6 h-6 inline-flex items-center justify-center">
      {props.icon}
    </span>

    <span className="ml-2 text-lg font-semibold">{props.children}</span>
  </div>
);

export { SocialButton };
