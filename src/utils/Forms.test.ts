import { setFormError } from './Forms';

describe('Forms', () => {
  describe('setFormError function', () => {
    it("should throw the input as an exception when the errors doesn't follow the expected schema", () => {
      const mockSetError = jest.fn();

      expect(() => setFormError(mockSetError, 'random parameter')).toThrow(
        'random parameter'
      );

      expect(() =>
        setFormError(mockSetError, {
          response: {
            data: {
              errors: 'random error',
            },
          },
        })
      ).toThrow();
    });

    it("shouldn't call setError function for each errors", () => {
      const mockSetError = jest.fn();

      setFormError(mockSetError, {
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
      });

      expect(mockSetError.mock.calls.length).toEqual(2);
      // We just make sure the setError function is called the correct time
    });
  });
});
