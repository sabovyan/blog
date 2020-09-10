import React, { Component } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export default class FormTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: createMuiTheme({
        palette: {
          primary: green,
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
