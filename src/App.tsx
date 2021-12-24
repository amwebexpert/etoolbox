import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { useTheme } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import GithubIcon from '@material-ui/icons/GitHub';
import EventIcon from '@material-ui/icons/Event';
import CSVParserIcon from '@material-ui/icons/GridOn';
import HomeIcon from '@material-ui/icons/Home';
import LinkIcon from '@material-ui/icons/Link';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PaletteIcon from '@material-ui/icons/Palette';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import SimCardIcon from '@material-ui/icons/SimCard';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TextRotationNoneIcon from '@material-ui/icons/TextRotationNone';
import TocIcon from '@material-ui/icons/Toc';
import WrapTextIcon from '@material-ui/icons/WrapText';
import clsx from 'clsx';
import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import ApplicationBar from './components/ApplicationBar/ApplicationBar';
import FeaturesGroup from './components/FeaturesGroup';
import { FullCenteredContent } from './components/FullCenteredContent/FullCenteredContent';
import Home from './components/Home';
import { NavbarButtonLink } from './components/NavbarButtonLink/NavbarButtonLink';
import ToasterProvider from './components/Toaster/ToasterProvider';
import Base64Encoder from './containers/Base64Encoder';
import Base64FileEncoder from './containers/Base64FileEncoder';
import ColorPicker from './containers/ColorPicker';
import NamedColors from './containers/NamedColors';
import URLEncoder from './containers/URLEncoder';
import URLParser from './containers/URLParser';
import Banner from './images/icon.png';
import { useStyles } from './styles';


interface Props {
  width: Breakpoint;
}

const App: React.FC<Props> = (props: Props) => {
  const desc = 'Web Toolbox app. A collection of utilities for developers.';
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(isWidthUp('md', props.width));

  const About = lazy(() => import('./components/About/About'));
  const AppPreferences = lazy(() => import('./containers/AppPreferences'));
  const JSONFormatter = lazy(() => import('./containers/JSONFormatter'));
  const RegExTester = lazy(() => import('./containers/RegExTester'));
  const UUIDGenerator = lazy(() => import('./containers/UUIDGenerator'));
  const JWTDecoder = lazy(() => import('./containers/JWTDecoder'));
  const ImageOCR = lazy(() => import('./containers/ImageOCR'));
  const QRCodeGenerator = lazy(() => import('./containers/QRCodeGenerator'));
  const CommonLists = lazy(() => import('./containers/CommonLists'));
  const GithubUserProjects = lazy(() => import('./containers/GithubUserProjects'));
  const JSONConverter = lazy(() => import('./containers/JSONConverter'));
  const DateConverter = lazy(() => import('./containers/DateConverter'));
  const CSVParser = lazy(() => import('./containers/CSVParser'));

  // Because of the following issue, Suspense is breaking the tab selection (fix will be part of React 18)
  // @see https://github.com/mui-org/material-ui/issues/14077
  // const FeaturesGroup = lazy(() => import('./components/FeaturesGroup'));
  // const URLParser = lazy(() => import('./containers/URLParser'));
  // const URLEncoder = lazy(() => import('./containers/URLEncoder'));
  // const Base64Encoder = lazy(() => import('./containers/Base64Encoder'));
  // const Base64ImageEncoder = lazy(() => import('./containers/Base64ImageEncoder'));
  // const NamedColors = lazy(() => import('./containers/NamedColors'));
  // const ColorPicker = lazy(() => import('./containers/ColorPicker'));

  const featuresGroupURL = [
    { type: URLParser, path: '/URLParser', label: 'Parser'}, 
    { type: URLEncoder, path: '/URLEncoder', label: 'Encoder'}
  ];
  const featuresGroupBase64 = [
    { type: Base64Encoder, path: '/Base64Encoder', label: 'String'}, 
    { type: Base64FileEncoder, path: '/Base64FileEncoder', label: 'File'}
  ];
  const featuresGroupColors = [
    { type: ColorPicker, path: '/ColorPicker', label: 'Picker'},
    { type: NamedColors, path: '/NamedColors', label: 'Named colors'}, 
  ];

  React.useEffect(setupIPC, [navigate]);

  function setupIPC() {
    // Will be defined if the React App is running inside Electron
    if (window.require) {
      const ipc = window.require("electron").ipcRenderer;
      ipc.send('rendererAppStarted');
      ipc.on('navigateTo', (_event: any, path: string) => navigate(path));
    }
  }

  const menuClick = () => {
    if (open && isWidthDown('sm', props.width)) {
      setOpen(false);
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
            <div className={classes.toolbarIconContainer}>
              <NavLink to='/about' title='About Web Toolbox…'><img src={Banner} alt='Web Toolbox' className={classes.toolbarIcon} /></NavLink>
            </div>
            <IconButton onClick={() => setOpen(false)} title="Toggle sidebar menu">
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.menu}>
            <NavbarButtonLink icon={<HomeIcon />} to="/" title="Home" detail="Home" onClick={menuClick} />

            <NavbarButtonLink icon={<LinkIcon />} to="/URL" title="URL parse, encode" detail="URL utilities for parsing and encoding url parameters" onClick={menuClick} />
            <NavbarButtonLink icon={<DeveloperBoardIcon />} to="/Base64" title="Base64" detail="Base64 encoders/decoders" onClick={menuClick} />
            <NavbarButtonLink icon={<PaletteIcon />} to="/Colors" title="Color picker" detail="Image color picker" onClick={menuClick} />
 
            <NavbarButtonLink icon={<WrapTextIcon />} to="/JSONFormatter" title="JSON Formatter" detail="JSON Formatter" onClick={menuClick} />
            <NavbarButtonLink icon={<DeveloperModeIcon />} to="/JSONConverter" title="JSON Converter" detail="Convert json into multiple output languages" onClick={menuClick} />
            <NavbarButtonLink icon={<TextRotationNoneIcon />} to="/RegExTester" title="RegEx tester" detail="Regular expression tester" onClick={menuClick} />
            <NavbarButtonLink icon={<SimCardIcon />} to="/UUIDGenerator" title="UUID generator" detail="UUID generator" onClick={menuClick} />
            <NavbarButtonLink icon={<LockOpenIcon />} to="/JWTDecoder" title="JWT decoder" detail="JSON Web Token decoder" onClick={menuClick} />
            <NavbarButtonLink icon={<SelectAllIcon />} to="/QRCodeGenerator" title="QR Code generator" detail="QR Code generator" onClick={menuClick} />
            <NavbarButtonLink icon={<TextFieldsIcon />} to="/ImageOCR" title="Image OCR" detail="Image text extractor" onClick={menuClick} />
            <NavbarButtonLink icon={<TocIcon />} to="/CommonLists" title="Mime-types, HTML" detail="Html entities, Mime-types, and more…" onClick={menuClick} />
            <NavbarButtonLink icon={<GithubIcon />} to="/GithubUserProjects" title="Github search" detail="Github user projects" onClick={menuClick} />
            <NavbarButtonLink icon={<EventIcon />} to="/DateConverter" title="Date & Epoch" detail="Date and Epoch utilities" onClick={menuClick} />
            <NavbarButtonLink icon={<CSVParserIcon />} to="/CSVParser" title="CSV Parser" detail="CSV utilities" onClick={menuClick} />
          </List>
        </Drawer>
        <ToasterProvider>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Suspense fallback={<FullCenteredContent>Loading…</FullCenteredContent>}>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/about" element={<About />} />
                <Route path="/preferences" element={<AppPreferences />} />

                <Route path="/URL/*" element={<FeaturesGroup tabs={featuresGroupURL} />} />
                <Route path="/Base64/*" element={<FeaturesGroup tabs={featuresGroupBase64} />} />
                <Route path="/Colors/*" element={<FeaturesGroup tabs={featuresGroupColors} />} />

                <Route path="/Base64Encoder" element={<Base64Encoder />} />
                <Route path="/Base64FileEncoder" element={<Base64FileEncoder />} />
                <Route path="/JSONFormatter" element={<JSONFormatter />} />
                <Route path="/JSONConverter" element={<JSONConverter />} />
                <Route path="/RegExTester" element={<RegExTester />} />
                <Route path="/UUIDGenerator" element={<UUIDGenerator />} />
                <Route path="/JWTDecoder" element={<JWTDecoder />} />
                <Route path="/QRCodeGenerator" element={<QRCodeGenerator />} />
                <Route path="/ImageOCR" element={<ImageOCR />} />
                <Route path="/CommonLists" element={<CommonLists />} />
                <Route path="/GithubUserProjects" element={<GithubUserProjects />} />
                <Route path="/DateConverter" element={<DateConverter />} />
                <Route path="/CSVParser" element={<CSVParser />} />

                {/** Default route is the home */}
                <Route element={<Home />} />
              </Routes>
            </Suspense>
          </main>
        </ToasterProvider>
      </div>
    </>
  );
}

export default withWidth()(App);
