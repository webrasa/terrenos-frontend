/**
 * Map the amplify message error and output the desired message.
 * @param err - Exception raised by Amplify.
 */
export const mapAmplifyMessage = (err: unknown) => {
  if (err instanceof Error) {
    if (/Username cannot be empty/i.test(err.message)) {
      return 'Email cannot be empty';
    }

    if (/Username should be an email/i.test(err.message)) {
      return 'Email address is invalid';
    }

    return err.message;
  }

  return 'Unexpected error occurred, please try again.';
};
