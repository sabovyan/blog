import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

export default function MenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });
  return (
    <Link className={match ? ' nav__link active' : 'nav__link'} to={to}>
      {label}
    </Link>
  );
}
