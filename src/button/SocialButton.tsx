import type { ReactNode } from 'react';

type ISocialButtonProps = {
  icon: ReactNode;
  children: string;
};

/**
 * Button used for social login button (third-party OAuth sign-in like Facebook, Google, etc.).
 * @component
 * @params props - Component props.
 * @param props.icon - SVG icon or image for styling.
 * @param props.children - Children components.
 */
const SocialButton = (props: ISocialButtonProps) => (
  <div className="signup-button flex items-center justify-center rounded-full border-2 border-gray-300 px-5 py-3">
    {props.icon}

    <span className="ml-2 text-lg">{props.children}</span>

    <style jsx>
      {`
        .signup-button :global(svg) {
          @apply w-6 h-6;
        }
        .signup-button:hover {
          border: 3px solid #009f52;
        }
      `}
    </style>
  </div>
);

export { SocialButton };
