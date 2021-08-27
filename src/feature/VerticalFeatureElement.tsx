import { ReactNode } from 'react';

type IVerticalFeatureElementProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

const VerticalFeatureElement = (props: IVerticalFeatureElementProps) => (
  <div className="vertical-feature-element flex mt-8">
    <div className="w-12 h-12 flex items-center justify-center rounded-md bg-primary-400 flex-shrink-0">
      {props.icon}
    </div>

    <div className="ml-4">
      <div className="text-xl text-gray-900 font-medium">{props.title}</div>

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
