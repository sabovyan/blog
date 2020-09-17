import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Register.module.css';

import { withRouter, Link } from 'react-router-dom';

import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormTheme from '../FormTheme/FormTheme';

import { withFirebase } from '../../libraries/Firebase';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: null,
    };
  }

  /* SECTION userName */

  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  /* SECTION submit */

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        this.setState({
          email: '',
          password: '',
          username: '',
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
    this.props.history.push('/login');
  };

  render() {
    const { email, password, username, error } = this.state;
    const isInvalid = password === '' || email === '' || username === '';
    return (
      <div className={styles.root}>
        <form
          onSubmit={this.handleSubmit}
          className={styles.form}
          autoComplete="off"
        >
          <h2 className={styles.title}>Sign Up</h2>

          <FormTheme>
            <TextField
              name="username"
              required
              label="name"
              variant="outlined"
              value={username}
              onChange={this.onChange}
            />

            <TextField
              required
              label="email"
              name="email"
              variant="outlined"
              value={email}
              onChange={this.onChange}
            />

            <TextField
              required
              label="password"
              type="password"
              name="password"
              value={password}
              autoComplete="current-password"
              variant="outlined"
              onChange={this.onChange}
            />
            <Button
              type="submit"
              className={styles.submitBtn}
              variant="outlined"
              color="primary"
              disabled={isInvalid}
            >
              Sign Up
            </Button>
          </FormTheme>
          {error && (
            <p
              style={{
                color: 'red',
              }}
            >
              {error.message}
            </p>
          )}
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
            Sign In
          </Link>
        </p>
      </div>
    );
  }
}

export default withRouter(withFirebase(Register));
