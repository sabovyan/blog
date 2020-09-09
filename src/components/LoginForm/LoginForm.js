import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

import styles from './LoginForm.module.css';
import Button from '@material-ui/core/Button';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import { LOGIN_REGEX, PASSWORD_REGEX } from './constants/constants';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: createMuiTheme({
        palette: {
          primary: green,
        },
      }),
      userNameValidated: true,
      userNameValue: window.localStorage.getItem('username') || '',

      passwordValidated: true,
      passwordValue: window.localStorage.getItem('password') || '',
    };
  }

  /* SECTION login */
  validateLogin = (regEx, value) => {
    const validated = regEx.test(value);
    this.setState({
      userNameValidated: validated,
      userNameValue: value,
    });
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

    this.setState({
      passwordValidated: validated,
      passwordValue: value,
    });
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { userNameValidated, passwordValidated } = this.state;

    if (userNameValidated && passwordValidated) {
      window.localStorage.setItem('password', this.state.passwordValue);
      window.localStorage.setItem('username', this.state.userNameValue);
      this.setState({
        userNameValue: '',
        passwordValue: '',
      });
    }
    this.props.handlesAuthStatus();
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
          <h2 className={styles.title}>Login</h2>

          <ThemeProvider theme={this.state.theme}>
            <TextField
              className={styles.input}
              error={!userNameValidated}
              required
              minLength="5"
              id="outlined-required"
              label={userNameValidated ? 'username' : 'Error'}
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
          </ThemeProvider>
        </form>
      </div>
    );
  }
}
