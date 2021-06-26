import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { useTheme } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import GithubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import LinkIcon from '@material-ui/icons/Link';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PaletteIcon from '@material-ui/icons/Palette';
import PanoramaIcon from '@material-ui/icons/Panorama';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import SimCardIcon from '@material-ui/icons/SimCard';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TextRotationNoneIcon from '@material-ui/icons/TextRotationNone';
import TocIcon from '@material-ui/icons/Toc';
import WrapTextIcon from '@material-ui/icons/WrapText';
import clsx from 'clsx';
import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, useHistory } from 'react-router-dom';
import ApplicationBar from './components/ApplicationBar/ApplicationBar';
import { FullCenteredContent } from './components/FullCenteredContent/FullCenteredContent';
import Home from './components/Home';
import { NavbarButtonLink } from './components/NavbarButtonLink/NavbarButtonLink';
import ToasterProvider from './components/Toaster/ToasterProvider';
import { useStyles } from './styles';
import Banner from './images/icon.png';


interface Props {
  width: Breakpoint;
}

const App: React.FC<Props> = (props: Props) => {
  const desc = 'Web Toolbox app. A collection of utilities for developers.';
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(isWidthUp('md', props.width));

  const About = lazy(() => import('./components/About/About'));
  const AppPreferences = lazy(() => import('./containers/AppPreferences'));
  const JSONFormatter = lazy(() => import('./containers/JSONFormatter'));
  const Base64Encoder = lazy(() => import('./containers/Base64Encoder'));
  const RegExTester = lazy(() => import('./containers/RegExTester'));
  const UUIDGenerator = lazy(() => import('./containers/UUIDGenerator'));
  const JWTDecoder = lazy(() => import('./containers/JWTDecoder'));
  const Base64ImageEncoder = lazy(() => import('./containers/Base64ImageEncoder'));
  const ImageOCR = lazy(() => import('./containers/ImageOCR'));
  const ColorPicker = lazy(() => import('./containers/ColorPicker'));
  const QRCodeGenerator = lazy(() => import('./containers/QRCodeGenerator'));
  const CommonLists = lazy(() => import('./containers/CommonLists'));
  const GithubUserProjects = lazy(() => import('./containers/GithubUserProjects'));
  const JSONConverter = lazy(() => import('./containers/JSONConverter'));
  const FeaturesGroup = lazy(() => import('./components/FeaturesGroup'));

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
      <Helmet titleTemplate="Web Toolbox - %s" defaultTitle="Web Toolbox">
        <meta name="description" content={desc} />
      </Helmet>
      <div className={classes.root}>
        <ApplicationBar open={open} setOpen={setOpen} />
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
            <div className={classes.toolbarIcon}>
              <img src={Banner} alt='Web Toolbox' title='Web Toolbox' height={50} />
            </div>
            <IconButton onClick={() => setOpen(false)} title="Toggle sidebar menu">
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.menu}>
            <NavbarButtonLink icon={<HomeIcon />} to="/" title="Home" detail="Home" exact={true} />
            <NavbarButtonLink icon={<LinkIcon />} to="/URL" title="URL parse, encode" detail="URL utilities for parsing and encoding url parameters" />
            <NavbarButtonLink icon={<DeveloperBoardIcon />} to="/Base64Encoder" title="Base64 String" detail="Base64 encoder/decoder" />
            <NavbarButtonLink icon={<WrapTextIcon />} to="/JSONFormatter" title="JSON Formatter" detail="JSON Formatter" />
            <NavbarButtonLink icon={<DeveloperModeIcon />} to="/JSONConverter" title="JSON Converter" detail="Convert json into multiple output languages" />
            <NavbarButtonLink icon={<TextRotationNoneIcon />} to="/RegExTester" title="RegEx tester" detail="Regular expression tester" />
            <NavbarButtonLink icon={<SimCardIcon />} to="/UUIDGenerator" title="UUID generator" detail="UUID generator" />
            <NavbarButtonLink icon={<LockOpenIcon />} to="/JWTDecoder" title="JWT decoder" detail="JSON Web Token decoder" />
            <NavbarButtonLink icon={<PanoramaIcon />} to="/Base64ImageEncoder" title="Base64 image" detail="Base64 image encoder" />
            <NavbarButtonLink icon={<SelectAllIcon />} to="/QRCodeGenerator" title="QR Code generator" detail="QR Code generator" />
            <NavbarButtonLink icon={<TextFieldsIcon />} to="/ImageOCR" title="Image OCR" detail="Image text extractor" />
            <NavbarButtonLink icon={<PaletteIcon />} to="/ColorPicker" title="Color picker" detail="Image color picker" />
            <NavbarButtonLink icon={<TocIcon />} to="/CommonLists" title="Mime-types, HTML" detail="Html entities, Mime-types, and more…" />
            <NavbarButtonLink icon={<GithubIcon />} to="/GithubUserProjects" title="Github search" detail="Github user projects" />
          </List>
        </Drawer>
        <ToasterProvider>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Suspense fallback={<FullCenteredContent>Loading…</FullCenteredContent>}>
              <Switch>
                <Route exact path="/"><Home /></Route>

                <Route exact path="/about"><About /></Route>
                <Route exact path="/preferences"><AppPreferences /></Route>

                <Route path="/URL"><FeaturesGroup /></Route>
                <Route exact path="/Base64Encoder"><Base64Encoder /></Route>
                <Route exact path="/Base64ImageEncoder"><Base64ImageEncoder /></Route>
                <Route exact path="/JSONFormatter"><JSONFormatter /></Route>
                <Route exact path="/JSONConverter"><JSONConverter /></Route>
                <Route exact path="/RegExTester"><RegExTester /></Route>
                <Route exact path="/UUIDGenerator"><UUIDGenerator /></Route>
                <Route exact path="/JWTDecoder"><JWTDecoder /></Route>
                <Route exact path="/QRCodeGenerator"><QRCodeGenerator /></Route>
                <Route exact path="/ImageOCR"><ImageOCR /></Route>
                <Route exact path="/ColorPicker"><ColorPicker /></Route>
                <Route exact path="/CommonLists"><CommonLists /></Route>
                <Route exact path="/GithubUserProjects"><GithubUserProjects /></Route>

                {/** Default route is the home */}
                <Route component={Home} />
              </Switch>
            </Suspense>
          </main>
        </ToasterProvider>
      </div>
    </>
  );
}

export default withWidth()(App);
