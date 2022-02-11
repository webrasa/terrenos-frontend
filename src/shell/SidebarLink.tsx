import { ReactNode } from 'react';

type ISidebarLinkProps = {
  icon: ReactNode;
  children: string;
};

/**
 * @component
 * @params props - Component props.
 * @param props.icon - SVG icon or image for styling.
 * @param props.children - Children components.
 */
const SidebarLink = (props: ISidebarLinkProps) => (
  <div className="flex items-center p-2 text-lg font-semibold text-gray-800 hover:bg-primary-200 rounded-lg sidebar-link">
    {props.icon}

    {props.children}

    <style jsx>
      {`
        .sidebar-link :global(svg) {
          @apply stroke-2 stroke-current text-primary-500 h-6 w-6 mr-1;
        }
      `}
    </style>
  </div>
);

export { SidebarLink };
