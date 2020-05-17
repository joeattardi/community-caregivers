import React from 'react';

import { Router } from '@reach/router';

import AppLayout from '../components/app/AppLayout';
import Signup from '../components/app/Signup';

export default function App() {
  return (
    <AppLayout>
      <Router basepath="/cc">
        <Signup path="/signup" />
      </Router>
    </AppLayout>
  );
}
