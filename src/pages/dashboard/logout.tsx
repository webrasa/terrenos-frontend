import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await Auth.signOut();

      await router.push('/');
    };

    logout();
  }, []);

  return null;
};

export default Logout;
