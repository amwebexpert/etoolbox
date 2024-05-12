import red from '@mui/material/colors/red';
import { createTheme, Theme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {
    // https://stackoverflow.com/a/70707121/704681
  }
}

// A custom theme for this app
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
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
    mode: 'dark',
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

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function useIsWidthUp(breakpoint: Breakpoint) {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint));
}

export function useIsWidthDown(breakpoint: Breakpoint) {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
}

export function useGetBreakpoint(): Breakpoint {
  const theme = useTheme();
  const values = {
    xl: useMediaQuery(theme.breakpoints.up('xl')),
    isBetweenLgXl: useMediaQuery(theme.breakpoints.up('lg')),
    isBetweenMdLg: useMediaQuery(theme.breakpoints.up('md')),
    isBetweenSmMd: useMediaQuery(theme.breakpoints.up('sm')),
    isXs: useMediaQuery(theme.breakpoints.up('xs')),
  };

  if (values.xl) {
    return 'xl';
  } else if (values.isBetweenLgXl) {
    return 'lg';
  } else if (values.isBetweenMdLg) {
    return 'md';
  } else if (values.isBetweenSmMd) {
    return 'sm';
  } else {
    return 'xs';
  }
}
