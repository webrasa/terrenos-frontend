type IDividerProps = {
  children: string;
};

const Divider = (props: IDividerProps) => (
  <div className="flex items-center mt-6 mb-4">
    <div className="grow border-t border-gray-300" />
    <span className="shrink mx-4 text-gray-400">{props.children}</span>
    <div className="grow border-t border-gray-300" />
  </div>
);

export { Divider };
