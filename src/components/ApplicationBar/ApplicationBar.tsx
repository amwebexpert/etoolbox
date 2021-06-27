import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import InfoIcon from '@material-ui/icons/Info';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { DRAWER_WIDTH } from '../../constants';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    deviceInfo: {
        cursor: 'pointer',
    },
    linkMenu: {
        textDecoration: 'none',
        color: 'inherit',
        paddingRight: theme.spacing(1.5),
    },
}));

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    width: Breakpoint;
}

const ApplicationBar = ({ open, setOpen, width }: Props) => {
    const classes = useStyles();

    return (
        <AppBar
            position='fixed'
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    title='Toggle sidebar menu'
                    aria-label='open sidebar menu'
                    onClick={() => setOpen(true)}
                    edge='start'
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant='body1' noWrap className={classes.title}>
                    Web Toolbox
                </Typography>

                <NavLink to='/preferences' className={classes.linkMenu} title='Settings'>
                    <SettingsIcon />
                </NavLink>

                <NavLink to='/about' className={classes.linkMenu} title='About this application…'>
                    <InfoIcon />
                </NavLink>

                <Typography variant='body2' title={`Device size actually detected as [${width}]`} className={classes.deviceInfo}>
                    {width}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default withWidth()(ApplicationBar);
