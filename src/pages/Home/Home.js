import React from 'react';

import Banner from '../../components/Banner/Banner';

export default function Home({ auth }) {
  return (
    <div className="Home">
      <Banner auth={auth} />
    </div>
  );
}
