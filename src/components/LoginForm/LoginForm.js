import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

import styles from './LoginForm.module.css';
import Button from '@material-ui/core/Button';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import { LOGIN_REGEX, PASSWORD_REGEX } from './constants/constants';

/* TODO delete it after finishing the authentication and authorization */
// const theme = createMuiTheme({
//   palette: {
//     primary: green,
//   },
// });

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: createMuiTheme({
        palette: {
          primary: green,
        },
      }),
      userName: {
        validated: true,
        value: window.localStorage.getItem('username') || '',
      },
      password: {
        validated: true,
        value: window.localStorage.getItem('password') || '',
      },
    };
  }
  /* TODO change setstate */
  validateInput = (regEx, value, field) => {
    const validated = regEx.test(value);

    this.setState({
      userName: {
        validated,
        value,
      },
    });
  };

  /* SECTION login */
  handleLoginInput = ({ target: { value } }) => {
    this.validateInput(LOGIN_REGEX, value);
  };

  handleLoginFocus = () => {
    this.setState({
      userName: {
        validated: true,
      },
    });
  };

  handleLoginBlur = ({ target: { value } }) => {
    this.validateInput(LOGIN_REGEX, value);
  };

  /* SECTION password */
  handlePasswordInput = ({ target: { value } }) => {
    this.validateInput(PASSWORD_REGEX, value);
  };

  handlePasswordFocus = () => {
    this.setState({
      password: {
        validated: true,
      },
    });
  };

  handlePasswordBlur = ({ target: { value } }) => {
    this.validateInput(PASSWORD_REGEX, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userName, password } = this.state;

    if (userName.validated && password.validated) {
      window.localStorage.setItem('password', this.state.passwordValue);
      window.localStorage.setItem('username', this.state.userNameValue);
      this.setState({
        userNameValue: '',
        passwordValue: '',
      });
    }
  };

  render() {
    const { userName, password } = this.state;

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
              error={!userName.validated}
              required
              id="outlined-required"
              label={userName.validated ? 'username' : 'Error'}
              variant="outlined"
              value={userName.value}
              onChange={this.handleLoginInput}
              onFocus={this.handleLoginFocus}
              onBlur={this.handleLoginBlur}
            />

            <TextField
              required
              className={styles.input}
              error={!password.validated}
              id="outlined-password-input"
              label={password.validated ? 'password' : 'Error'}
              type="password"
              value={password.value}
              autoComplete="current-password"
              variant="outlined"
              onChange={this.handlePasswordInput}
              onFocus={this.handlePasswordFocus}
              onBlur={this.handlePasswordBlur}
            />
            <Button
              type="submit"
              disabled={userName.validated && password.validated ? false : true}
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
