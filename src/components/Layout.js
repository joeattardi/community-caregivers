import React from 'react';
import { Helmet } from 'react-helmet';

import Footer from './Footer';
import Header from './Header';

import styles from './Layout.module.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Community Caregivers</title>
      </Helmet>

      <Header />

      <div className={styles.content}>
        {children}
      </div>
      
      <Footer />
    </div>
  );
}
