export const AwsConfig = {
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
