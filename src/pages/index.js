import React from 'react';

import Layout from '../components/Layout';

import styles from './index.module.scss';

export default function IndexPage() {
  return (
    <Layout>
      <div className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.title}>
            <h1>Make an impact today</h1>
            <p>
              We are a group of caring volunteers shopping and delivering
              groceries to seniors and our disabled neighbors. We also work
              closely with the Community Pantry to deliver food to anyone who is
              food insecure. No one should ever be hungry!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
