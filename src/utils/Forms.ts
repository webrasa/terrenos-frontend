import { ErrorOption } from 'react-hook-form';

export type IError<T> = {
  param: keyof T;
  type: string;
};

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
