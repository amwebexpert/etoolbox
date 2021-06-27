import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from './constants';

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        // change width to zero (0) here to completely hide the left menu bar
        width: theme.spacing(7) + 1,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    toolbarIconContainer: {
        display: 'flex',
        flex: 1,
    },
    toolbarIcon: {
        height: 42,
    },
    menu: {
        paddingTop: 0,
    },
    content: {
        flexGrow: 1,
    },
    linkMenu: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));
