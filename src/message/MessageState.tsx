import { ReactElement, ReactNode } from 'react';

type IMessageStateProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  cta: ReactNode;
  shouldDisplay?: () => boolean;
  children?: ReactElement;
};

const MessageState = (props: IMessageStateProps) => {
  if (!props.children || (props.shouldDisplay && props.shouldDisplay())) {
    return (
      <div className="h-full py-8 px-3 lg:px-6">
        {/* We keep the following line when we need a background color */}
        <div className="flex h-full items-center justify-center">
          <div className="mb-24 text-center">
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

export { MessageState };
