import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Register.module.css';

import { withRouter, Link } from 'react-router-dom';

import { TextField } from '@material-ui/core';

import Button from '@material-ui/core/Button';

import FormTheme from '../../components/FormTheme/FormTheme';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: '',

      passwordValue: '',
    };
  }

  /* SECTION login */

  handleLoginInput = ({ target: { value } }) => {
    this.setState({
      emailValue: value,
    });
  };

  handleLoginFocus = () => {
    this.setState({
      userName: {
        validated: true,
      },
    });
  };

  handleLoginBlur = ({ target: { value } }) => {};

  /* SECTION password */

  handlePasswordInput = ({ target: { value } }) => {
    this.setState({
      passwordValue: value,
    });
  };

  handlePasswordFocus = () => {};

  handlePasswordBlur = ({ target: { value } }) => {};

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      userNameValue: '',
      passwordValue: '',
    });

    this.props.handlesAuthStatus();
    this.props.history.push('/create');
  };

  render() {
    const { emailValue, passwordValue } = this.state;

    return (
      <div className={styles.root}>
        <form
          onSubmit={this.handleSubmit}
          className={styles.form}
          autoComplete="off"
        >
          <h2 className={styles.title}>Register</h2>

          <FormTheme>
            <TextField
              className={styles.input}
              required
              id="outlined-required"
              label="email"
              variant="outlined"
              value={emailValue}
              onChange={this.handleLoginInput}
              onFocus={this.handleLoginFocus}
              onBlur={this.handleLoginBlur}
            />

            <TextField
              required
              className={styles.input}
              id="outlined-password-input"
              label="password"
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
              className={styles.submitBtn}
              variant="outlined"
              color="primary"
            >
              Register
            </Button>
          </FormTheme>
        </form>
        <p>
          if you have an account,{' '}
          <Link
            style={{
              textDecoration: 'none',
              color: 'green',
            }}
            to="/login"
          >
            Log In
          </Link>
        </p>
      </div>
    );
  }
}

export default withRouter(Register);
