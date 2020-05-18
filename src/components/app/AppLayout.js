import React from 'react';
import { Helmet } from 'react-helmet';

import AppHeader from './AppHeader';

import styles from './AppLayout.module.scss';
import '../../app.scss';

export default function AppLayout({ children }) {
  return (
    <>
      <AppHeader />
      <div className={styles.root}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Caregiver Connect</title>
        </Helmet>
        <main className={styles.content}>{children}</main>
      </div>
    </>
  );
}
