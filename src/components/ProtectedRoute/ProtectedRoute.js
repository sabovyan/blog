import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({
  path,
  isAuth,
  component: Component,
  ...props
}) {
  return (
    <Route path={path}>
      {isAuth ? <Component {...props} /> : <Redirect to="/login" />}
    </Route>
  );
}
