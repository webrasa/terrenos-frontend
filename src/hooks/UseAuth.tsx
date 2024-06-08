import { useRouter } from 'next/router';
import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

import type { UserAuth, UserProfile } from '@/types/Auth';
import { AuthState } from '@/types/Auth';

import { useProviderInfo } from './UseProviderInfo';

// React Hook Context for authentification
export const AuthContext = createContext<UserAuth | null>(null);

export type IAuthProviderProps = {
  children: ReactNode;
  requireAuth?: boolean;
};

/**
 * The provider component of React Hook Context for authentication.
 * @hook
 * @params props - Component props.
 * @param props.children -  Children components.
 */
export const AuthProvider = (props: IAuthProviderProps) => {
  const { requireAuth = true, children } = props;
  const router = useRouter();
  const { userInfo } = useProviderInfo();

  // Retrieves User information and if it's the first sign in, it creates a new data entry for the user.
  const { data } = useSWR<UserProfile>(
    userInfo !== AuthState.UNAUTHENTICATED &&
      userInfo !== AuthState.AUTHENTICATING
      ? `/user/profile?email=${encodeURIComponent(userInfo.email)}`
      : null,
  );

  if (
    userInfo === AuthState.AUTHENTICATING ||
    (requireAuth && userInfo === AuthState.UNAUTHENTICATED) ||
    (requireAuth && !data)
  ) {
    if (userInfo === AuthState.UNAUTHENTICATED && requireAuth) {
      router.push('/signin');
    }

    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        providerInfo: userInfo,
        profile: data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Consume React Hook Context for authentication
 * @hook
 */
export const useAuth = () => {
  const userInfo = useContext(AuthContext);

  if (!userInfo) {
    throw new Error(
      'Auth: `useAuth` hook must be wrapped within a `AuthProvider` component',
    );
  }

  return userInfo;
};

export const withAuth = (Page: FunctionComponent<PropsWithChildren>) => {
  return function AuthenticatedPage(props: PropsWithChildren) {
    return (
      <AuthProvider>
        <Page {...props} />
      </AuthProvider>
    );
  };
};
