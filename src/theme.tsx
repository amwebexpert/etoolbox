
import red from '@material-ui/core/colors/red';
import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
export const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#bf3a2b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e84b3c',
      contrastText: '#fff',
    },
    error: {
      main: red.A400,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#bf3a2b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e84b3c',
      contrastText: '#fff',
    },
    error: {
      main: red.A400,
    },
  },
});
