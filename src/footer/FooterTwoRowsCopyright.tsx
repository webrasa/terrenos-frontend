import type { ReactNode } from 'react';

import { FooterIconList } from './FooterIconList';
import { VerticalFooterLinks } from './VerticalFooterLinks';

type IFooterTwoRowsCopyrightProps = {
  siteName: string;
  iconList: ReactNode;
  verticalLinks: ReactNode;
};

/**
 * Used to display copyright in the footer.
 * @component
 */
const FooterTwoRowsCopyright = (props: IFooterTwoRowsCopyrightProps) => (
  <>
    <div className="grid grid-cols-1 items-center justify-center gap-y-5 lg:grid-cols-3">
      <div className="mx-auto w-fit-content lg:mx-0">
        <FooterIconList>{props.iconList}</FooterIconList>
      </div>

      <div className="mx-auto w-fit-content">
        <VerticalFooterLinks>{props.verticalLinks}</VerticalFooterLinks>
      </div>

      <div className="text-center text-sm text-white lg:text-right">
        {`© Copyright ${new Date().getFullYear()} ${
          props.siteName
        }. All Rights Reserved.`}
      </div>
    </div>
  </>
);

export { FooterTwoRowsCopyright };
