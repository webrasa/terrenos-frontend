import { ReactElement, ReactNode } from 'react';

type IZeroStateProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  cta: ReactNode;
  shouldDisplay?: () => boolean;
  children?: ReactElement;
};

const ZeroState = (props: IZeroStateProps) => {
  if (!props.children || (props.shouldDisplay && props.shouldDisplay())) {
    return (
      <div className="px-3 lg:px-6 py-8 h-full">
        {/* We keep the following line when we need a background color */}
        <div className="flex items-center justify-center h-full">
          <div className="text-center mb-24">
            {props.icon}

            <div className="text-3xl font-bold">{props.title}</div>
            <div className="text-xl">{props.description}</div>

            <div className="mt-5">{props.cta}</div>
          </div>
        </div>
      </div>
    );
  }

  return props.children;
};

export { ZeroState };
