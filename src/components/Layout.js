import React from 'react';
import { Helmet } from 'react-helmet';

import Header from './Header';

export default function Layout({ children }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Community Caregivers</title>
      </Helmet>

      <Header />

      <div>
        {children}
      </div>
    </div>
  );
}
