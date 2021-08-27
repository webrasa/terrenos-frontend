type ITestimonialCardProps = {
  image: {
    src: string;
    alt: string;
  };
  children: string;
  author: {
    name: string;
    position: string;
  };
};

const TestimonialCard = (props: ITestimonialCardProps) => (
  <div className="p-8 sm:p-16 bg-white rounded-md">
    <div className="text-lg leading-8">{props.children}</div>

    <div className="mt-6 flex items-center justify-center">
      <img
        className="w-16 h-16 rounded-full bg-primary-400"
        src={props.image.src}
        alt={props.image.alt}
      />

      <div className="ml-2">
        <div className="text-gray-900 font-bold">{props.author.name}</div>
        <div className="text-gray-700 font-medium">{props.author.position}</div>
      </div>
    </div>
  </div>
);

export { TestimonialCard };
