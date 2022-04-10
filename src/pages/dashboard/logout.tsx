import { useEffect } from 'react';

import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await Auth.signOut();

      await router.push('/');
    };

    logout();
  }, [router]);

  return null;
};

export default Logout;
