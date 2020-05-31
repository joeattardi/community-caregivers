import React, { useContext } from 'react';

import withAuth from './auth/withAuth';

import UserContext from './UserContext';

import styles from './Home.module.scss';

function Home() {
  const user = useContext(UserContext);

  return (
    <div className={styles.main}>
      <h1>Hello, {user.firstName}!</h1>
    </div>
  );
}

export default withAuth(Home);
