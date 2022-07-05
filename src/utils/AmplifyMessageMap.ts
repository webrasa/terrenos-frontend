/**
 * AWS Cognito returns generic error message which doesn't fit email authentication.
 * Map the amplify message error and output the desired message. It used in public authentication pages.
 * @param err - Exception raised by Amplify.
 */
export const mapAmplifyMessage = (err: any) => {
  if (err.message) {
    if (/Username cannot be empty/i.test(err.message)) {
      return 'Email cannot be empty';
    }

    if (/Username should be an email/i.test(err.message)) {
      return 'Email address is invalid';
    }

    if (
      /Custom auth lambda trigger is not configured/i.test(err.message) ||
      /The username should either be a string/i.test(err.message)
    ) {
      return 'Incorrect username or password';
    }

    return err.message;
  }

  return 'Unexpected error occurred, please try again.';
};

/**
 * Map the amplify message error and output the desired message.
 * It used in settings page to update user personal information.
 * Amplify returns a generic error message that doesn't fit the context.
 * @param err - Exception raised by Amplify.
 */
export const mapAmplifyMessageSettings = (err: any) => {
  if (err.message) {
    if (/Incorrect username or password/i.test(err.message)) {
      return 'Incorrect old password';
    }

    return err.message;
  }

  return 'Unexpected error occurred, please try again.';
};
