import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import styles from './Register.module.css';

import { Link } from 'react-router-dom';

import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormTheme from '../FormTheme/FormTheme';
import { useAuth } from '../../services/Authentication';

function Register() {
  const { signup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const isInvalid = password === '' || email === '';

  const handleEmailInput = ({ target: { value } }) => setEmail(value);
  const handlePassword = ({ target: { value } }) => setPassword(value);

  /* SECTION submit */

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(email, password)
      .then((user) => console.log(user))
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <h2 className={styles.title}>Sign Up</h2>
        <FormTheme>
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
        <p
          style={{
            color: 'red',
          }}
        >
          {error}
        </p>
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

export default Register;
