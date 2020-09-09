import React, { Component } from 'react';

import Banner from '../Banner/Banner';
// import LoginForm from '../LoginForm/LoginForm';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Banner hidden={this.props.hidden} />
      </div>
    );
  }
}
