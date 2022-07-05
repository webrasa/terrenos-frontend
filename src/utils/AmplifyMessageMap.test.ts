import {
  mapAmplifyMessage,
  mapAmplifyMessageSettings,
} from './AmplifyMessageMap';

describe('AmplifyMessageMap', () => {
  describe('mapAmplifyMessage function', () => {
    it("should return a generic error message when the error don't have a message property", () => {
      const message = mapAmplifyMessage({});

      expect(message).toEqual('Unexpected error occurred, please try again.');
    });

    it('should replace username in error message by email, it uses email authentication.', () => {
      let message = mapAmplifyMessage({
        message: 'Username cannot be empty',
      });

      expect(message).toEqual('Email cannot be empty');

      message = mapAmplifyMessage({
        message: 'Username should be an email',
      });

      expect(message).toEqual('Email address is invalid');
    });

    it('should return an error with username or password', () => {
      let message = mapAmplifyMessage({
        message: 'Custom auth lambda trigger is not configured',
      });

      expect(message).toEqual('Incorrect username or password');

      message = mapAmplifyMessage({
        message: 'The username should either be a string',
      });

      expect(message).toEqual('Incorrect username or password');
    });

    it("shouldn't modify the error message when it doesn't need", () => {
      const message = mapAmplifyMessage({
        message: 'Random message',
      });

      expect(message).toEqual('Random message');
    });
  });

  describe('mapAmplifyMessageSettings function', () => {
    it("should return a generic error message when the error don't have a message property", () => {
      const message = mapAmplifyMessageSettings({});

      expect(message).toEqual('Unexpected error occurred, please try again.');
    });

    it('should return a better error message when the user try to modify his password in settings', () => {
      const message = mapAmplifyMessageSettings({
        message: 'Incorrect username or password',
      });

      expect(message).toEqual('Incorrect old password');
    });

    it("shouldn't modify the error message when it doesn't need", () => {
      const message = mapAmplifyMessageSettings({
        message: 'Random message',
      });

      expect(message).toEqual('Random message');
    });
  });
});
