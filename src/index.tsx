import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import GlobalStyle from './global-styles';
import store from './store';
import theme from './theme';
import GlobalSpinnerProvider from './components/Spinner/GlobalSpinnerProvider';



ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <HashRouter>
        <GlobalSpinnerProvider>
          <App />
        </GlobalSpinnerProvider>
      </HashRouter>
    </ThemeProvider>
    <GlobalStyle />
  </Provider>,
  document.querySelector('#root'),
);
