import type { ReactElement, ReactNode } from 'react';

type IMessageStateProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  cta: ReactNode;
  shouldDisplay?: () => boolean;
  children?: ReactElement;
};

/**
 * Display conditionally children component or a message to guide the user.
 * It can be used as an empty state (when list, table or chart has no items or data).
 * Or, it can be used as a success page or failure page.
 * @component
 */
const MessageState = (props: IMessageStateProps) => {
  if (!props.children || (props.shouldDisplay && props.shouldDisplay())) {
    return (
      <div className="h-full px-3 py-8 lg:px-6" data-testid="message-state">
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
