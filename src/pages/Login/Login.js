import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter, Link } from 'react-router-dom';

import { TextField } from '@material-ui/core';

import Button from '@material-ui/core/Button';

import styles from './Login.module.css';

import FormTheme from '../../components/FormTheme/FormTheme';
import { LOGIN_REGEX, PASSWORD_REGEX } from './constants/constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameValidated: true,
      userNameValue: window.localStorage.getItem('username') || '',

      passwordValidated: true,
      passwordValue: window.localStorage.getItem('password') || '',
    };
  }

  /* SECTION login */
  validateLogin = (regEx, value) => {
    const validated = regEx.test(value);
    if (value.length < 5) {
      this.setState({
        userNameValidated: false,
      });
    } else {
      this.setState({
        userNameValidated: validated,
        userNameValue: value,
      });
    }
  };

  handleLoginInput = ({ target: { value } }) => {
    this.validateLogin(LOGIN_REGEX, value);
  };

  handleLoginFocus = () => {
    this.setState({
      userName: {
        validated: true,
      },
    });
  };

  handleLoginBlur = ({ target: { value } }) => {
    this.validateLogin(LOGIN_REGEX, value);
  };

  /* SECTION password */

  validatePassword = (regEx, value) => {
    const validated = regEx.test(value);
    if (value.length < 5 && value.length > 18) {
      this.setState({
        passwordValidated: false,
      });
    } else {
      this.setState({
        passwordValidated: validated,
        passwordValue: value,
      });
    }
  };

  handlePasswordInput = ({ target: { value } }) => {
    this.validatePassword(PASSWORD_REGEX, value);
  };

  handlePasswordFocus = () => {
    this.setState({
      password: {
        validated: true,
      },
    });
  };

  handlePasswordBlur = ({ target: { value } }) => {
    this.validatePassword(PASSWORD_REGEX, value);
  };

  addUser(user, password) {
    window.localStorage.setItem('password', password);
    window.localStorage.setItem('username', user);
    window.localStorage.setItem('isLoggedIn', true);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      userNameValidated,
      passwordValidated,
      passwordValue,
      userNameValue,
    } = this.state;

    if (userNameValidated && passwordValidated) {
      this.addUser(userNameValue, passwordValue);

      this.setState({
        userNameValue: '',
        passwordValue: '',
      });
    }
    this.props.handlesAuthStatus();
    this.props.history.push('/create');
  };

  render() {
    const {
      userNameValidated,
      userNameValue,
      passwordValidated,
      passwordValue,
    } = this.state;

    return (
      <div className={styles.root}>
        <form
          onSubmit={this.handleSubmit}
          className={styles.form}
          autoComplete="off"
        >
          <h2 className={styles.title}>Sign In</h2>

          <FormTheme>
            <TextField
              className={styles.input}
              error={!userNameValidated}
              required
              minLength="5"
              id="outlined-required"
              label={userNameValidated ? 'email' : 'Error'}
              variant="outlined"
              value={userNameValue}
              onChange={this.handleLoginInput}
              onFocus={this.handleLoginFocus}
              onBlur={this.handleLoginBlur}
            />

            <TextField
              required
              className={styles.input}
              error={!passwordValidated}
              id="outlined-password-input"
              label={passwordValidated ? 'password' : 'Error'}
              type="password"
              value={passwordValue}
              autoComplete="current-password"
              variant="outlined"
              minLength="6"
              onChange={this.handlePasswordInput}
              onFocus={this.handlePasswordFocus}
              onBlur={this.handlePasswordBlur}
            />
            <Button
              type="submit"
              disabled={userNameValidated && passwordValidated ? false : true}
              className={styles.submitBtn}
              variant="outlined"
              color="primary"
            >
              Sign In
            </Button>
          </FormTheme>
        </form>
        <p>
          if you don't have an account,{' '}
          <Link
            style={{
              textDecoration: 'none',
              color: 'green',
            }}
            to="/signup"
          >
            sign up
          </Link>
        </p>
      </div>
    );
  }
}

export default withRouter(Login);
