import { ErrorOption } from 'react-hook-form';

export type IError<T> = {
  param: keyof T;
  type: string;
};

/**
 * Go through the list of error and set it in the form management.
 * @param setError - Function to set one error with the form field name.
 * @param error - List of errors.
 */
const setServerError = <T>(
  setError: (fieldName: keyof T, error: ErrorOption) => void,
  error: Array<IError<T>>
) =>
  error.forEach((elt) => {
    setError(elt.param, {
      type: 'server',
      message: elt.type,
    });
  });

/**
 * Convert errors returned by the server and set the errors in the form management.
 * @param setError - Function to set one error with the form field name.
 * @param exception - Error returned by the server.
 */
export const setFormError = <T>(
  setError: (fieldName: keyof T, error: ErrorOption) => void,
  exception: any
) => {
  if (exception?.response?.data?.errors) {
    setServerError(setError, exception.response.data.errors);
  } else {
    throw exception;
  }
};
