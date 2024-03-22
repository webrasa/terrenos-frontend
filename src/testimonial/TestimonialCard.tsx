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

/**
 * Show users and/or customers testimonial.
 * @component
 */
const TestimonialCard = (props: ITestimonialCardProps) => (
  <div className="rounded-md bg-white p-8 sm:p-16">
    <div className="text-lg leading-8">{props.children}</div>

    <div className="mt-6 flex items-center justify-center">
      <img
        className="size-16 rounded-full bg-primary-400"
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
