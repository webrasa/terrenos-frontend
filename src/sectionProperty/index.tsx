const SectionProperty = () => {
  const userName = 'Mary';
  const userProfileImage = 'https://picsum.photos/200/200';
  return (
    <div className="mx-auto py-4 text-black">
      <h1 className="mb-4 text-3xl font-bold"> $35,000 </h1>
      <p className="mb-4 text-2xl font-medium">
        Lacmiel, 2 cuadras arriba, 1/2 cuadra al sur
      </p>
      <p className="mb-6 text-xl font-normal">
        San Jose, Columbia -121.894 37.3393
      </p>
      <div className="mb-10 flex items-center">
        <img
          src={userProfileImage}
          alt="Profile"
          className="mr-4 size-8 rounded-full object-cover"
        />
        <h1 className="text-lg font-medium">{userName}</h1>
      </div>
      <div className="flex border-y border-gray-500 text-lg">
        <p className="py-4 pr-10">
          <b>10 days</b> on Terrenoss
        </p>
        <p className="py-4 pr-10">
          <b>12</b> Views
        </p>
        <p className="py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-2 size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </p>
        <p className="py-4">
          <b>12</b> favorites
        </p>
      </div>
    </div>
  );
};

export default SectionProperty;
