import { useErrorHandler } from 'react-error-boundary';

/**
 * Used only for demo purpose, it can be removed.
 * @component
 */
const DemoBadge = () => {
  const handleError = useErrorHandler();

  return <button onClick={handleError}>Button</button>;
};

export { DemoBadge };
