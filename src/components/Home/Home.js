import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
