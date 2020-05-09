import React from 'react';
import { Helmet } from 'react-helmet';

import Footer from './Footer';
import Header from './Header';

import styles from './Layout.module.scss';

export default function Layout({ children }) {
  return (
    <>
    <Header />
    <div className={styles.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Community Caregivers US</title>
      </Helmet>
      <div className={styles.content}>
        {children}
      </div>
    </div>
    <Footer />
    </>
  );
}
