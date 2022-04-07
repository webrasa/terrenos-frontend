export const mapInviteMessage = (exception: any) => {
  if (exception?.response?.data?.errors) {
    const errorCode = exception?.response?.data?.errors;

    if (errorCode === 'already_member') {
      return "You're already a member of the team";
    }

    if (errorCode === 'incorrect_team_id') {
      return "The team ID doesn't exist";
    }

    if (errorCode === 'incorrect_code') {
      return 'Incorrect verification code';
    }

    return 'Impossible to accept invite';
  }

  throw exception;
};
