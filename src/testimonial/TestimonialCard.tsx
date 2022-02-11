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
  <div className="p-8 bg-white rounded-md sm:p-16">
    <div className="text-lg leading-8">{props.children}</div>

    <div className="flex justify-center items-center mt-6">
      <img
        className="w-16 h-16 bg-primary-400 rounded-full"
        src={props.image.src}
        alt={props.image.alt}
      />

      <div className="ml-2">
        <div className="font-bold text-gray-900">{props.author.name}</div>
        <div className="font-medium text-gray-700">{props.author.position}</div>
      </div>
    </div>
  </div>
);

export { TestimonialCard };
