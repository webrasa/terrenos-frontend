import { setFormError } from './Forms';

describe('Forms', () => {
  describe('setFormError function', () => {
    it("should throw the input as an exception when the errors doesn't follow the expected schema", () => {
      expect(() =>
        setFormError(jest.fn(), 'random parameter', jest.fn(), jest.fn())
      ).toThrow('random parameter');

      expect(() =>
        setFormError(
          jest.fn(),
          {
            response: {
              data: {
                random: 'random error',
              },
            },
          },
          jest.fn(),
          jest.fn()
        )
      ).toThrow();

      expect(() =>
        setFormError(
          jest.fn(),
          {
            response: {
              data: {
                errors: 10,
              },
            },
          },
          jest.fn(),
          jest.fn()
        )
      ).toThrow();
    });

    it("shouldn't call setError function for each errors", () => {
      const mockSetError = jest.fn();

      setFormError(
        mockSetError,
        {
          response: {
            data: {
              errors: [
                {
                  param: 'param 1',
                  type: 'error 1',
                },
                {
                  param: 'param 2',
                  type: 'error 2',
                },
              ],
            },
          },
        },
        jest.fn(),
        jest.fn()
      );

      expect(mockSetError).toHaveBeenCalledTimes(2);
      // We just make sure the `setError` function is called the correct time.

      // Relying on TypeScript to make sure `setError` function is called correctly.
      // So, it doesn't need to test if the function is called with the correct parameter.
    });

    it("should call the error boundary hook when the user isn't a member of the team", () => {
      const mockHandleGlobalError = jest.fn();
      const response = {
        response: {
          data: {
            errors: 'not_member',
          },
        },
      };

      setFormError(jest.fn(), response, jest.fn(), mockHandleGlobalError);

      expect(mockHandleGlobalError).toHaveBeenCalledWith(response);
    });

    it('should call setFormGlobalError when the error is a string', () => {
      const mockSetFormGlobalError = jest.fn();
      const response = {
        response: {
          data: {
            errors: 'random_error_string',
          },
        },
      };

      setFormError(jest.fn(), response, mockSetFormGlobalError, jest.fn());

      expect(mockSetFormGlobalError).toHaveBeenCalledWith(
        'random_error_string'
      );
    });
  });
});
