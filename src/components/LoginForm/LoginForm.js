import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

import styles from './LoginForm.module.css';
import Button from '@material-ui/core/Button';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      isLoginValidated: true,
      isPasswordValidated: true,
      open: false,
      success: false,
      alertSuccessMassage: 'Well Done you did it!',
      userNameValue: window.localStorage.getItem('username') || '',
      passwordValue: window.localStorage.getItem('password') || '',
    };
  }
  loginValidation(value) {
    const reg = /[^0-9 ]{5,18}/gi;
    const res = reg.test(value);

    if (!res) {
      this.setState({
        isLoginValidated: false,
      });
    } else {
      this.setState({
        isLoginValidated: true,
      });
    }
    this.setState({
      userNameValue: value,
    });
  }

  handleLoginInput = ({ target: { value } }) => {
    this.loginValidation(value);
  };

  handleLoginFocus = () => {
    this.setState({
      isLoginValidated: true,
    });
  };

  handleLoginBlur = ({ target: { value } }) => {
    this.loginValidation(value);
  };

  passwordValidation(value) {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,18}$/gm;
    const res = reg.test(value);
    if (!res) {
      this.setState({
        isPasswordValidated: false,
      });
    } else {
      this.setState({
        isPasswordValidated: true,
      });
    }
    this.setState({
      passwordValue: value,
    });
  }

  handlePasswordInput = ({ target: { value } }) => {
    this.passwordValidation(value);
  };
  handlePasswordFocus = () => {
    this.setState({
      isPasswordValidated: true,
    });
  };

  handlePasswordBlur = ({ target: { value } }) => {
    this.passwordValidation(value);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.isLoginValidated && this.state.isPasswordValidated) {
      window.localStorage.setItem('password', this.state.passwordValue);
      window.localStorage.setItem('username', this.state.userNameValue);
      this.setState({
        open: true,
        success: true,
        userNameValue: '',
        passwordValue: '',
      });
    } else {
      this.setState({
        open: true,
        success: false,
      });
    }
  };

  render() {
    const {
      isLoginValidated,
      isPasswordValidated,
      userNameValue,
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

          <ThemeProvider theme={theme}>
            <TextField
              className={styles.input}
              error={!isLoginValidated}
              required
              id="outlined-required"
              label={isLoginValidated ? 'username' : 'Error'}
              variant="outlined"
              value={userNameValue}
              onChange={this.handleLoginInput}
              onFocus={this.handleLoginFocus}
              onBlur={this.handleLoginBlur}
            />

            <TextField
              required
              className={styles.input}
              error={!isPasswordValidated}
              id="outlined-password-input"
              label={isPasswordValidated ? 'password' : 'Error'}
              type="password"
              value={passwordValue}
              autoComplete="current-password"
              variant="outlined"
              onChange={this.handlePasswordInput}
              onFocus={this.handlePasswordFocus}
              onBlur={this.handlePasswordBlur}
            />
            <Button
              type="submit"
              disabled={isLoginValidated && isPasswordValidated ? false : true}
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
