import React from 'react';

import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { DRAWER_WIDTH } from '../../constants';
import { useGetBreakpoint } from '../../theme';

const useStyles = makeStyles(theme => ({
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

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ApplicationBar: React.FC<Props> = ({ open, setOpen }) => {
  const classes = useStyles();
  const breakpoint = useGetBreakpoint();

  return (
    <AppBar position="fixed">
      <Toolbar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        {!open && (
          <IconButton
            color="inherit"
            title="Toggle sidebar menu"
            aria-label="open sidebar menu"
            onClick={() => setOpen(true)}
            edge="start"
            className={clsx(classes.menuButton)}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="body1" noWrap className={classes.title}>
          Web Toolbox
        </Typography>

        <NavLink role="link" to="/preferences" className={classes.linkMenu} title="Settings">
          <SettingsIcon />
        </NavLink>

        <NavLink role="link" to="/about" className={classes.linkMenu} title="About this application…">
          <InfoIcon />
        </NavLink>

        <Typography
          variant="body2"
          title={`Device breakpoint category actually detected: [${breakpoint}]`}
          className={classes.deviceInfo}>
          {breakpoint}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
