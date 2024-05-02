type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? '44' : '32';
  return (
    <span className={'inline-flex items-center md:w-8/12'}>
      <img src="/assets/images/logo.png" alt="Terrenoss logo" />
    </span>
  );
};

export { Logo };
