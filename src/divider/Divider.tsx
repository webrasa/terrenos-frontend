type IDividerProps = {
  children: string;
};

const Divider = (props: IDividerProps) => (
  <div className="flex mt-6 mb-4 items-center">
    <div className="flex-grow border-t border-gray-300" />
    <span className="flex-shrink mx-4 text-gray-400">{props.children}</span>
    <div className="flex-grow border-t border-gray-300" />
  </div>
);

export { Divider };
