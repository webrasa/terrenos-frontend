import type { ReactNode } from 'react';

type IVerticalFooterLinksProps = {
  children: ReactNode;
};

/**
 * Vertical list of links separated by a line.
 * @param component
 */
const VerticalFooterLinks = (props: IVerticalFooterLinksProps) => (
  <ul className="vertical-footer-links grid grid-cols-2 gap-x-2 divide-x divide-white text-center">
    {props.children}

    <style jsx>
      {`
        .vertical-footer-links :global(li) {
          @apply text-white block;
        }
        .vertical-footer-links :global(li:hover) {
          @apply text-gray-600;
        }
      `}
    </style>
  </ul>
);

export { VerticalFooterLinks };
