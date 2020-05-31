import React from 'react';

import withAuth from './auth/withAuth';

import AppLayout from './common/AppLayout';

function Profile() {
  return (
    <AppLayout title="My Profile">
    </AppLayout>
  );
}

export default withAuth(Profile);
