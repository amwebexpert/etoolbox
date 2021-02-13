
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
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

export default theme;