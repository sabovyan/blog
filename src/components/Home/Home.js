import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Banner from '../Banner/Banner';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LoginDisplayed: false,
      PasswordValue: {
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

  handleChange = ({ target: { value } }) => {
    this.setState({
      PasswordValue: {
        value,
      },
    });
  };

  handleClickShowPassword = () => {
    this.setState((prevState) => ({
      PasswordValue: {
        showPassword: !prevState.PasswordValue.showPassword,
      },
    }));
  };

  render() {
    const { LoginDisplayed, PasswordValue } = this.state;
    return (
      <div className="Home">
        <Banner onClick={this.handleBannerButtonClicked} />
        <div hidden={!LoginDisplayed} className="form__container">
          <form autoComplete="off">
            <TextField id="standard-basic" label="log in" />
            <FormControl>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={PasswordValue.showPassword ? 'text' : 'password'}
                value={PasswordValue.value}
                onChange={this.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {PasswordValue.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
        </div>
      </div>
    );
  }
}
