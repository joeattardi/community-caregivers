import React from 'react';

import { Link } from 'gatsby';

import Layout from '../components/Layout';

import styles from './404.module.scss';

export default function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.main}>
        <h1>Page not found</h1>
        <p>We&apos;re sorry, the page you requested was not found.</p>
        <p>
          <Link to="/">Return to the home page</Link>
        </p>
      </div>
    </Layout>
  );
}
