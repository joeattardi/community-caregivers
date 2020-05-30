/* eslint react/display-name: 0 */
import React, { useEffect, useContext } from 'react';

import { navigate } from 'gatsby';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from 'react-loader-spinner';

import FirebaseContext from '../../../firebase/FirebaseContext';

export default function withAuth(Component) {
  return function (props) {
    const firebaseRef = useContext(FirebaseContext);
    const [user, loading] = useAuthState(firebaseRef.auth());

    useEffect(() => {
      if (!loading && !user) {
        navigate('/cc/login');
      }
    }, [loading, user]);

    if (loading) {
      return (
        <div style={{ textAlign: 'center', margin: '2rem' }}>
          <Loader type="ThreeDots" color="#9fae77" width={256} height={256} />
        </div>
      );
    }

    return <Component {...props} />;
  };
}
