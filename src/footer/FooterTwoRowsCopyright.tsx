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

    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-y-5 items-center justify-center border-t border-gray-300 pt-10">
      <div className="w-fit-content mx-auto lg:mx-0">
        <FooterIconList>{props.iconList}</FooterIconList>
      </div>

      <div className="w-fit-content mx-auto">
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
