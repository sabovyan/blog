import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function ProtectedRoute({
  path,
  isAuth,
  component: Component,
  ...props
}) {
  return (
    <Route path={path}>
      {isAuth === null ? (
        <Loading />
      ) : isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )}
    </Route>
  );
}
