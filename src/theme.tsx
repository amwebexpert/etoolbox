import red from '@mui/material/colors/red';
import { Theme, createTheme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme { }
}

// A custom theme for this app
export const lightTheme = createTheme({
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

export const darkTheme = createTheme({
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
    if (theme.breakpoints.down('xs')) {
        return 'xs';
    } else if (theme.breakpoints.down('sm')) {
        return 'sm';
    } else if (theme.breakpoints.down('md')) {
        return 'md';
    } else if (theme.breakpoints.down('lg')) {
        return 'lg';
    } else if (theme.breakpoints.down('xl')) {
        return 'xl';
    }

    return 'xl';
}
