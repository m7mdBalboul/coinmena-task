import React from 'react';
import { useAuth } from 'context/auth';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }: React.PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated && !location.pathname.includes('login')) {
    return (
      <Navigate
        to={`/home/login`}
        replace
        state={{ from: location }}
      />
    );
  }
  return <>{children}</>;
}

export { ProtectedRoute };
