import React from 'react';
import { Helmet } from 'react-helmet';

import AppHeader from './AppHeader';
import PageTitle from './PageTitle';

import styles from './AppLayout.module.scss';
import '../../../app.scss';

export default function AppLayout({ children, title }) {
  return (
    <>
      <AppHeader />
      {title && <PageTitle title={title} />}
      <div className={styles.root}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {title ? `${title} - Caregiver Connect` : 'Caregiver Connect'}
          </title>
        </Helmet>
        <main className={styles.content}>{children}</main>
      </div>
    </>
  );
}
