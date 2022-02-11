import { ReactNode } from 'react';

type IVerticalFeatureElementProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

const VerticalFeatureElement = (props: IVerticalFeatureElementProps) => (
  <div className="flex mt-8 vertical-feature-element">
    <div className="flex shrink-0 justify-center items-center w-12 h-12 bg-primary-400 rounded-md">
      {props.icon}
    </div>

    <div className="ml-4">
      <div className="text-xl font-medium text-gray-900">{props.title}</div>

      <div className="mt-1">{props.children}</div>
    </div>

    <style jsx>
      {`
        .vertical-feature-element :global(svg) {
          @apply text-white stroke-current w-8 h-8 stroke-2;
        }
      `}
    </style>
  </div>
);

export { VerticalFeatureElement };
