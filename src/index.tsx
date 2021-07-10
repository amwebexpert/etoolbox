import './wdyr'; // <--- first import

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import {
  PreferencesContext,
  PreferencesProvider,
} from './components/Preferences/PreferencesProvider';
import GlobalSpinnerProvider from './components/Spinner/GlobalSpinnerProvider';
import GlobalStyle from './global-styles';
import store from './store';
import { darkTheme, lightTheme } from './theme';

ReactDOM.render(
  <Provider store={store}>
    <PreferencesProvider>
      <PreferencesContext.Consumer>
        {({ isDark }) => (
          <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <HashRouter>
              <GlobalSpinnerProvider>
                <App />
              </GlobalSpinnerProvider>
            </HashRouter>
          </ThemeProvider>
        )}
      </PreferencesContext.Consumer>
    </PreferencesProvider>
    <GlobalStyle />
  </Provider>,
  document.querySelector('#root')
);
