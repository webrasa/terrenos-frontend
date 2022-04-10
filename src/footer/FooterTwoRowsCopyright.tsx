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

    <div className="mt-10 grid grid-cols-1 items-center justify-center gap-y-5 border-t border-gray-300 pt-10 lg:grid-cols-3">
      <div className="mx-auto w-fit-content lg:mx-0">
        <FooterIconList>{props.iconList}</FooterIconList>
      </div>

      <div className="mx-auto w-fit-content">
        <VerticalFooterLinks>{props.verticalLinks}</VerticalFooterLinks>
      </div>

      <div className="text-center text-sm lg:text-right">
        {`© Copyright ${new Date().getFullYear()} ${
          props.siteName
        }. All Rights Reserved.`}
      </div>
    </div>
  </>
);

export { FooterTwoRowsCopyright };
