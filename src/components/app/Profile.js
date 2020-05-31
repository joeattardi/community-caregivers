import React from 'react';

import withAuth from './auth/withAuth';

function Profile() {
  return (
    <h1>Profile</h1>
  );
}

export default withAuth(Profile);
