import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Register.module.css';

import { withRouter, Link } from 'react-router-dom';

import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormTheme from '../FormTheme/FormTheme';

import { withFirebase } from '../../libraries/Firebase';

function Register({ firebase }) {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const isInvalid = password === '' || email === '' || username === '';

  const handleUserNameInput = ({ target: { value } }) => setUserName(value);
  const handleEmailInput = ({ target: { value } }) => setEmail(value);
  const handlePassword = ({ target: { value } }) => setPassword(value);

  /* SECTION submit */

  const handleSubmit = (e) => {
    e.preventDefault();
    // firebase
    //   .doCreateUserWithEmailAndPassword(email, password)
    //   .then((authUser) => {
    //     this.setState({
    //       email: '',
    //       password: '',
    //       username: '',
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({ error });
    //   });
  };

  /*  componentWillUnmount() {
    this.props.firebase.unSubscribe();
  } */

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <h2 className={styles.title}>Sign Up</h2>

        <FormTheme>
          <TextField
            name="username"
            required
            label="name"
            variant="outlined"
            value={username}
            onChange={handleUserNameInput}
          />

          <TextField
            required
            label="email"
            name="email"
            variant="outlined"
            value={email}
            onChange={handleEmailInput}
          />

          <TextField
            required
            label="password"
            type="password"
            name="password"
            value={password}
            autoComplete="current-password"
            variant="outlined"
            onChange={handlePassword}
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
          to="/signin"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default withRouter(withFirebase(Register));
