import React from 'react';

import AppHeader from './AppHeader';

export default function AppLayout({ children }) {
  return (
    <div>
      <AppHeader />
      <main>{children}</main>
    </div>
  );
}
