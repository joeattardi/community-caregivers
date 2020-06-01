import React, { useContext } from 'react';

import withAuth from './auth/withAuth';
import UserContext from './UserContext';

import AppLayout from './common/AppLayout';

import styles from './Home.module.scss';

function Home() {
  const user = useContext(UserContext);

  return (
    <AppLayout>
      <div className={styles.main}>
        <h1>Hello, {user.firstName}!</h1>
      </div>
    </AppLayout>
  );
}

export default withAuth(Home);
