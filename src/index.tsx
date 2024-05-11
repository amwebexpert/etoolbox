import './wdyr'; // <--- first import

import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './App';
import { PreferencesContext, PreferencesProvider } from './components/Preferences/PreferencesProvider';
import GlobalSpinnerProvider from './components/Spinner/GlobalSpinnerProvider';
import GlobalStyle from './global-styles';
import store from './store';
import { darkTheme, lightTheme } from './theme';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
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
  </Provider>
);
