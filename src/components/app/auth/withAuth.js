/* eslint react/display-name: 0 */
import React, { useContext } from 'react';

import { navigate } from 'gatsby';

import UserContext from '../UserContext';

export default function withAuth(Component) {
  return function (props) {
    const user = useContext(UserContext);

    if (!user) {
      navigate('/cc/login');
      return null;
    }

    return <Component {...props} />;
  };
}
