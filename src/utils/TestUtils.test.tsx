import type { ITestingAuthProviderProps } from '__mocks__/UseAuth';
import { TestingAuthProvider } from '__mocks__/UseAuth';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import axios from 'axios';
import type { ReactElement } from 'react';
import { SWRConfig } from 'swr';

export const authProviderRender = (
  ui: ReactElement,
  authOptions?: Omit<ITestingAuthProviderProps, 'children'>,
  renderOptions?: RenderOptions
) =>
  render(
    <TestingAuthProvider {...authOptions}>{ui}</TestingAuthProvider>,
    renderOptions
  );

export const fetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export const swrConfigRender = (
  ui: ReactElement,
  renderOptions?: RenderOptions
) =>
  render(
    <SWRConfig
      value={{
        provider: () => new Map(),
        fetcher,
        dedupingInterval: 0,
      }}
    >
      {ui}
    </SWRConfig>,
    renderOptions
  );

export const swrConfigWithAuthRender = (
  ui: ReactElement,
  authOptions?: Omit<ITestingAuthProviderProps, 'children'>,
  renderOptions?: RenderOptions
) =>
  render(
    <SWRConfig
      value={{
        provider: () => new Map(),
        fetcher,
        dedupingInterval: 0,
      }}
    >
      <TestingAuthProvider {...authOptions}>{ui}</TestingAuthProvider>
    </SWRConfig>,
    renderOptions
  );
