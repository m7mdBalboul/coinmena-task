import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from 'context/router';
import { AuthProvider } from 'context/auth';
import { QueryProvider } from 'context/query';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>
);
