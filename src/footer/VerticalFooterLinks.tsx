import { ReactNode } from 'react';

type IVerticalFooterLinksProps = {
  children: ReactNode;
};

const VerticalFooterLinks = (props: IVerticalFooterLinksProps) => (
  <ul className="grid grid-cols-2 gap-x-2 text-center divide-x divide-gray-300 vertical-footer-links">
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
