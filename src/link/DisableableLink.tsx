import type { LinkProps } from 'next/link';
import Link from 'next/link';

type IDisableableLinkProps = {
  disabled?: boolean;
};

const DisableableLink = (
  props: React.PropsWithChildren<LinkProps> & IDisableableLinkProps
) => {
  const { disabled, children, ...rest } = props;

  if (disabled) {
    return <button disabled>{children}</button>;
  }

  return (
    <Link {...rest}>
      <a>{children}</a>
    </Link>
  );
};

export { DisableableLink };
