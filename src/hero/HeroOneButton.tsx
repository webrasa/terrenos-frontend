import type { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: ReactNode;
  button: ReactNode;
  image?: {
    src: string;
    alt: string;
  };
};

/**
 * Hero component with a call to action button.
 * @component
 */
const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="text-center">
    <h1 className="whitespace-pre-line text-5xl font-bold leading-hero text-gray-900">
      {props.title}
    </h1>
    <div className="mb-6 mt-4 whitespace-pre-line text-2xl">
      {props.description}
    </div>

    {props.button}

    {props.image && (
      <img
        className="mx-auto mt-12 rounded-md"
        src={props.image.src}
        alt={props.image.alt}
      />
    )}
  </header>
);

export { HeroOneButton };
