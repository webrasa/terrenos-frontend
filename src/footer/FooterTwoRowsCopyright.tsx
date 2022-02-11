import { ReactNode } from 'react';

import { FooterIconList } from './FooterIconList';
import { VerticalFooterLinks } from './VerticalFooterLinks';

type IFooterTwoRowsCopyrightProps = {
  siteName: string;
  iconList: ReactNode;
  verticalLinks: ReactNode;
  children: ReactNode;
};

const FooterTwoRowsCopyright = (props: IFooterTwoRowsCopyrightProps) => (
  <>
    {props.children}

    <div className="grid grid-cols-1 gap-y-5 justify-center items-center pt-10 mt-10 border-t border-gray-300 lg:grid-cols-3">
      <div className="mx-auto lg:mx-0 w-fit-content">
        <FooterIconList>{props.iconList}</FooterIconList>
      </div>

      <div className="mx-auto w-fit-content">
        <VerticalFooterLinks>{props.verticalLinks}</VerticalFooterLinks>
      </div>

      <div className="text-sm text-center lg:text-right">
        {`© Copyright ${new Date().getFullYear()} ${
          props.siteName
        }. All Rights Reserved.`}
      </div>
    </div>
  </>
);

export { FooterTwoRowsCopyright };
