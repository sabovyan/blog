import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';
// import LoginForm from '../LoginForm/LoginForm';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginDisplayed: false,
      password: {
        showPassword: false,
        value: '',
      },
    };
  }

  handleBannerButtonClicked = () => {
    this.setState((prevState) => ({
      LoginDisplayed: !prevState.LoginDisplayed,
    }));
  };

  handlePasswordChange = ({ target: { value } }) => {
    this.setState({
      password: {
        value,
      },
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.formValidated) {
    }
  };

  handleClickShowPassword = () => {};

  render() {
    const { LoginDisplayed, password } = this.state;
    return (
      <div className="Home">
        <Banner onClick={this.handleBannerButtonClicked} />
      </div>
    );
  }
}
