import { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: ReactNode;
  button: ReactNode;
  image?: {
    src: string;
    alt: string;
  };
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="text-center">
    <h1 className="text-5xl font-bold leading-hero text-gray-900 whitespace-pre-line">
      {props.title}
    </h1>
    <div className="mt-4 mb-6 text-2xl whitespace-pre-line">
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
