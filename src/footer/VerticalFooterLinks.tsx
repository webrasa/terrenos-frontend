import { ReactNode } from 'react';

type IVerticalFooterLinksProps = {
  children: ReactNode;
};

const VerticalFooterLinks = (props: IVerticalFooterLinksProps) => (
  <ul className="vertical-footer-links grid grid-cols-2 gap-x-2 divide-x divide-gray-300 text-center">
    {props.children}

    <style jsx>
      {`
        .vertical-footer-links :global(li) {
          display: block;
        }
      `}
    </style>
  </ul>
);

export { VerticalFooterLinks };
