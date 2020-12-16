import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Color } from "@material-ui/lab";

import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import WrapTextIcon from '@material-ui/icons/WrapText';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

import About from './components/About/About';
import Home from './components/Home';
import URLParser from './components/URLParser';
import JSONFormatter from './components/JSONFormatter';
import { useStyles } from './styles';
import { Snackbar } from '@material-ui/core';
import URLEncoder from './components/URLEncoder';
import Base64Encoder from './components/Base64Encoder';
import { Toaster, ToasterState, ToasterContext } from "./components/Toaster";

const App: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [toasterState, setToasterState] = React.useState<ToasterState>({ open: false, message: '', type: 'success', autoHideDuration: 4000 });

  React.useEffect(setupIPC, [history]);

  function setupIPC() {
    // Will be defined if the React App is running inside Electron
    if (!window.require) {
      return;
    }
    const ipc = window.require("electron").ipcRenderer;
    ipc.send('rendererAppStarted');
    ipc.on('navigateTo', (_event: any, path: string) => history.push(path));
    ipc.on('displayAlertMessage', (_event: any, toaster: ToasterState) => setToasterState(toaster));
  }

  return (
    <>
      <Helmet
        titleTemplate="%s - Web Toolbox"
        defaultTitle="Web Toolbox"
      >
        <meta name="description" content="Web Toolbox app. A collection of utilities for developers." />
      </Helmet>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open sidebar menu"
              onClick={() => setOpen(true)}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap className={classes.title}>
              Web Toolbox
            </Typography>

            <IconButton color="inherit">
              <Link to="/about" className={classes.linkMenu}>
                <InfoIcon />
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={() => setOpen(false)}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/" title="Home" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            <Link to="/URLParser" title="URL parser" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <LinkIcon />
                </ListItemIcon>
                <ListItemText primary={"URL Parser"} />
              </ListItem>
            </Link>
            <Link to="/URLEncoder" title="URL Encoder/decoder" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <LinkOffIcon />
                </ListItemIcon>
                <ListItemText primary={"URL Encoder"} />
              </ListItem>
            </Link>
            <Link to="/Base64Encoder" title="Base64 Encoder/decoder" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <DeveloperBoardIcon />
                </ListItemIcon>
                <ListItemText primary={"Base64 Encoder"} />
              </ListItem>
            </Link>
            <Link to="/JSONFormatter" title="JSON Formatter" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <WrapTextIcon />
                </ListItemIcon>
                <ListItemText primary={"JSON Formatter"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <ToasterContext.Provider value={{ toasterState, setToasterState }}>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route exact path="/about"><About /></Route>
              <Route exact path="/URLParser"><URLParser /></Route>
              <Route exact path="/URLEncoder"><URLEncoder /></Route>
              <Route exact path="/Base64Encoder"><Base64Encoder /></Route>
              <Route exact path="/JSONFormatter"><JSONFormatter /></Route>
            </Switch>
          </main>
          <Toaster />
        </ToasterContext.Provider>
      </div>
    </>
  );
}

export default App;
