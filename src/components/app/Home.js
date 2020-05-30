import React, { useContext } from 'react';

import withAuth from './auth/withAuth';

import UserContext from './UserContext';

function Home() {
  const user = useContext(UserContext);

  return <h1>Home</h1>;
}

export default withAuth(Home);
