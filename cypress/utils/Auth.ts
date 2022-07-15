export const interceptSignIn = (cy: Cypress.cy & CyEventEmitter) => {
  cy.intercept(
    {
      method: 'POST',
      url: 'https://cognito-idp.us-east-1.amazonaws.com/',
      headers: {
        'x-amz-target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      },
    },
    {
      statusCode: 200,
      body: {
        ChallengeName: 'PASSWORD_VERIFIER',
        ChallengeParameters: {
          SECRET_BLOCK: 'XXXXX',
          USER_ID_FOR_SRP: 'XXXXX',
        },
      },
    }
  );
  cy.intercept(
    {
      method: 'POST',
      url: 'https://cognito-idp.us-east-1.amazonaws.com/',
      headers: {
        'x-amz-target':
          'AWSCognitoIdentityProviderService.RespondToAuthChallenge',
      },
    },
    {
      statusCode: 200,
      fixture: 'auth/CognitoAuthChallenge.json',
    }
  );
  cy.intercept(
    {
      method: 'POST',
      url: 'https://cognito-idp.us-east-1.amazonaws.com/',
      headers: {
        'x-amz-target': 'AWSCognitoIdentityProviderService.GetUser',
      },
    },
    {
      statusCode: 200,
      body: {
        UserAttributes: [],
        Username: '8c27d077-fd80-4cda-9b49-b4745d10037d',
      },
    }
  );
};

export const interceptChangeEmail = (cy: Cypress.cy & CyEventEmitter) => {
  cy.intercept(
    {
      method: 'POST',
      url: 'https://cognito-idp.us-east-1.amazonaws.com/',
      headers: {
        'x-amz-target':
          'AWSCognitoIdentityProviderService.UpdateUserAttributes',
      },
    },
    {
      statusCode: 200,
      body: {},
    }
  );
};
