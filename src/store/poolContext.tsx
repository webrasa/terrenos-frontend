import React from 'react';

export function poolProviders(...providers: any[]) {
  return ({ children }: any) =>
    providers.reduce(
      (prev, CurrentProvider) => <CurrentProvider>{prev}</CurrentProvider>,
      children,
    );
}
