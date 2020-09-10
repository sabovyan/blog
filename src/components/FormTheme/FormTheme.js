import React, { Component } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green, deepOrange } from '@material-ui/core/colors';

export default class FormTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: createMuiTheme({
        palette: {
          primary: green,
          secondary: deepOrange,
        },
      }),
    };
  }
  render() {
    return (
      <ThemeProvider theme={this.state.theme} children={this.props.children} />
    );
  }
}
