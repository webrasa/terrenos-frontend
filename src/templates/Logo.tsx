type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? '44' : '32';
  return (
    <span className={'sm:5/12 inline-flex w-4/12 items-center md:w-8/12'}>
      <img src="/assets/images/logo.png" alt="Terrenoss logo" />
    </span>
  );
};

export { Logo };
