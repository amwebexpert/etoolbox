import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, NavLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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
import TextRotationNoneIcon from '@material-ui/icons/TextRotationNone';
import HomeIcon from '@material-ui/icons/Home';
import WrapTextIcon from '@material-ui/icons/WrapText';
import LinkIcon from '@material-ui/icons/Link';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PanoramaIcon from '@material-ui/icons/Panorama';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import SimCardIcon from '@material-ui/icons/SimCard';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import PaletteIcon from '@material-ui/icons/Palette';
import SelectAllIcon from '@material-ui/icons/SelectAll';

import About from './components/About/About';
import Home from './components/Home';
import URLParser from './containers/URLParser';
import JSONFormatter from './containers/JSONFormatter';
import { useStyles } from './styles';
import URLEncoder from './containers/URLEncoder';
import Base64Encoder from './containers/Base64Encoder';
import ToasterProvider from './components/Toaster/ToasterProvider';
import RegExTester from './containers/RegExTester';
import UUIDGenerator from './containers/UUIDGenerator';
import JWTDecoder from './containers/JWTDecoder';
import Base64ImageEncoder from './containers/Base64ImageEncoder';
import ImageOCR from './containers/ImageOCR';
import ColorPicker from './containers/ColorPicker';
import QRCodeGenerator from './containers/QRCodeGenerator';

interface Props {
  width: Breakpoint;
}

const App: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(isWidthUp('md', props.width));

  React.useEffect(setupIPC, [history]);

  function setupIPC() {
    // Will be defined if the React App is running inside Electron
    if (window.require) {
      const ipc = window.require("electron").ipcRenderer;
      ipc.send('rendererAppStarted');
      ipc.on('navigateTo', (_event: any, path: string) => history.push(path));
    }
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
              title="Toggle sidebar menu"
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

            <IconButton color="inherit" title="About this application...">
              <NavLink to="/about" className={classes.linkMenu}>
                <InfoIcon />
              </NavLink>
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
            <IconButton onClick={() => setOpen(false)} title="Toggle sidebar menu">
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <NavLink to="/" title="Home" exact={true} className={classes.link} activeClassName={classes.linkActive}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </NavLink>
            <NavLink to="/URLParser" title="URL parser" className={classes.link} activeClassName={classes.linkActive}>
              <ListItem button>
                <ListItemIcon>
                  <LinkIcon />
                </ListItemIcon>
                <ListItemText primary={"URL Parser"} />
              </ListItem>
            </NavLink>
            <NavLink to="/URLEncoder" title="URL Encoder/decoder" className={classes.link} activeClassName={classes.linkActive}>
              <ListItem button>
                <ListItemIcon>
                  <LinkOffIcon />
                </ListItemIcon>
                <ListItemText primary={"URL Encoder"} />
              </ListItem>
            </NavLink>
            <NavLink to="/Base64Encoder" title="Base64 Encoder/decoder" className={classes.link} activeClassName={classes.linkActive}>
              <ListItem button>
                <ListItemIcon>
                  <DeveloperBoardIcon />
                </ListItemIcon>
                <ListItemText primary={"Base64 Encoder"} />
              </ListItem>
            </NavLink>
            <NavLink to="/Base64ImageEncoder" title="Base64 image encoder" className={classes.link} activeClassName={classes.linkActive}>
              <ListItem button>
                <ListItemIcon>
                  <PanoramaIcon />
                </ListItemIcon>
                <ListItemText primary={"Image encoder"} />
              </ListItem>
            </NavLink>
            <NavLink to="/JSONFormatter" title="JSON Formatter" className={classes.link} activeClassName={classes.linkActive}>
              <ListItem button>
                <ListItemIcon>
                  <WrapTextIcon />
                </ListItemIcon>
                <ListItemText primary={"JSON Formatter"} />
              </ListItem>
            </NavLink>
            <NavLink to="/RegExTester" title="Regular expression tester" className={classes.link} activeClassName={classes.linkActive}>
              <ListItem button>
                <ListItemIcon>
                  <TextRotationNoneIcon />
                </ListItemIcon>
                <ListItemText primary="RegEx tester" />
              </ListItem>
            </NavLink>
            <NavLink to="/UUIDGenerator" title="UUID generator" className={classes.link} activeClassName={classes.linkActive}>
              <ListItem button>
                <ListItemIcon>
                  <SimCardIcon />
                </ListItemIcon>
                <ListItemText primary="UUID generator" />
              </ListItem>
            </NavLink>
            <NavLink to="/JWTDecoder" title="JSON Web Token decoder" className={classes.link} activeClassName={classes.linkActive}>
              <ListItem button>
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary="JWT decoder" />
              </ListItem>
            </NavLink>
            <NavLink to="/QRCodeGenerator" title="QR Code generator" className={classes.link} activeClassName={classes.linkActive}>
              <ListItem button>
                <ListItemIcon>
                  <SelectAllIcon />
                </ListItemIcon>
                <ListItemText primary="QR Code generator" />
              </ListItem>
            </NavLink>
            <NavLink to="/ImageOCR" title="Image text extractor" className={classes.link} activeClassName={classes.linkActive}>
              <ListItem button>
                <ListItemIcon>
                  <TextFieldsIcon />
                </ListItemIcon>
                <ListItemText primary="Image OCR" />
              </ListItem>
            </NavLink>
            <NavLink to="/ColorPicker" title="Image color picker" className={classes.link} activeClassName={classes.linkActive}>
              <ListItem button>
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary="Color picker" />
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
        <ToasterProvider>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route exact path="/about"><About /></Route>
              <Route exact path="/URLParser"><URLParser /></Route>
              <Route exact path="/URLEncoder"><URLEncoder /></Route>
              <Route exact path="/Base64Encoder"><Base64Encoder /></Route>
              <Route exact path="/Base64ImageEncoder"><Base64ImageEncoder /></Route>
              <Route exact path="/JSONFormatter"><JSONFormatter /></Route>
              <Route exact path="/RegExTester"><RegExTester /></Route>
              <Route exact path="/UUIDGenerator"><UUIDGenerator /></Route>
              <Route exact path="/JWTDecoder"><JWTDecoder /></Route>
              <Route exact path="/QRCodeGenerator"><QRCodeGenerator /></Route>
              <Route exact path="/ImageOCR"><ImageOCR /></Route>
              <Route exact path="/ColorPicker"><ColorPicker /></Route>

              {/** Default route is the home */}
              <Route component={Home} />
            </Switch>
          </main>
        </ToasterProvider>
      </div>
    </>
  );
}

export default withWidth()(App);
