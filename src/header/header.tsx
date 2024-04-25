import Image from "next/image";
import AutoComplete from "./search";

const Header = () => {
  return (
    <div className="container mx-auto h-96 relative">
      {/* Header content */}
      <div className="md:flex md:flex-row h-auto relative">
        <div className="top-8 left-5 md:top-36 md:left-10 md:h-40 w-full md:w-1/2 relative z-10">
          <h1 className="text-3xl relative md:text-6xl font-semibold text-black bottom-4">
            Land your dream
          </h1>
          <AutoComplete />
        </div>

        {/* Background image */}
        <div
          className="w-full md:h-80 md:w-3/4 absolute top-16 h-72 pl-1 md:top-2 md:left-96"
          style={{
            backgroundImage: `url('/assets/images/lineHeader.png')`,
            backgroundSize: "cover",
            backgroundPosition: "right center",
            zIndex: 0,
          }}
        ></div>

        {/* Content on the right */}
        <div className="relative h-96 w-1/4 md:w-3/4">
          <div className="relative w-96 md:w-auto inset-0 md:flex-row justify-center items-center z-10">
            <Image
              className="absolute top-12 md:top-40 left-18 md:right-40 md:w-72 md:h-44 transform rotate-1"
              src="/assets/images/placeHeader.png"
              width={500}
              height={500}
              alt="place"
            />
          </div>
          <div className="relative inset-0 md:left-80 top-12 md:top-44 md:flex justify-center z-10">
            <Image
              className="absolute left-32 w-14 h-18 md:w-11 md:h-14"
              src="/assets/images/locationHeader.png"
              width={500}
              height={500}
              alt="location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Header };
