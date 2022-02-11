import { ReactNode } from 'react';

type IFeatureElementProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

const FeatureElement = (props: IFeatureElementProps) => (
  <div className="flex flex-col feature-element">
    <div className="flex shrink-0 justify-center items-center mx-auto w-12 h-12 bg-gray-100 rounded-full border border-gray-300">
      {props.icon}
    </div>

    <div className="mt-2 text-center">
      <div className="text-2xl font-semibold text-gray-900">{props.title}</div>
      <div className="mt-2 text-lg leading-8">{props.children}</div>
    </div>

    <style jsx>
      {`
        .feature-element :global(svg) {
          @apply text-primary-400 stroke-current w-6 h-6 stroke-2;
        }
      `}
    </style>
  </div>
);

export { FeatureElement };
