import { ReactNode } from 'react';

type ISidebarLinkProps = {
  icon: ReactNode;
  children: string;
};

/**
 * @component
 * @params {Object} props - Component props.
 * @param {ReactNode} props.icon - SVG icon or image for styling.
 * @param {string} props.children - Children components.
 */
const SidebarLink = (props: ISidebarLinkProps) => (
  <div className="sidebar-link flex items-center text-lg text-gray-800 font-semibold px-2 py-2 rounded-lg hover:bg-primary-200">
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
