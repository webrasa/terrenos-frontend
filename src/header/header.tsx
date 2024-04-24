import ControllableStates from "./search";
import Image from "next/image";

const Header = () => {
  return (
    <div className="container mx-auto h-96 relative">
      {/* Header content */}
      <div className="flex md:flex-row h-auto relative">
        <div
          className="top-8 left-5 md:top-36 md:left-10 md:h-40 w-1/2 relative md:z-10"
        >
          <h1 className="text-2xl relative md:text-6xl font-semibold text-black bottom-4">
            Land your dream
          </h1>
          <ControllableStates />
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
        <div className="relative h-96 md:w-3/4">
          <div className="relative w-96 md:w-auto inset-0 md:flex-row justify-center items-center z-10">
            <Image
              className="absolute top-40 right-40 md:right-16 md:w-72 md:h-44 transform rotate-1"
              src="/assets/images/placeHeader.png"
              width={500}
              height={500}
              alt="place"
            />
          </div>
          <div className="relative inset-0 md:left-24 top-44 md:flex justify-center z-10">
            <Image
              className="w-11 h-14"
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
