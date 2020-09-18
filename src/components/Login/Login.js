import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../services/Authentication';

import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormTheme from '../../components/FormTheme/FormTheme';

import styles from './Login.module.css';

function Login() {
  /* SECTION email */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { signin } = useAuth();
  const history = useHistory();

  const isInvalid = password === '' || email === '';

  const handleEmailInput = ({ target: { value } }) => setEmail(value);

  /* SECTION password */

  const handlePasswordInput = ({ target: { value } }) => setPassword(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(email, password)
      .then((user) => {
        history.push('/create');
      })
      .catch((error) => {
        setError(error.message);
      });
    // this.props.handlesAuthStatus();
    // this.props.history.push('/create');
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <h2 className={styles.title}>Sign In</h2>

        <FormTheme>
          <TextField
            className={styles.input}
            required
            minLength="5"
            id="outlined-required"
            label="email"
            variant="outlined"
            value={email}
            onChange={handleEmailInput}
          />

          <TextField
            required
            className={styles.input}
            id="outlined-password-input"
            label="password"
            type="password"
            value={password}
            autoComplete="current-password"
            variant="outlined"
            onChange={handlePasswordInput}
          />
          <Button
            type="submit"
            disabled={isInvalid}
            className={styles.submitBtn}
            variant="outlined"
            color="primary"
          >
            Sign In
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

export default Login;
