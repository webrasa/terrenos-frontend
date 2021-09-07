// TODO: Add configuration for authentication
export const AwsConfig = {
  Auth: {
    mandatorySignIn: true,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    identityPoolId: process.env.NEXT_PUBLIC_AWS_AUTH_IDENTITY_POOL_ID,
    userPoolId: process.env.NEXT_PUBLIC_AWS_AUTH_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_AUTH_APP_CLIENT_ID,
    oauth: {
      domain: process.env.NEXT_PUBLIC_AWS_AUTH_DOMAIN,
      scope: ['profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: process.env.NEXT_PUBLIC_AWS_AUTH_REDIRECT_SIGN_IN,
      redirectSignOut: process.env.NEXT_PUBLIC_AWS_AUTH_REDIRECT_SIGN_OUT,
      clientId: process.env.NEXT_PUBLIC_AWS_AUTH_APP_CLIENT_ID,
      responseType: 'code',
    },
  },
  API: {
    endpoints: [
      {
        name: 'backend',
        endpoint: process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL,
        region: process.env.NEXT_PUBLIC_AWS_REGION,
      },
    ],
  },
};
