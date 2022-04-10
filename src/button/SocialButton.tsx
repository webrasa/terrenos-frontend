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
  <div className="signup-button flex items-center justify-center rounded-md border-2 border-gray-300 py-3 px-5 hover:border-primary-400">
    {props.icon}

    <span className="ml-2 text-lg font-semibold">{props.children}</span>

    <style jsx>
      {`
        .signup-button :global(svg) {
          @apply w-6 h-6;
        }
      `}
    </style>
  </div>
);

export { SocialButton };
