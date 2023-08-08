import type { Dispatch, SetStateAction } from 'react';
import type { ErrorOption } from 'react-hook-form';

export type IError<T> = {
  param: keyof T;
  type: string;
};

/**
 * Go through the list of error and set it in the form management.
 * In our case, it uses `react-hook-form` for form management.
 * @param setError - Function to set one error with the form field name.
 * @param error - List of errors.
 */
const setServerError = <T>(
  setError: (fieldName: keyof T, error: ErrorOption) => void,
  error: Array<IError<T>>,
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
  exception: any,
  setFormGlobalError: Dispatch<SetStateAction<string | null>>,
  handleGlobalError: (error: any) => void,
) => {
  const errors = exception?.response?.data?.errors;

  if (errors) {
    if (Array.isArray(errors)) {
      setServerError(setError, errors);
    } else if (errors === 'not_member') {
      handleGlobalError(exception);
    } else if (typeof errors === 'string') {
      setFormGlobalError(errors);
    } else {
      throw exception;
    }
  } else {
    throw exception;
  }
};

export const setExceptionToFormGlobal = (
  setFormGlobalError: Dispatch<SetStateAction<string | null>>,
  exception: any,
) => {
  const errors = exception?.response?.data?.errors;

  if (errors) {
    if (typeof errors === 'string') {
      setFormGlobalError(errors);
    } else {
      throw exception;
    }
  } else {
    throw exception;
  }
};
