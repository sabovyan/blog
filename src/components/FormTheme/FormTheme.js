import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green, deepOrange } from '@material-ui/core/colors';

export default function FormTheme({ children }) {
  const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: deepOrange,
    },
  });
  return <ThemeProvider theme={theme} children={children} />;
}
