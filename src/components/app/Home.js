import React from 'react';

import withAuth from './auth/withAuth';

function Home() {
  return <h1>Home</h1>;
}

export default withAuth(Home);
